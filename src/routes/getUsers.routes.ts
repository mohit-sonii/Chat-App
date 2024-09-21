
import express from 'express'
import { Authentication } from '../middleware/authentication.middleware'
import { getUsers, searchResult } from '../controllers/getUsers.controller'

const router =express.Router()

router.get('/',Authentication,getUsers)
router.get('/search',Authentication,searchResult)

export default router