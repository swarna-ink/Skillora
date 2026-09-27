// backend/models/Application.js
// আবেদনকারীদের ডাটা সেভ করার জন্য Schema (Job কালেকশনের সাথে Relationship)
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  // রিলেশনশিপ: কোন জবে এপ্লাই করা হচ্ছে তার ID
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  applicantName: {
    type: String,
    required: true,
  },
  applicantEmail: {
    type: String,
    required: true,
  },
  resumeLink: {
    type: String,
    required: true,
  },
  coverLetter: String,
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);