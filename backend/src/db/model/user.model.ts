import mongoose from 'mongoose'
import validator from 'validator'
// import bcrypt from 'bcryptjs'
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

// UserSchema.pre('save', async function(){
//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password, salt)
// })

UserSchema.pre('save', async function(){
    await utilsFunction.hashPassword();
})

export default mongoose.model('User', UserSchema);