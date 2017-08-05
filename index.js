'use strict';

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
const TextCommand = Telegram.TextCommand;
const tg = new Telegram.Telegram('token');

const PingController = require('./controllers/PingController');
const SecondController = require('./controllers/SecondController');
const MenuController = require('./controllers/MenuController');

tg.router
	.when(new TextCommand('ping', 'pingCommand'), new PingController())
	.when(new TextCommand('sec', 'secondCommand'), new SecondController())
	.when(new TextCommand('/menu', 'menuCommand'), new MenuController());	