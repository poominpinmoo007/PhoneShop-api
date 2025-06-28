# PhoneShop API

A RESTful API for PhoneShop application built with Node.js, Express, and Prisma.

## Project Structure

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
│   ├── routes/              # API route definitions
│   │   ├── company.routes.js
│   │   ├── product.routes.js
│   │   ├── sell.routes.js
│   │   ├── service.routes.js
│   │   └── user.routes.js
│   ├── services/            # Business logic (to be implemented)
│   ├── models/              # Database models (Prisma)
│   ├── middlewares/         # Custom middleware
│   │   └── auth.middleware.js
│   ├── utils/               # Utility functions
│   │   └── logger.js
│   ├── validators/          # Input validation
│   │   └── user.validator.js
│   ├── app.js               # Express app configuration
│   └── server.js            # Application entry point
├── tests/                   # Unit & Integration tests
│   ├── controllers/
│   └── services/
├── prisma/                  # Database schema and migrations
│   └── schema.prisma
├── .env.example             # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

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

#### Development mode
```bash
npm run dev
```

#### Production mode
```bash
npm run start:prod
```

#### Using bin/www startup script
```bash
npm run start:bin
```

## API Endpoints

### User Management
- `POST /api/user/signin` - User authentication
- `GET /api/user/info` - Get user information
- `PUT /api/user/update` - Update user profile
- `GET /api/user/list` - List all users
- `POST /api/user/create` - Create new user
- `PUT /api/user/update/:id` - Update user by ID
- `DELETE /api/user/delete/:id` - Delete user by ID

### Company Management
- `POST /api/company/create` - Create new company
- `GET /api/company/list` - List all companies

### Product/Buy Management
- `POST /api/buy/create` - Create new product purchase
- `GET /api/buy/list` - List all purchases
- `PUT /api/buy/update/:id` - Update purchase by ID
- `DELETE /api/buy/delete/:id` - Delete purchase by ID

### Sell Management
- `POST /api/sell/create` - Create new sale
- `GET /api/sell/list` - List all sales
- `DELETE /api/sell/remove/:id` - Remove sale by ID
- `GET /api/sell/confirm` - Confirm sales
- `GET /api/sell/dashboard` - Sales dashboard

### Service Management
- `POST /api/service/create` - Create new service
- `GET /api/service/list` - List all services
- `PUT /api/service/update/:id` - Update service by ID
- `DELETE /api/service/delete/:id` - Delete service by ID

### Health Check
- `GET /health` - API health status

## Configuration

The application uses a layered configuration system:

- `config/default.js` - Default settings for all environments
- `config/production.js` - Production-specific overrides
- `config/index.js` - Configuration loader based on NODE_ENV

## Environment Variables

See `.env.example` for required environment variables:

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT token generation
- `JWT_EXPIRES_IN` - JWT token expiration time
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - CORS allowed origins

## Development

### Project Architecture

This project follows a standard Node.js/Express architecture with:

- **Controllers**: Handle HTTP requests and responses
- **Routes**: Define API endpoints and middleware
- **Services**: Business logic and data processing
- **Models**: Database models using Prisma ORM
- **Middlewares**: Custom middleware for authentication, validation, etc.
- **Utils**: Utility functions and helpers
- **Validators**: Input validation and sanitization

### Adding New Features

1. Create controller in `src/controllers/`
2. Define routes in `src/routes/`
3. Add business logic in `src/services/`
4. Create validation in `src/validators/`
5. Update routes in `src/app.js`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the ISC License. 