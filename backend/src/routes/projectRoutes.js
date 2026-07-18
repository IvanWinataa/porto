const express = require('express');
const router = express.Router();
const { getAllProjects, getProjectById } = require('../controllers/projectController');

// GET /api/projects       - Get all projects (supports ?category=X&featured=true)
router.get('/', getAllProjects);

// GET /api/projects/:id   - Get single project by ID
router.get('/:id', getProjectById);

module.exports = router;
