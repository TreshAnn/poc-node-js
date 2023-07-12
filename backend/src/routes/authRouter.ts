import express from 'express'
const router = express.Router()

import { registerUser, loginUser, updateUser, deleteUser, getAllUsers } from '../controllers'
import authenticateUser from '../middleware/auth'
// User Routes
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/users/:id').patch(updateUser, authenticateUser)
router.route('/users/:id').delete(deleteUser, authenticateUser)
router.route('/users').get(getAllUsers)

export default router;