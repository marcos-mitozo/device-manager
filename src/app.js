import express from 'express'
import { json } from 'body-parser'

import './database/connection.js'

const app = express()

import categoryRoutes from './routes/category.js'

const hostname = '127.0.0.1'
const port = 4000

app.use(json())

app.use('/category', categoryRoutes)

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})