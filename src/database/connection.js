const { Sequelize } = require('sequelize');

const dbUsername = 'root'
const dbPassword = 'root'

const sequelize = new Sequelize('device_manager', dbUsername, dbPassword, {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;