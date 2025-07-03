 

import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

import { userRouter } from './routes/user';
import { creatorRouter } from './routes/creatorProfile';
import { businessRouter } from './routes/businessProfile';
import chatRoutes from './routes/chat.js'; // Use `.js` for ES modules
import { messageModel } from './db';


dotenv.config();

const app = express();
const server = http.createServer(app);

// Allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://collabsphereai.vercel.app',
];

//  CORS for Express
app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());

app.options('*', cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));


const io = new SocketIOServer(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
  },
});

app.use('/api/chat', chatRoutes);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/creator', creatorRouter);
app.use('/api/v1/business', businessRouter);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('joinRoom', ({ roomId }) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on('sendMessage', async ({ roomId, senderId, content }) => {
    const newMessage = new messageModel({ roomId, senderId, content });
    try {
      const savedMessage = await newMessage.save();
      io.to(roomId).emit('receiveMessage', savedMessage);
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
