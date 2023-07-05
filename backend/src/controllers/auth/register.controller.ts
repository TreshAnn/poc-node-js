import { Request, Response, NextFunction } from 'express'
import { createUser } from './register.services'

import { BadRequestError } from '../../errors'

export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        throw new BadRequestError('Please provide all values')
    }
    
    const user = await createUser({ username, email, password })
    
    res.status(201).json({ user })
}