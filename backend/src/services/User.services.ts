import User from '../db/model/user.model'
import { BadRequestError,UnAuthenticatedError } from '../errors'
import { IUserRq } from '../models/User.interface'
import * as utilsFunction from '../utils/authUtils'

export async function createUser(userData: IUserRq){
    return await User.create(userData);
}

export function validate (req: IUserRq) {
    if (!req.username || !req.email || !req.password) {
        throw new BadRequestError('Please provide all values!');
    }
}
export async function loginUser(userData: IUserRq){
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

    return {user};
}