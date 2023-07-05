import User from '../../models/user.model'
import { BadRequestError } from '../../errors'

export const createUser = async (userData: any) => {
    // const userAlreadyExists = await User.findOne(userData.email)

    // if (userAlreadyExists) {
    //     throw new BadRequestError('Email already in use')
    // }

    const user = await User.create(userData)
    return user   
}
