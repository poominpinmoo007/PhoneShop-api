# PhoneShop API

A RESTful API for PhoneShop application built with Node.js, Express, and Prisma using **Modular Routes Architecture**.

## 🏗️ Project Structure (Modular Routes)

```
api/
├── bin/
│   └── www                  # Server startup script
├── config/
│   ├── default.js           # Default configuration
│   ├── production.js        # Production configuration
│   └── index.js             # Configuration loader
├── src/
│   ├── controllers/         # HTTP request handlers
│   │   ├── CompanyController.js
│   │   ├── ProductController.js
│   │   ├── SellController.js
│   │   ├── ServiceController.js
│   │   └── UserController.js
│   ├── routes/              # 🔥 Modular API route definitions
│   │   ├── company.routes.js    # Company endpoints
│   │   ├── product.routes.js    # Product/Buy endpoints
│   │   ├── sell.routes.js       # Sell endpoints
│   │   ├── service.routes.js    # Service endpoints
│   │   └── user.routes.js       # User endpoints
│   ├── services/            # Business logic (.gitkeep)
│   ├── models/              # Database models (.gitkeep)
│   ├── middlewares/         # Custom middleware
│   │   └── auth.middleware.js
│   ├── utils/               # Utility functions
│   │   └── logger.js
│   ├── validators/          # Input validation
│   │   └── user.validator.js
│   └── server.js            # 🚀 Main application entry point
├── tests/                   # Unit & Integration tests
├── prisma/                  # Database schema and migrations
│   └── schema.prisma
├── .env.example             # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## ✨ Key Features

- **🔥 Modular Routes**: Clean separation of API endpoints
- **🏗️ MVC Architecture**: Controllers, Routes, and Middleware separation
- **🔐 JWT Authentication**: Secure user authentication
- **📊 Database Integration**: Prisma ORM with PostgreSQL
- **🛡️ Input Validation**: Request validation and sanitization
- **📝 Structured Logging**: Custom logger utility
- **🔧 Environment Configuration**: Multiple environment support

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd api
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

### Running the Application

#### 🚀 Development mode (Recommended)
```bash
npm run dev
# Server will start with nodemon for auto-restart
# Access at: http://localhost:3001
```

#### 🏭 Production mode
```bash
npm run start:prod
# Optimized for production environment
```

#### 📜 Using bin/www startup script
```bash
npm run start:bin
# Alternative startup method
```

#### 🧪 Test API Endpoints
```bash
# Health check
curl http://localhost:3001/health

