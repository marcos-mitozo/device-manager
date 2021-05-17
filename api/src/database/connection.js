import { Sequelize } from 'sequelize';

import dotenv from 'dotenv';

dotenv.config()

const host = process.env.HOST
const port = process.env.PORT

const dbUsername = process.env.DB_USERNAME
const dbPassword = process.env.DB_PASSWORD

console.log(host, port, dbUsername, dbPassword)


const sequelize = new Sequelize('device_manager', dbUsername, dbPassword, {
    host: host,
    port: port,
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