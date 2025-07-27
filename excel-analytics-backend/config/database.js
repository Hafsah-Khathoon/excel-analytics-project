const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const connectDB = async () => {
  console.log('Environment variables loaded:');
  console.log('MONGODB_URI:', process.env.MONGODB_URI);
  console.log('PORT:', process.env.PORT);
  try {
    // For development, use MongoDB Atlas or local MongoDB
    // You can get a free MongoDB Atlas account at https://www.mongodb.com/atlas
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://admin:admin123@cluster0.9dqblv8.mongodb.net/excel-analytics?retryWrites=true&w=majority&appName=Cluster0';
    
    console.log('Attempting to connect to MongoDB...');
    console.log('Connection string:', mongoUri);
    
    // Add connection options for better compatibility
    const options = {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    };
    
    const conn = await mongoose.connect(mongoUri, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    console.log('Please make sure MongoDB is running or update MONGODB_URI in .env file');
    console.log('For MongoDB Atlas: Create a free account at https://www.mongodb.com/atlas');
    console.log('For local MongoDB: Install MongoDB Community Server');
    process.exit(1);
  }
};

module.exports = connectDB; 