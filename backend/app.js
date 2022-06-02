const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const bodyParser = require('body-parser')
const Message = require('./models/messageModel')
const User = require('./models/userModel')





const rooms = ['general', 'tech', 'finance', 'crypto']

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

app.get('/rooms', (req, res) => {
    res.json(rooms)
})
const getLastMessageFromRoom = async(room) => {
    let roomMessages = await Message.aggregate([
        {$match: {to: room}},
        {$group: {_id: '$date', messagesByDate: {$push: '$$ROOT'}}}
    ])
    return roomMessages
}
const sortRoomMessagesByDate = (messages) => {
    return messages.sort((a, b) => {
        let date1 = a._id.split('/')
        let date2 = b._id.split('/')
        date1 = date1[2] + date1[0] + date1[1]
        date2 = date2[2] + date2[0] + date2[1]
        
        return date1 < date2 ? -1 : 1
    })
}
//socket connection

io.on('connection', (socket) => {
    
    socket.on('new-user', async () => {
        const members = await User.find()
        io.emit('new-user', members)

    })


    socket.on('join-room' , async(room) => {
        socket.join(room)
        let roomMessages = await getLastMessageFromRoom(room)
        roomMessages = sortRoomMessagesByDate(roomMessages)
        socket.emit('room-messages', roomMessages)
    })



  });


server.listen(port, () => {
    console.log(`listening on port ${port}`);
})
