'use strict';

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
const Service = require('../db/models/services.js');
const Order = require('../db/models/orders.js');
const sequelize = require('sequelize');

class MenuController extends TelegramBaseController {
	/**
     * @param {Scope} $
     */
    async menuHandler($) {
        var servicesMenuItems = await getServicesMenuElems($);

        $.runInlineMenu({
            layout: 1, //some layouting here
            oneTimeKeyboard: true,
            method: 'sendMessage', //here you must pass the method name
            params: ['Виберіть дію:'], //here you must pass the parameters for that method
            menu: [
                {
                    text: 'Записатися', //text of the button
                    message: 'Оберіть послугу: ',
                    layout: 1,
                    menu: servicesMenuItems
                },
                {
                    text: 'Сказувати запис', //text of the button

                    message: 'Ви підтверджуєте скасування?',
                    layout: 2,
                    menu: [ //Sub menu (current message will be edited)
                        {
                            text: 'Так',
                            callback: (callbackQuery, message) => {
                                $.api.editMessageText('Ваш запис скасовано.', { chat_id: $.chatId, message_id: message.messageId });
                            }
                        },
                        {
                            text: 'Ні',
                            callback: (callbackQuery, message) => {
                                // $.routeTo("/start");
                            }
                        }
                    ]
                },
                {
                    text: 'Ціни', //text of the button
                    callback: (callbackQuery, message) => { //to your callback will be passed callbackQuery and response from method
                        $.api.editMessageText(
                            'Перукарські послуги: 200-1500 грн.\nВізаж: 300-1000 грн.\nМанікюр/Педикюр: 250-600 грн.\nМассаж/Spa: 350-1200 грн.\nКосметологічні послуги: 250-1500 грн.\
                              ', { chat_id: $.chatId, message_id: message.messageId });
                    }
                },
            ]
        })
    }

    get routes() {
        return {
            'menuCommand': 'menuHandler'
        };
    }
}

async function getServicesMenuElems($) {
    var allServices = await Service.findAll();
    var menuElems = [];

    //await getTimetable(new Date(), 1);

    allServices.forEach(function (item, i, allServices) {
        menuElems.push({
            text: item.name,
            callback: (callbackQuery, message) => {
                $.api.editMessageText('Введіть дату у форматі: число.місяць', { chat_id: $.chatId, message_id: message.messageId });

            }
        });
    });

    return menuElems;
}

async function getTimetable(day, serviceId) {
    var timetable = [];

    var workStart = 8;
    var workEnd = 19;

    //if service didn't find 
    var service = await Service.findById(serviceId);

    var time = new Date(day);
    var marginalTime = new Date(day);

    time.setUTCHours(workStart, 0, 0, 0);
    marginalTime.setUTCHours(workEnd, 0, 0, 0);

    while (time < marginalTime) {
        timetable.push({
            time: new Date(time),
            isFree: true
        });

        time.setTime(time.getTime() + ((service.duration + service.interval) * 60 * 1000));
    }

    var orders = await Order.findAll({
        where: {
            $and: [
                sequelize.where(sequelize.fn('YEAR', sequelize.col('date_time')), day.getUTCFullYear()),
                sequelize.where(sequelize.fn('MONTH', sequelize.col('date_time')), day.getUTCMonth() + 1),
                sequelize.where(sequelize.fn('DAY', sequelize.col('date_time')), day.getUTCDate()),
                { serviceId: serviceId }
            ]
        }
    });

    if (orders.length > 0) {
        orders.forEach(function (o, i, orders) {
            timetable.forEach(function (t, j, timetable) {
                if (o.datetime.getUTCHours() === t.time.getUTCHours() &&
                    o.datetime.getUTCMinutes() === t.time.getUTCMinutes()) {
                    t.isFree = false;
                }
            });
        });
    }

    /*
    console.log('*****TIMETABLE****');
    timetable.forEach(function (t, j, timetable) {
        console.log('***|' + t.time.getUTCHours() + ':' + t.time.getUTCMinutes() + '| isFree=' + t.isFree);
    });
    */

    return timetable;
}

async function orderService(serviceId, clientId, date) {
    await Order.create({ serviceId: serviceId, clientId: clientId, datetime: date });
}



function writeDate(chatId, messageId) {
    $.api.editMessageText('Ваш запис скасовано.', { chatId, messageId });
}

module.exports = MenuController;
