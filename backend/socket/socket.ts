import express from 'express'
import { Server } from 'socket.io'
import http from 'http'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
   cors: {
      origin: ['http://localhost:5173', 'https://social-messaging-application.netlify.app/'],
      methods: ['GET', 'POST']
   }
})

interface socketData {
   [key: string]: string
}


export const getReceiverSocketId = (receiverId: string) => {
   return userSocketMap[receiverId]
}
// this will hold the current user who have been logged in 
const userSocketMap: socketData = {}

io.on('connection', (socket) => {
   // console.log('a user connected', socket.id) it generates random ID for that user
   const userId = socket.handshake.query.userId as string | undefined
   // console.log(userId,'this is user id after connection') it returns the Current user ID

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