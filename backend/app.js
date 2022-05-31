const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const bodyParser = require('body-parser')



app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
require('./dbconnection/connection')

app.use('/api/user', require('./routes/userRoutes'))


const server = require('http').createServer(app)
const port = process.env.PORT || 5500
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})
server.listen(port, () => {
    console.log(`listening on port ${port}`);
})
