const sequelize = require('../connection.js');
const Sequelize = require('sequelize');
const Service = require('./services.js');
const Client = require('./client.js');

const Order = sequelize.define('ordered_services', {
  clientId: { type: Sequelize.INTEGER, field: "client_id", primaryKey: true },
  serviceId: { type: Sequelize.STRING, field: "service_id", primaryKey: true },
  datetime: { type: Sequelize.DATE, field: "date_time", primaryKey: true }
});

Service.hasMany(Order, { foreignKey: 'serviceId', sourceKey: 'id' });
Order.belongsTo(Service, { foreignKey: 'serviceId', targetKey: 'id' });

Client.hasMany(Order, { foreignKey: 'clientId', sourceKey: 'id' });
Order.belongsTo(Client, { foreignKey: 'clientId', targetKey: 'id' });

module.exports = Order;