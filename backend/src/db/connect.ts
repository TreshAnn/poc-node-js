import mongoose from 'mongoose'

const connectDB = (url: string, dbName: string) => {
    return mongoose.connect(`${url}/${dbName}`)
}

export default connectDB;