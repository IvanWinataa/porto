const fs = require('fs');
const path = require('path');
const { pool, checkHealth } = require('../config/db');

async function initDatabase() {
  console.log('🔄 Checking PostgreSQL connection...');
  const health = await checkHealth();

  if (!health.connected) {
    console.error('❌ Cannot connect to PostgreSQL database.');
    console.error('   Error details:', health.error);
    console.error('   Please verify DATABASE_URL in backend/.env is running and valid.');
    process.exit(1);
  }

  console.log(`✅ Connected to database (ping: ${health.latencyMs}ms).`);

  const schemaPath = path.join(__dirname, '..', 'config', 'schema.sql');
  if (!fs.existsSync(schemaPath)) {
    console.error('❌ Schema file not found at:', schemaPath);
    process.exit(1);
  }

  const sqlContent = fs.readFileSync(schemaPath, 'utf8');

  try {
    console.log('📦 Executing database schema and seed data...');
    await pool.query(sqlContent);

    // Verify row counts
    const projectCount = await pool.query('SELECT COUNT(*)::int AS count FROM projects');
    const messageCount = await pool.query('SELECT COUNT(*)::int AS count FROM messages');

    console.log('🎉 Database initialization successful!');
    console.log(`   - Total projects in database: ${projectCount.rows[0].count}`);
    console.log(`   - Total messages in database: ${messageCount.rows[0].count}`);
  } catch (error) {
    console.error('❌ Error executing database script:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

initDatabase();
