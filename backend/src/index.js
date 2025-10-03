const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Import route files
const toolsRoutes = require('./routes/tools');
const ratingsRoutes = require('./routes/ratings');
const featureRequestRoutes = require('./routes/featureRequest');
const adsRoutes = require('./routes/ads');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet()); // Security middleware
app.use(cors()); // Enable CORS for all origins
app.use(morgan('combined')); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// API Routes
app.use('/api/tools', toolsRoutes);
app.use('/api/ratings', ratingsRoutes);
app.use('/api/feature-request', featureRequestRoutes);
app.use('/api/ads', adsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'AI Tool Marketplace API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to AI Tool Marketplace API',
    version: '1.0.0',
    endpoints: {
      tools: '/api/tools',
      ratings: '/api/ratings',
      featureRequest: '/api/feature-request',
      ads: '/api/ads',
      health: '/api/health'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The requested route ${req.originalUrl} was not found on this server.`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 AI Tool Marketplace API server running on port ${PORT}`);
  console.log(`📖 API Documentation: http://localhost:${PORT}`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
