import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoute from './routes/auth.routes'
import messageRoute from './routes/message.routes'
import userRoute from './routes/getUsers.routes'
import cors from 'cors'

import { dbConnect } from './database/db.database'
import { app, server } from './socket/socket'

dotenv.config()

app.use(express.json())
app.use(cookieParser())

const corsOptions = {
   origin: ['https://social-messaging-application.netlify.app'],
   methods: ['GET', 'POST'],
   // allowedHeaders: ['Content-Type'],
   credentials: true
};

app.use(cors(corsOptions))
app.use('/api/auth', authRoute)
app.use('/api/messages', messageRoute)
app.use('/api/users', userRoute)

server.listen(process.env.PORT || 8000, async() => {
   try {
      await dbConnect()
      console.log(`Server is running on port ${process.env.PORT}`);
    } catch (error) {
      console.error('Failed to connect to the database', error);
      process.exit(1); 
    }
})