const db = require('../config/db');

/**
 * GET /api/projects
 * Returns all projects, featured ones first
 */
const getAllProjects = async (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = 'SELECT * FROM projects';
    const params = [];
    const conditions = [];

    if (category) {
      params.push(category);
      conditions.push(`category = $${params.length}`);
    }

    if (featured === 'true') {
      conditions.push('featured = TRUE');
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY featured DESC, created_at DESC';

    const result = await db.query(query, params);
    res.json({ success: true, data: result.rows, count: result.rows.length });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch projects' });
  }
};

/**
 * GET /api/projects/:id
 * Returns a single project by ID
 */
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM projects WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch project' });
  }
};

module.exports = { getAllProjects, getProjectById };
