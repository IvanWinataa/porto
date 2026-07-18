const db = require('../config/db');

/**
 * POST /api/contact
 * Save a contact message from a visitor
 */
const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields (name, email, message) are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address.' });
    }

    const result = await db.query(
      'INSERT INTO messages (name, email, message) VALUES ($1, $2, $3) RETURNING id, created_at',
      [name.trim(), email.trim().toLowerCase(), message.trim()]
    );

    res.status(201).json({
      success: true,
      message: 'Your message has been received! I will get back to you soon.',
      data: { id: result.rows[0].id, sent_at: result.rows[0].created_at }
    });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
  }
};

module.exports = { createMessage };
