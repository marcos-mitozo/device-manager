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

async function synchronizeTables() {
    await sequelize.sync({ alter: true })
    .then(() => {
        console.log('All the tables have been successfully synchronized!')
    })
    .catch(e => {
        console.log('Unable to synchronize tables due to the following error: ')
        console.log(e)
    })
}

synchronizeTables()

// const db = {};

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

export default sequelize;