const express = require('express');
const router = express.Router();
const { createMessage } = require('../controllers/contactController');

// POST /api/contact  - Submit a contact message
router.post('/', createMessage);

module.exports = router;
