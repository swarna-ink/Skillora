// backend/models/Job.js
// জব কালেকশনের জন্য Mongoose Schema (Category কালেকশনের সাথে Relationship তৈরি করা হয়েছে)
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Remote', 'Contract'],
    default: 'Full-time',
  },
  description: {
    type: String,
    required: true,
  },
  salary: String,
  // MongoDB Relationship: Category-র ObjectId কানেক্ট করা হচ্ছে
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);