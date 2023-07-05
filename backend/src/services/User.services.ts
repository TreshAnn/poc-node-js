import User from '../db/model/user.model'
import { BadRequestError } from '../errors'
import { IRegisterUserRq } from '../models/User.interface'

export async function createUser(userData: IRegisterUserRq){
    return await User.create(userData);
}

export function validate (req: IRegisterUserRq) {
    if (!req.username || !req.email || !req.password) {
        throw new BadRequestError('Please provide all values!');
    }
}
