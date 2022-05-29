const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const { urlencoded } = require('express')



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

server.listen(port, () => {
    console.log(`server is listening on port: ${port}...`);
})