const express = require("express");
const cors = require('cors');

const app = express();

// Middleware - simplified without config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load only user routes for testing
const userRoutes = require('./routes/user.routes');

// Mount only user routes
app.use('/api/user', userRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'PhoneShop API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app; 