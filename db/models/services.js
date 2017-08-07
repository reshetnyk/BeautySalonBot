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

function Services(){

}

Services.prototype.getAllServices = function(){
  Service.findAll().then(services => {
    services.forEach(function(e) {
      console.log('id:' + e.id + ',\nname:' + e.name + ',\nprice:' + e.price + ',\nduration' + e.duration + ',\ninterval:' + e.interval);  
    }, this);
      
  })
}

module.exports = Services;

//node ./dbqueries/services.js