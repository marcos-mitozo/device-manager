import express from 'express'
import { json } from 'body-parser'
import pkg from 'cors';

import './models/device-category.js'
import sequelize from './database/connection.js'
import categoryRoutes from './routes/category.js'
import deviceRoutes from './routes/device.js'

const app = express()

const hostname = '127.0.0.1'
const port = 4000

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