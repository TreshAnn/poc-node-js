import express from 'express'
const router = express.Router()

import { registerUser } from '../controllers/auth'
import { CatsController } from '../cats'

router.route('/register').post(registerUser)
router.route('/cats').get(CatsController)

export default router;