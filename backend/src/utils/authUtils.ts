import bcrypt from 'bcryptjs'

export async function hashPassword(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
}