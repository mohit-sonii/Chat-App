import { dbConnect } from './database/db.database'

import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import authRoute from './routes/auth.routes'
import messageRoute from './routes/message.routes'
import userRoute from './routes/getUsers.routes'

const app = express()

dotenv.config()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoute)
app.use('/api/messages', messageRoute)
app.use('/api/users', userRoute)

app.listen(process.env.Port || 8000, () => {
   dbConnect()
   console.log('It is listening')
})