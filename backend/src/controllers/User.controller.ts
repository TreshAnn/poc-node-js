import { Request, Response} from 'express';
import * as userService from '../services/User.services';
import { IRegisterRq, ILoginRq } from '../models/User.interface';
import { StatusCodes } from 'http-status-codes';

export const registerUser = async (req: Request, res: Response) => {
    const rq: IRegisterRq = req.body

    userService.validate(rq)

    const {user, token} = await userService.createUser(rq)
    res.status(StatusCodes.CREATED).json({ user, token })
    
}
export const loginUser = async (req: Request, res: Response) =>{
  const rq: ILoginRq =req.body
  
  const login= await userService.loginUser(rq)

  res.status(StatusCodes.OK).json({login});
}