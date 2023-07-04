import  User  from '../../models/user.model'

export const createUser = async (userData: any) => {
    try {
        const user = await User.create(userData)
        return user
    } catch (error) {
        throw new Error('There was an error creating the user')
    }
}