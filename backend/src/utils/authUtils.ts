import bcrypt from 'bcryptjs'

export async function hashPassword(password: string){
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}
export async function comparePassword(candidatePassword: string, hashedPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(candidatePassword, hashedPassword);
    return isMatch;
 }