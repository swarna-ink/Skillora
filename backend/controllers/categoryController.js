// backend/controllers/jobController.js
// জব, ক্যাটাগরি এবং অ্যাপ্লিকেশনের সমস্ত লজিক/ফাংশন
const Job = require('../models/Job');
const Category = require('../models/Category');
const Application = require('../models/Application');

// ১. ক্যাটাগরি তৈরি
exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ২. সব ক্যাটাগরি পাওয়া
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ৩. নতুন জব পোস্ট করা
exports.createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ৪. সব জব দেখা (সার্চ এবং ক্যাটাগরি ফিল্টার সহ)
exports.getJobs = async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    // সার্চ কুয়েরি থাকলে টাইটেল দিয়ে ফিল্টার
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    // ক্যাটাগরি ID ফিল্টার
    if (category) {
      query.category = category;
    }

    // .populate('category') দিয়ে ক্যাটাগরির বিস্তারিত তথ্য একসাথে আনা হচ্ছে (Relationship)
    const jobs = await Job.find(query).populate('category');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ৫. সিঙ্গেল জব ডিটেইলস
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('category');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ৬. জবে আবেদন করা
exports.applyForJob = async (req, res) => {
  try {
    const application = new Application({
      ...req.body,
      job: req.params.id,
    });
    await application.save();
    res.status(201).json({ message: 'Application submitted successfully!', application });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};