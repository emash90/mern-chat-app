const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')


app.use(cors())
app.use(morgan())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

const server = require('http').createServer(app)
const port = process.env.PORT || 5500
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

mongoose.connect(process.env.MONGO_URI, {

})
.then((result) => {
    console.log('connected to the db');
    server.listen(port, () => {
        console.log(`app listening on port ${port}`);
    })
})
.catch((error) => {
    console.log(error);
})