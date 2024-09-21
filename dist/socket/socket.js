"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.io = exports.app = exports.getReceiverSocketId = void 0;
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
exports.app = app;
const server = http_1.default.createServer(app);
exports.server = server;
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'https://social-messaging-application.netlify.app',
        methods: ['GET', 'POST'],
        credentials: true,
        allowedHeaders: ['Content-Type'],
        // 'http://localhost:5173',
    }
});
exports.io = io;
const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};
exports.getReceiverSocketId = getReceiverSocketId;
// this will hold the current user who have been logged in 
const userSocketMap = {};
io.on('connection', (socket) => {
    // console.log('a user connected', socket.id) 
    const userId = socket.handshake.query.userId;
    // console.log(userId,'this is user id after connection') 
    // we will store the current user Id acrross all the accounts
    if (userId && userId != 'undefined')
        userSocketMap[userId] = socket.id;
    //io.emit is used to send events to all the connected clients
    // console.log(userSocketMap,'these are all online users')
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
    // socket.on is used to listen events and this can be used in both client and server
    socket.on('disconnect', () => {
        console.log('disconnected server');
        if (userId) {
            delete userSocketMap[userId];
            io.emit('getOnlineUsers', Object.keys(userSocketMap));
        }
    });
});
