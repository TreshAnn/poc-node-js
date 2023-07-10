import mongoose from 'mongoose'
import validator from 'validator'
import * as utilsFunction from '../../utils/authUtils'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide username']
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email'
        },
        unique: [true, 'Email already exists'],
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    }
})

UserSchema.pre('save', async function(next){
    if (!this.isModified('password')) return
    this.password = await utilsFunction.hashPassword(this.password)
    next()
})

export default mongoose.model('User', UserSchema);