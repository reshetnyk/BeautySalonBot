'use strict';

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
const TextCommand = Telegram.TextCommand;

const tg = new Telegram.Telegram('435065298:AAEK7nnZGVAniVls70mp-Aq2LebUuVKjgC8', {
	workers: 1
});

const MenuController = require('./controllers/MenuController');

tg.router
	.when(new TextCommand('/start', 'menuCommand'), new MenuController());
	//.when(new TextCommand(''));	