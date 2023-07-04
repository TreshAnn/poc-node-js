import { Request, Response, NextFunction } from 'express'
import { createUser } from './register.services'

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await createUser(req.body)
        res.status(201).json({ user })
    } catch (error) {
        next(error)
    }
}