import User from '../db/model/user.model'
import { BadRequestError } from '../errors'
import { IRegisterUserRq } from '../models/User.interface'
import * as utilsFunction from '../utils/authUtils'

export async function createUser(userData: IRegisterUserRq){
    const user = await User.create(userData);

    const token = await utilsFunction.generateToken({userId: user.id, name: user.username})
    return {user, token};
}

export function validate (req: IRegisterUserRq) {
    if (!req.username || !req.email || !req.password) {
        throw new BadRequestError('Please provide all values!');
    }
}
