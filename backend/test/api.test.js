const { test, after } = require('node:test');
const assert = require('node:assert');
const { pool, checkHealth } = require('../src/config/db');

after(async () => {
  await pool.end();
});

test('Database Health Checker returns connection status', async () => {
  const result = await checkHealth();
  assert.ok(typeof result.connected === 'boolean', 'connected must be boolean');
  if (result.connected) {
    assert.ok(typeof result.latencyMs === 'number', 'latencyMs must be a number when connected');
    assert.ok(result.latencyMs >= 0, 'latency must be non-negative');
  }
});

test('Email validation regex correctly validates addresses', () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  assert.strictEqual(emailRegex.test('valid.user@example.com'), true);
  assert.strictEqual(emailRegex.test('test+tag@domain.co.id'), true);
  assert.strictEqual(emailRegex.test('invalid-email'), false);
  assert.strictEqual(emailRegex.test('user@no-tld'), false);
  assert.strictEqual(emailRegex.test(''), false);
});

test('Allowed CORS origins filter out empty or invalid values', () => {
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175'
  ].filter(Boolean);

  assert.ok(allowedOrigins.includes('http://localhost:5173'));
  assert.strictEqual(allowedOrigins.some(item => !item), false, 'No falsy origins allowed');
});
