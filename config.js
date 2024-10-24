import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT
export const MONGODB_CNN = process.env.MONGODB_CNN
export const SECRET_KEY = process.env.SECRET_KEY
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID

export const CLOUDINARY_URL = process.env.CLOUDINARY_URL
