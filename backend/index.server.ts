import { dbConnect } from './database/db.database'

import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import authRoute from './routes/auth.routes'
import messageRoute from './routes/message.routes'
import userRoute from './routes/getUsers.routes'
import cors from 'cors'

const app = express()

dotenv.config()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
   origin: ['http://localhost:3000', 'https://social-messaging-application.netlify.app'],
   methods: ['GET', 'POST'],
   allowedHeaders: ['Content-Type', 'Authorization'] 
}));

app.use('/api/auth', authRoute)
app.use('/api/messages', messageRoute)
app.use('/api/users', userRoute)

app.listen(process.env.Port || 8000, () => {
   dbConnect()
   console.log('It is listening')
})