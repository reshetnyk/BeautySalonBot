var sequelize = require('../connection.js');
const Sequelize = require('sequelize');

const Client = sequelize.define('clients', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: "client_id" },
  firstName: { type: Sequelize.STRING, field: "c_first_name" },
  patronymic: { type: Sequelize.STRING, field: "c_patronymic" },
  lastName: { type: Sequelize.STRING, field: "c_last_name" },
  telegram: { type: Sequelize.STRING, field: "telegram_acc" }
});

module.exports = Client;