var sequelize = require('../connection.js');
const Sequelize = require('sequelize');

const Service = sequelize.define('service', {
  id : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: "service_id" },  
  name : { type: Sequelize.STRING, field: "service_name" },  
  price : Sequelize.INTEGER,
  duration : Sequelize.INTEGER,  
  interval : { type: Sequelize.INTEGER, field: "service_interval" },  
});

sequelize.sync();

module.exports = Service;