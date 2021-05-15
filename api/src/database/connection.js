import { Sequelize } from 'sequelize';

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
    console.log('Unable to connect to the database due to the following error: ')
    console.error(error);
}

export default sequelize;