import mongoose from 'mongoose'
import { MONGODB_CNN } from '../config.js'

export const dbConnection = async () => {
  try {
    await mongoose.connect(MONGODB_CNN, {

    })

    console.log('Base de datos online')
  } catch (error) {
    console.error(error)
    throw new Error('Error a la hora de iniciar la base de datos')
  }
}
