import mongoose from 'mongoose'

const MONGODB_URI = 'mongodb://127.0.0.1:27017/electronic_products_db'

const connectDB = async () => {
 try {
  await mongoose.connect(MONGODB_URI, {})
  console.log('Connected to MongoDB')
 } catch (error) {
  console.error('Failed to connect to MongoDB:', error)
 }
}

export default connectDB
