const express = require('express');
const router = express.Router();
const { checkHealth } = require('../config/db');

/**
 * GET /api/health
 * Comprehensive system health monitor checking server runtime, memory, and PostgreSQL latency
 */
router.get('/', async (req, res) => {
  const dbHealth = await checkHealth();
  const memory = process.memoryUsage();

  const isHealthy = dbHealth.connected;
  const statusCode = isHealthy ? 200 : 503;

  res.status(statusCode).json({
    success: isHealthy,
    status: isHealthy ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    services: {
      server: {
        status: 'up',
        nodeVersion: process.version,
        memoryUsage: {
          rssMb: Math.round((memory.rss / (1024 * 1024)) * 100) / 100,
          heapUsedMb: Math.round((memory.heapUsed / (1024 * 1024)) * 100) / 100,
        }
      },
      database: {
        status: dbHealth.connected ? 'connected' : 'disconnected',
        latencyMs: dbHealth.latencyMs ?? null,
        error: dbHealth.error ?? null
      }
    }
  });
});

module.exports = router;
