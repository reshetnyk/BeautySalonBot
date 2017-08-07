'use strict';

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;

class MenuController extends TelegramBaseController {
	/**
     * @param {Scope} $
     */
	menuHandler($) {
        
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
                    menu: [
                    {
                        text: 'Перукарські послуги',
                        callback: (callbackQuery, message) => {
                             $.api.editMessageText('Введіть дату у форматі: число.місяць', { chat_id: $.chatId, message_id: message.messageId });
                        }
                    },
                    {
                        text: 'Візаж',
                        callback: (callbackQuery, message) => {
                            $.api.editMessageText('Введіть дату у форматі: число.місяць', { chat_id: $.chatId, message_id: message.messageId });
                        }
                    },
                    {
                        text: 'Манікюр/Педикюр',
                        callback: (callbackQuery, message) => {
                            $.api.editMessageText('Введіть дату у форматі: число.місяць', { chat_id: $.chatId, message_id: message.messageId });
                        }
                    },
                    {
                        text: 'Массаж/Spa',
                        callback: (callbackQuery, message) => {
                            $.api.editMessageText('Введіть дату у форматі: число.місяць', { chat_id: $.chatId, message_id: message.messageId });
                        }
                    },
                    {
                        text: 'Косметологічні послуги',
                        callback: (callbackQuery, message) => {
                            $.api.editMessageText('Введіть дату у форматі: число.місяць', { chat_id: $.chatId, message_id: message.messageId });
                        }
                    }
                ]
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

function writeDate(chatId, messageId){
    $.api.editMessageText('Ваш запис скасовано.', { chatId, messageId });
}

module.exports = MenuController;
