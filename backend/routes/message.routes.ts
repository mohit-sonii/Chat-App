
import express from 'express'
import { Authentication } from '../middleware/authentication.middleware'
import { sendMessage,getMessage } from '../controllers/message.controller'

const router = express.Router()

router.post('/send-message/:id', Authentication, sendMessage)
router.get('/get-messages/:id', Authentication, getMessage)

export default router