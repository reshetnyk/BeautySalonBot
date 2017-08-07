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
                    callback: (callbackQuery, message) => { //to your callback will be passed callbackQuery and response from method

                    }
                },
                {
                    text: 'Сказувати запис', //text of the button
                    callback: (callbackQuery, message) => { //to your callback will be passed callbackQuery and response from method

                    }
                },
                {
                    text: 'Ціни', //text of the button
                    callback: (callbackQuery, message) => { //to your callback will be passed callbackQuery and response from method

                    }
                },
                {
                    text: 'Exit',
                    message: 'Are you sure?',
                    layout: 2,
                    menu: [ //Sub menu (current message will be edited)
                        {
                            text: 'Yes!',
                            callback: (callbackQuery, message) => {
                                $.api.editMessageText('меню', { chat_id: $.chatId, message_id: message.messageId });
                            }
                        },
                        {
                            text: 'No!',
                            callback: (callbackQuery, message) => {
                                
                            }
                        }
                    ]
                }
            ]
        })
    }

    	get routes() {
		return {
			'menuCommand': 'menuHandler'
		};
	}
}

module.exports = MenuController;
