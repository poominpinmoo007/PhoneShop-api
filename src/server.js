const express = require("express");
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import route files (แบบใหม่ - Modular Routes)
const userRoutes = require('./routes/user.routes');
const companyRoutes = require('./routes/company.routes');
const productRoutes = require('./routes/product.routes');
const sellRoutes = require('./routes/sell.routes');
const serviceRoutes = require('./routes/service.routes');

console.log("✅ All route modules loaded successfully!");

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'PhoneShop API is running (Modular Routes)',
    timestamp: new Date().toISOString()
  });
});

// Mount routes with prefixes (แบบใหม่)
app.use('/api/user', userRoutes);       // /api/user/* -> user.routes.js
app.use('/api/company', companyRoutes); // /api/company/* -> company.routes.js
app.use('/api/buy', productRoutes);     // /api/buy/* -> product.routes.js
app.use('/api/sell', sellRoutes);       // /api/sell/* -> sell.routes.js
app.use('/api/service', serviceRoutes); // /api/service/* -> service.routes.js

console.log("✅ All API routes mounted successfully!");

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message
  });
});

app.listen(port, () => {
  console.log(`PhoneShop API is running on port ${port}`);
}); 