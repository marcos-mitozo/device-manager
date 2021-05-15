const express = require('express')
const bodyParser = require('body-parser')

require('./database/connection')

const app = express()

app.use(bodyParser.json())

const hostname = '127.0.0.1'
const port = 4000

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})