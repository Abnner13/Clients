const clientRoutes = require('./Routes/ClientRoute')
const bodyParser = require('body-parser')
const database = require('./Data/db')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3003

database.sync()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.use('/api', clientRoutes)

app.listen(port, () => {
    console.log('Server  starts on port: ' + port)
})
