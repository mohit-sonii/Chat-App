

import express from 'express'
import { register, login, logout,hasCookies } from '../controllers/auth.controller'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/', hasCookies)

export default router