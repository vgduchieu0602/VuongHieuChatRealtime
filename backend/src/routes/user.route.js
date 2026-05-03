import express from 'express'
import { getMe, test } from '../controllers/user.controller.js'

const router = express.Router()

router.get('/me', getMe)

router.get('/test', test)

export default router