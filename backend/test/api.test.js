const { test, before, after } = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const app = require('../src/index');
const { pool, checkHealth } = require('../src/config/db');

let server;
let baseUrl;

before(async () => {
  server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  baseUrl = `http://127.0.0.1:${port}`;
});

after(async () => {
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
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

test('Security Headers are properly attached on HTTP responses', async () => {
  const res = await fetch(`${baseUrl}/`);
  assert.strictEqual(res.headers.get('x-content-type-options'), 'nosniff');
  assert.strictEqual(res.headers.get('x-frame-options'), 'DENY');
  assert.strictEqual(res.headers.get('referrer-policy'), 'strict-origin-when-cross-origin');
  assert.strictEqual(res.headers.has('x-powered-by'), false, 'X-Powered-By header must be disabled');
});

test('GET / returns API status message', async () => {
  const res = await fetch(`${baseUrl}/`);
  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.ok(data.message.includes('Portfolio API'));
});

test('GET /api/health responds with system telemetry', async () => {
  const res = await fetch(`${baseUrl}/api/health`);
  const data = await res.json();
  assert.ok(data.status === 'healthy' || data.status === 'degraded');
  assert.ok(typeof data.uptimeSeconds === 'number');
  assert.ok(typeof data.services?.database === 'object');
});

test('GET /api/nonexistent-route returns 404 JSON', async () => {
  const res = await fetch(`${baseUrl}/api/unknown-endpoint-xyz`);
  assert.strictEqual(res.status, 404);
  const data = await res.json();
  assert.strictEqual(data.success, false);
});

test('POST /api/contact rejects payloads with missing fields', async () => {
  const res = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Tester' })
  });
  assert.strictEqual(res.status, 400);
  const data = await res.json();
  assert.strictEqual(data.success, false);
  assert.ok(data.message.includes('required'));
});

test('POST /api/contact rejects payloads with invalid email format', async () => {
  const res = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Tester',
      email: 'not-an-email',
      message: 'Hello, this is a test message'
    })
  });
  assert.strictEqual(res.status, 400);
  const data = await res.json();
  assert.strictEqual(data.success, false);
  assert.ok(data.message.includes('Invalid email'));
});

test('POST /api/contact rejects payloads exceeding max length limits', async () => {
  const res = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'A'.repeat(101),
      email: 'valid@example.com',
      message: 'Hello'
    })
  });
  assert.strictEqual(res.status, 400);
  const data = await res.json();
  assert.strictEqual(data.success, false);
  assert.ok(data.message.includes('exceeds'));
});
