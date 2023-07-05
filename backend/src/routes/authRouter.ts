import express from 'express'
const router = express.Router()

import { registerUser } from '../controllers'

// User Routes
router.route('/register').post(registerUser)

export default router;