import { Request, Response} from 'express';
import * as userService from '../services/User.services';
import { IRegisterRq, ILoginRq, IUserUpdateRq } from '../models/User.interface';
import { StatusCodes } from 'http-status-codes';

export const registerUser = async (req: Request, res: Response) => {
    const rq: IRegisterRq = req.body

    userService.validate(rq)

    const {user, token} = await userService.createUser(rq)
    res.status(StatusCodes.CREATED).json({ user, token })
    
}
export const loginUser = async (req: Request, res: Response) =>{
    const rq: ILoginRq = req.body
  
    const login= await userService.loginUser(rq)

    res.status(StatusCodes.OK).json({login});
}

export const updateUser =async (req: Request, res: Response) => {
    const userId: string = req.params.id;

    const updateData: IUserUpdateRq  = req.body;

    const updatedUser = await userService.updateUser(userId, updateData);
        res.status(StatusCodes.OK).json({ updatedUser });
    
}

export const deleteUser =async(req: Request, res: Response) => {
    const userId: string =req.params.id;

    await userService.deleteUser(userId);
    //res.status(StatusCodes.NO_CONTENT).end();
    res.status(StatusCodes.OK).json({message: 'User deleted successfully'});
   
}

export const getAllUsers = async (req: Request, res: Response) => {
    const user = await userService.listAllUsers()
    res.status(StatusCodes.OK).json(user)
}