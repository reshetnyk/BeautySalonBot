const Sequelize = require('sequelize');
const db = require('./dbproperties.json');

var sequelize = new Sequelize(db.database, db.username, db.password, {
    dialect: db.dialect,
    port: db.port,
    host: db.host,

    define: {
        timestamps: false
    }
});
console.error('Sequelize is trying to connect.');

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;

