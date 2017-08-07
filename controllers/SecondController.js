'use strict';

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;

class SecondController extends TelegramBaseController {
	/**
     * @param {Scope} $
     */
	secondHandler($) {
		$.sendMessage('second is here');
	}

	get routes() {
		return {
			'secondCommand': 'secondHandler'
		};
	}
}

module.exports = SecondController;