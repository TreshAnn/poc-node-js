import User from '../db/model/user.model'
import { BadRequestError,UnAuthenticatedError } from '../errors'
import {IRegisterRq, ILoginRq, IUserUpdateRq, IGetAllUsers } from '../models/User.interface'
import * as utilsFunction from '../utils/authUtils'

export async function createUser(userData: IRegisterRq){
    const user = await User.create(userData);
    
    return {user};
    
}

export function validate (req: IRegisterRq) {
    if (!req.username || !req.email || !req.password) {
        throw new BadRequestError('Please provide all values!');
    }
}

export async function validateToken (token: string) {
    try{
        await utilsFunction.validateToken(token);
        return {
            code: 0,
            message: 'valid token'
        }
    } catch (err){
        return {
            code: 1,
            message: 'invalid token'
        }
    }
}

export async function loginUser(userData: ILoginRq){
    const { email, password } = userData;
    if (!userData.email || !userData.password){
        throw new BadRequestError('Please provide all values!');
    }
    const user = await User.findOne({ email });

    if (!user){
        throw new UnAuthenticatedError('Invalid email or password')
    }

    const isPasswordMatch = await utilsFunction.comparePassword(password, user.password);

    if (!isPasswordMatch) {
        throw new UnAuthenticatedError('Invalid password');
    }

    const token = await utilsFunction.generateToken({userId: user.id, name: user.username})

    return {user, token};
}


export async function updateUser(userId: string, updateData: IUserUpdateRq){

    const { username, email, password } = updateData

   
    if (!username || !email || !password) {
        throw new BadRequestError('Please provide all values')
    }
    
    const user = await User.findOne({ _id: userId })

    if (!user){
        throw new BadRequestError('User not found')
    }

    user.username = username
    user.email = email
    user.password = password

    await user.save()
    

    return { user};

}

export async function deleteUser(userId: string): Promise<void> {
    const deletedUser =await User.findByIdAndDelete(userId);
    if (!deletedUser){
        throw new BadRequestError('User not found');
    }
}

export async function listAllUsers(): Promise<IGetAllUsers[]> {
    const user = await User.find({})
    return user
}