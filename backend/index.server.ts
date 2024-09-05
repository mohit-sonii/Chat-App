
import express from 'express'
import { dbConnect } from './database/db.database'
import dotenv from 'dotenv'
import authRoute from './routes/auth.routes'
import cookieParser from 'cookie-parser'
const app = express()

dotenv.config()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRoute)

app.listen(process.env.Port, () => {
   dbConnect()
   console.log('It is listening')
})