# Test user endpoints
curl http://localhost:3001/api/user/list
curl http://localhost:3001/api/company/list
```

## 🔗 API Endpoints (Modular Routes)

### 🩺 Health Check
- `GET /health` - API health status

### 👥 User Management (`/api/user/*` → `user.routes.js`)
- `POST /api/user/signin` - User authentication
- `GET /api/user/info` - Get user information (requires token)
- `PUT /api/user/update` - Update user profile (requires token)
- `GET /api/user/list` - List all users
- `POST /api/user/create` - Create new user
- `PUT /api/user/update/:id` - Update user by ID
- `DELETE /api/user/delete/:id` - Delete user by ID

### 🏢 Company Management (`/api/company/*` → `company.routes.js`)
- `POST /api/company/create` - Create/Update company
- `GET /api/company/list` - Get company information

### 📦 Product/Buy Management (`/api/buy/*` → `product.routes.js`)
- `POST /api/buy/create` - Create new product purchase
- `GET /api/buy/list` - List all purchases
- `PUT /api/buy/update/:id` - Update purchase by ID
- `DELETE /api/buy/delete/:id` - Delete purchase by ID

### 💰 Sell Management (`/api/sell/*` → `sell.routes.js`)
- `POST /api/sell/create` - Create new sale
- `GET /api/sell/list` - List all pending sales
- `DELETE /api/sell/remove/:id` - Remove sale by ID
- `GET /api/sell/confirm` - Confirm all pending sales
- `GET /api/sell/dashboard` - Sales dashboard & statistics

### 🔧 Service Management (`/api/service/*` → `service.routes.js`)
- `POST /api/service/create` - Create new service
- `GET /api/service/list` - List all services
- `PUT /api/service/update/:id` - Update service by ID
- `DELETE /api/service/delete/:id` - Delete service by ID

### 📊 Example Responses

**Health Check:**
```json
{
  "status": "OK",
  "message": "PhoneShop API is running (Modular Routes)",
  "timestamp": "2025-06-28T07:36:01.153Z"
}
```

**User List:**
```json
[
  {
    "id": "685f73abf6f5cd0d7011f05c",
    "name": "Test User",
    "username": "test",
    "level": "user",
    "status": "active"
  }
]
```

## ⚙️ Configuration

### 🔧 Current Setup
The application currently uses simple configuration in `src/server.js`:
- **Port**: 3001 (hard-coded)
- **CORS**: Enabled for all origins
- **Environment**: Detected from NODE_ENV

### 🚀 Advanced Configuration (Optional)
For complex deployments, you can use the layered configuration system:
- `config/default.js` - Default settings for all environments
- `config/production.js` - Production-specific overrides
- `config/index.js` - Configuration loader based on NODE_ENV

## 🔐 Environment Variables

See `.env.example` for required environment variables:

- `DATABASE_URL` - PostgreSQL connection string for Prisma
- `JWT_SECRET` - Secret key for JWT token generation  
- `JWT_EXPIRES_IN` - JWT token expiration time (default: 24h)
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - CORS allowed origins

## 🛠️ Development

### 🏗️ Modular Routes Architecture

This project uses **Modular Routes** for better organization:

```javascript
// src/server.js - Main entry point
const userRoutes = require('./routes/user.routes');
const companyRoutes = require('./routes/company.routes');

// Mount routes with prefixes
app.use('/api/user', userRoutes);      // All user endpoints
app.use('/api/company', companyRoutes); // All company endpoints
```

### 📁 Architecture Components

- **🎯 Controllers**: Handle HTTP requests and responses
- **🛣️ Routes**: Modular API endpoint definitions (NEW!)
- **⚙️ Services**: Business logic and data processing
- **🗃️ Models**: Database models using Prisma ORM
- **🛡️ Middlewares**: Authentication, validation, error handling
- **🔧 Utils**: Utility functions and helpers
- **✅ Validators**: Input validation and sanitization

### 🚀 Adding New Features

1. **Create Controller**: `src/controllers/MyController.js`
   ```javascript
   module.exports = {
     MyController: {
       create: async (req, res) => { /* logic */ },
       list: async (req, res) => { /* logic */ }
     }
   };
   ```

2. **Create Route File**: `src/routes/my.routes.js`
   ```javascript
   const router = express.Router();
   const { MyController } = require('../controllers/MyController');
   
   router.post('/create', MyController.create);
   router.get('/list', MyController.list);
   
   module.exports = router;
   ```

3. **Mount in Server**: `src/server.js`
   ```javascript
   const myRoutes = require('./routes/my.routes');
   app.use('/api/my', myRoutes);
   ```

4. **Add Business Logic**: `src/services/MyService.js`
5. **Add Validation**: `src/validators/my.validator.js`

### 🎯 Benefits of Modular Routes

- ✅ **Clean Code**: Shorter, more readable files
- ✅ **Team Collaboration**: No merge conflicts on routes
- ✅ **Easy Testing**: Test routes independently  
- ✅ **Flexible Middleware**: Apply middleware per route group
- ✅ **Scalable**: Easy to add new API modules

## 📈 Performance & Stats

### ⚡ Modular Routes Benefits
- **📉 Code Reduction**: `server.js` reduced from 74 → 35 lines (-53%)
- **🗂️ File Organization**: 5 route modules for better maintainability
- **🚀 Development Speed**: Faster debugging and feature development
- **👥 Team Collaboration**: Reduced merge conflicts

### 🧪 API Testing Results
```
✅ Health Check: Status 200
✅ User API: Status 200 (with data)
✅ Company API: Status 200 (with data)  
✅ Product API: Status 200 (with data)
✅ Sell API: Status 200 (empty = normal)
✅ Service API: Status 200 (with data)
```

## 🤝 Contributing

### 🚀 Quick Start for Contributors
1. **Fork** the repository
2. **Clone** your fork: `git clone <your-fork-url>`
3. **Install** dependencies: `npm install`
4. **Create** feature branch: `git checkout -b feature/new-feature`
5. **Make** your changes following the modular structure
6. **Test** your changes: `npm run dev`
7. **Commit** changes: `git commit -m "Add new feature"`
8. **Push** to branch: `git push origin feature/new-feature`
9. **Submit** a pull request

### 📋 Development Guidelines
- Follow **Modular Routes** pattern for new API endpoints
- Use **Controllers** for business logic
- Add **Validation** for new endpoints
- Update **README.md** for new features
- Test all endpoints before submitting PR

### 🔧 Code Structure Rules
```javascript
// ✅ Good - Modular Route
// src/routes/new-feature.routes.js
router.post('/create', NewFeatureController.create);

// ❌ Avoid - Direct in server.js  
app.post('/api/new-feature/create', NewFeatureController.create);
```

## 📄 License

This project is licensed under the **ISC License**.

## 🆘 Support

- **🐛 Bug Reports**: Create an issue with detailed description
- **💡 Feature Requests**: Propose new features via issues
- **❓ Questions**: Check existing issues or create new one
- **📖 Documentation**: Refer to this README for setup and usage

---

**🎯 Built with ❤️ using Modular Routes Architecture** 