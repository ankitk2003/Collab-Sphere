"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("./routes/user");
const creatorProfile_1 = require("./routes/creatorProfile");
const businessProfile_1 = require("./routes/businessProfile");
const chat_js_1 = __importDefault(require("./routes/chat.js")); // Include `.js` for ES modules
const db_1 = require("./db");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/chat', chat_js_1.default);
app.use('/api/v1/user', user_1.userRouter);
app.use('/api/v1/creator', creatorProfile_1.creatorRouter);
app.use('/api/v1/business', businessProfile_1.businessRouter);
// MongoDB Connection
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
// Socket.IO Logic
io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('joinRoom', ({ roomId }) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
    });
    socket.on('sendMessage', (_a) => __awaiter(void 0, [_a], void 0, function* ({ roomId, senderId, content }) {
        const newMessage = new db_1.messageModel({ roomId, senderId, content });
        try {
            const savedMessage = yield newMessage.save();
            io.to(roomId).emit('receiveMessage', savedMessage);
        }
        catch (err) {
            console.error('Error saving message:', err);
        }
    }));
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
