const express = require('express');
const { rateLimit } = require('express-rate-limit');
const router = express.Router();
const { createMessage } = require('../controllers/contactController');

const contactSubmissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many messages sent. Please try again in 15 minutes.'
  }
});

// POST /api/contact  - Submit a contact message
router.post('/', contactSubmissionLimiter, createMessage);

module.exports = router;
