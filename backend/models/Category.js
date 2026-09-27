// backend/models/Category.js
// ক্যাটাগরি কালেকশনের জন্য Mongoose Schema
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // প্রতিটি ক্যাটাগরির নাম ইউনিক হবে
  },
  description: String,
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);