// db.js
const mongoose = require('mongoose');
require('dotenv').config();
const uri  = process.env.MONGOOSE_URL
// Establishing the MongoDB connection
const connectDB = async () => {
  try {
    // Connect to MongoDB using the URL from environment variables
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);  // Exit process with failure if connection fails
  }
};

module.exports = connectDB;
