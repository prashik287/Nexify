// index.js
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoute')
const projectRoute = require('./routes/projectRoute')
const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not defined
const cors = require('cors')
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);





io.on('connection', (socket) => {
  console.log('a user connected');
  
  // Broadcast a message to everyone when a new user joins
  socket.broadcast.emit('chat message', 'A new user has joined the chat!');
  
  // Listen for messages from the client and broadcast them to all users
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  // Handle disconnect events
  socket.on('disconnect', () => {
    console.log('user disconnected');
    socket.broadcast.emit('chat message', 'A user has left the chat!');
  });
});


app.use(express.json())
app.use(cors())
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Use connectDB function to establish connection
connectDB();
app.use('/auth',authRoute)
app.use('/project',projectRoute)

app.get('/', (req, res) => {
  res.send("Hello World");
});

// Start the server 
//  database connection
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
