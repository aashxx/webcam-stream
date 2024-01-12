const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Handle incoming webcam frames
  socket.on('webcamFrame', (frameData) => {
    // Broadcast the frame to all connected clients except the sender
    socket.broadcast.emit('webcamFrame', frameData);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
