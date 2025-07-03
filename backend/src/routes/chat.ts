import express from 'express';
import { messageModel } from '../db';
const chatRoutes = express.Router();

chatRoutes.get('/:roomId', async (req, res) => {
  try {
    const messages = await messageModel.find({ roomId: req.params.roomId }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

export default chatRoutes;
