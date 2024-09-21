import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import cors from 'cors'

const app = express()
const server = http.createServer(app)

interface socketData {
   [key: string]: string
}

app.use(cors({
   origin: 'https://social-messaging-application.netlify.app',
   methods: ['GET', 'POST', 'DELETE', 'PATCH'],
   allowedHeaders: ['Content-Type', 'Authorization'],
   credentials: true
}))

// Socket.io server with CORS
const io = new Server(server, {
   cors: {
      origin: 'https://social-messaging-application.netlify.app',  // No trailing slash
      methods: ['GET', 'POST'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
   },
   transports: ['websocket', 'polling']
})



export const getReceiverSocketId = (receiverId: string) => {
   return userSocketMap[receiverId]
}
// this will hold the current user who have been logged in 
const userSocketMap: socketData = {}

io.on('connection', (socket) => {
   // console.log('a user connected', socket.id) 
   const userId = socket.handshake.query.userId as string | undefined
   // console.log(userId,'this is user id after connection') 

   // we will store the current user Id acrross all the accounts
   if (userId && userId != 'undefined') userSocketMap[userId] = socket.id

   //io.emit is used to send events to all the connected clients
   // console.log(userSocketMap,'these are all online users')
   io.emit('getOnlineUsers', Object.keys(userSocketMap))

   // socket.on is used to listen events and this can be used in both client and server
   socket.on('disconnect', () => {
      console.log('disconnected server')
      if (userId) {
         delete userSocketMap[userId]
         io.emit('getOnlineUsers', Object.keys(userSocketMap))
      }
   })
})

export { app, io, server }