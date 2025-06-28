module.exports = {
  app: {
    name: 'PhoneShop API',
    port: process.env.PORT || 3001,
    env: process.env.NODE_ENV || 'development'
  },
  database: {
    url: process.env.DATABASE_URL || 'postgresql://localhost:5432/phoneshop'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
  }
}; 