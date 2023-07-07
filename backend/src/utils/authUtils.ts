import bcrypt from 'bcryptjs'
import jwt, { Secret }from 'jsonwebtoken'

export async function hashPassword(password: string){
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

const secretKey: Secret = process.env.JWT_SECRET_KEY || 'secret_key';

export async function generateToken(payload: any): Promise<string> {
    return jwt.sign(payload, secretKey, { expiresIn: '1d' });
}

export async function comparePassword(candidatePassword: string, hashedPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(candidatePassword, hashedPassword);
    return isMatch;
  }
