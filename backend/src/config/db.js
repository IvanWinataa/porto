const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Tangani error tak terduga pada client yang sedang idle agar process node tidak crash
pool.on('error', (err) => {
  console.error('⚠️ Unexpected error on idle PostgreSQL client:', err);
});

/**
 * Memeriksa status koneksi database dan latensi query (SELECT 1)
 * @returns {Promise<{ connected: boolean, latencyMs?: number, error?: string }>}
 */
const checkHealth = async () => {
  const start = Date.now();
  try {
    await pool.query('SELECT 1');
    const latencyMs = Date.now() - start;
    return { connected: true, latencyMs };
  } catch (error) {
    return { connected: false, error: error.message };
  }
};

module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
  checkHealth,
};

