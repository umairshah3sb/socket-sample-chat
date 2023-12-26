const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);
const port=process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  socket.on('new_message', (msg) => {
    console.log('New Message',msg);
    io.emit('new_message', msg);
  });
});

server.listen(port, () => {
  console.log('server running at port 3000');
});
