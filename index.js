'use strict';

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
const TextCommand = Telegram.TextCommand;
const tg = new Telegram.Telegram('your token'); 
                                                                                     
const PingController = require('./controllers/PingController');
const SecondController = require('./controllers/SecondController');
const MenuController = require('./controllers/MenuController');

tg.router
	.when(new TextCommand('/start', 'menuCommand'), new MenuController());
	//.when(new TextCommand(''));	


