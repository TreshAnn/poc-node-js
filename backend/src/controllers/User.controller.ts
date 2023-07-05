import { Request, Response} from 'express'
import * as userService from '../services/User.services'
import { IRegisterUserRq } from '../models/User.interface'

import { StatusCodes } from 'http-status-codes'

export const registerUser = async (req: Request, res: Response) => {
    const rq: IRegisterUserRq = req.body

    userService.validate(rq)

    const user = await userService.createUser(rq)
    res.status(StatusCodes.CREATED).json({ user })
}