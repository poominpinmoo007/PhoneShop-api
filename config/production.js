module.exports = {
  app: {
    name: 'PhoneShop API',
    port: process.env.PORT || 3001,
    env: 'production'
  },
  database: {
    url: process.env.DATABASE_URL
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },
  cors: {
    origin: process.env.CORS_ORIGIN || false,
    credentials: true
  }
}; 