// backend/config/db.js
// MongoDB ডাটাবেজের সাথে সংযোগ স্থাপন করার ফাইল
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // কানেকশন ফেল করলে প্রসেস বন্ধ করবে
  }
};

module.exports = connectDB;