// backend/server.js
// Express সার্ভার এন্ট্রি পয়েন্ট
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const jobRoutes = require('./routes/jobRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes setup
app.use('/api', jobRoutes);

// MongoDB Connection
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));