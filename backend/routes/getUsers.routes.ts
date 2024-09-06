
import express from 'express'
import { Authentication } from '../middleware/authentication.middleware'
import { getUsers } from '../controllers/getUsers.controller'

const router =express.Router()

router.get('/',Authentication,getUsers)

export default router