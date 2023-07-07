import { Request, Response} from 'express';
import * as userService from '../services/User.services';
import { IUserRq } from '../models/User.interface';
import { StatusCodes } from 'http-status-codes';
import { comparePassword } from '../utils/authUtils';
import { BadRequestError, UnAuthenticatedError } from 'errors';

export const registerUser = async (req: Request, res: Response) => {
    const rq: IUserRq = req.body

    userService.validate(rq)

<<<<<<< HEAD
    const {user, token} = await userService.createUser(rq)
    res.status(StatusCodes.CREATED).json({ user, token })
=======
    const user = await userService.createUser(rq)
    res.status(StatusCodes.CREATED).json({ user })
}
export const loginUser = async (req: Request, res: Response) =>{
  const rq: IUserRq =req.body
  
  const login= await userService.loginUser(rq)

  res.status(StatusCodes.OK).json({login});
>>>>>>> origin/feat-login
}