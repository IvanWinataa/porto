const express = require('express');
const cors = require('cors');
require('dotenv').config();

const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');
const healthRoutes = require('./routes/healthRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Nonaktifkan header X-Powered-By untuk keamanan
app.disable('x-powered-by');

if (process.env.TRUST_PROXY_HOPS) {
  const trustProxyHops = Number(process.env.TRUST_PROXY_HOPS);
  if (!Number.isInteger(trustProxyHops) || trustProxyHops < 1) {
    throw new Error('TRUST_PROXY_HOPS must be a positive integer.');
  }
  app.set('trust proxy', trustProxyHops);
}

// ---- Middleware ----
// Security headers sederhana tanpa dependensi luar
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175'
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// ---- Routes ----
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API v1.0 is running ✅', health: '/api/health' });
});

app.use('/api/health', healthRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// ---- 404 Catch-All Handler ----
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found.' });
});

// ---- Global Error Handler ----
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// ---- Start Server ----
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
