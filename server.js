const express = require('express')
const app = express()
const server = require('http').Server(app)
const { v4: uuidv4 } = require('uuid')
const io = require('socket.io')(server)
const { ExpressPeerServer } = require('peer')
const peerServer = ExpressPeerServer(server, {
    debug: true
})

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use('/peerjs', peerServer)
app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`)
})

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
})

// Socket.io
io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        socket.to(roomId).broadcast.emit('user-connected', userId)
        // messages
        socket.on('message', message => {
            // send messages to the same room
            io.to(roomId).emit('createMessage', message)
        })
        // Disconnect 
        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected', userId)
        })
    })
})

server.listen(3030)