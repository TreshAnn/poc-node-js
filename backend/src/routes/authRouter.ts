import express from 'express'
const router = express.Router()

import { registerUser, loginUser, updateUser, deleteUser, getAllUsers, validateToken } from '../controllers'
import authenticateUser from '../middleware/auth'

// User Routes
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/update/:id').patch(authenticateUser, updateUser)
router.route('/delete/:id').delete(authenticateUser, deleteUser)
router.route('/users').get(authenticateUser, getAllUsers)

// Auth
router.route('/validate').post(validateToken)

export default router;