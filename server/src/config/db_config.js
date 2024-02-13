// Import necessary libraries and configurations
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

// MongoDB URI from .env file
const MONGO_DB_URI = process.env.MONGO_URI

// Updated connectToDB function without deprecated options
const connectToDB = async () => {
  try {
    console.log('Connecting to MongoDB...')

    // Connecting to MongoDB without deprecated options
    const DBConnection = await mongoose.connect(MONGO_DB_URI)

    console.log(`Database Connected: ${DBConnection.connection.host}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

// Export the connectToDB function
module.exports = connectToDB
