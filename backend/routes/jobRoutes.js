// backend/routes/jobRoutes.js
// Express API Router
const express = require('express');
const router = express.Router();
const {
  createCategory,
  getCategories,
  createJob,
  getJobs,
  getJobById,
  applyForJob,
} = require('../controllers/jobController');

// Categories Routes
router.post('/categories', createCategory);
router.get('/categories', getCategories);

// Jobs Routes
router.post('/jobs', createJob);
router.get('/jobs', getJobs);
router.get('/jobs/:id', getJobById);

// Application Route
router.post('/jobs/:id/apply', applyForJob);

module.exports = router;