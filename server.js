const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const admin = 'Textify';
// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// runs when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({
    username,
    room
  }) => {

    const user = userJoin(socket.id, username, room);

    socket.join(user.room)

    // emiting message when a client joine the chat || welcoming new user
    socket.emit('message', formatMessage(admin, 'welcome to chatcord'))

    // loging on server side because of server.js is server side javascript file
    console.log('New WS connection...')

    // will emit to all except requested user
    socket.broadcast.to(user.room).emit(
      'message',
      formatMessage(user.username, `has joined the chat`))
  })

  // listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id)
    io.to(user.room).emit('message', formatMessage(user.username, msg))
  })

  // runs when connected client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id)

    if (user) {
      io.to(user.room).emit('message', formatMessage(admin, `${user.username}has left the caht`))

    }
  })
})












const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`server running on port ${PORT}`))