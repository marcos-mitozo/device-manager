import express from 'express'
import { json } from 'body-parser'
import pkg from 'cors';

import './src/models/device-category.js'
import sequelize from './src/database/connection.js'
import categoryRoutes from './src/routes/category.js'
import deviceRoutes from './src/routes/device.js'

import dotenv from 'dotenv';

dotenv.config()

const app = express()

const hostname = '127.0.0.1'
const port = process.env.API_PORT

app.use(json())
app.use(pkg())

app.use('/category', categoryRoutes)
app.use('/device', deviceRoutes)

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

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})

export default app;