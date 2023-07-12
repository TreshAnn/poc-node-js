import express from 'express'
const router = express.Router()

import { registerUser, loginUser, updateUser, deleteUser, validateToken} from '../controllers'

// User Routes
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/users/:id').patch(updateUser)
router.route('/users/:id').delete(deleteUser)

//AUTH
router.route('/validate').post(validateToken)

export default router;