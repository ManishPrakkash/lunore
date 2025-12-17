# Lunoré E-Commerce Backend Server

This is the backend server for the Lunoré e-commerce application, built with Node.js and Express.

## Features

- **Authentication**: Login system with admin and customer roles
- **Product Management**: CRUD operations for products (admin only)
- **Shopping Cart**: Cart management per user
- **JSON Storage**: File-based data storage for development

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or pnpm

### Installation

The server dependencies are already installed. If you need to reinstall:

```bash
cd server
npm install
```

### Running the Server

From the root directory:

```bash
npm run server
```

Or with auto-reload (using nodemon):

```bash
npm run server:dev
```

The server will start on `http://localhost:5000`

### Running Frontend and Backend Together

1. **Terminal 1 - Start Backend:**
   ```bash
   npm run server
   ```

2. **Terminal 2 - Start Frontend:**
   ```bash
   npm run dev
   ```

Then visit `http://localhost:5173` in your browser.

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email and password
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user info

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/featured` - Get featured products
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/search?q=query` - Search products
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cart/:userId` - Get user's cart
- `POST /api/cart/:userId/add` - Add item to cart
- `PUT /api/cart/:userId/update` - Update cart item
- `DELETE /api/cart/:userId/remove/:productId` - Remove item
- `DELETE /api/cart/:userId/clear` - Clear cart

## Demo Accounts

### Admin Account
- **Email**: admin@lunore.com
- **Password**: admin123
- **Access**: Can manage products via `/admin` dashboard

### Customer Account
- **Email**: customer@lunore.com
- **Password**: customer123
- **Access**: Can browse and shop

## Data Storage

Data is stored in JSON files in the `server/data/` directory:
- `users.json` - User accounts
- `products.json` - Product catalog
- `cart.json` - Shopping carts

## Environment Variables

Create a `.env` file in the `server/` directory:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Testing the API

### Using curl

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lunore.com","password":"admin123"}'

# Get products
curl http://localhost:5000/api/products

# Add to cart (replace userId with actual user ID)
curl -X POST http://localhost:5000/api/cart/1/add \
  -H "Content-Type: application/json" \
  -d '{"productId":1,"quantity":2}'
```

## Project Structure

```
server/
├── data/              # JSON data files
│   ├── users.json
│   ├── products.json
│   └── cart.json
├── middleware/        # Express middleware
│   └── auth.js
├── routes/            # API routes
│   ├── auth.js
│   ├── products.js
│   └── cart.js
├── utils/             # Utility functions
│   └── fileUtils.js
├── .env               # Environment variables
├── package.json
└── server.js          # Main server file
```

## Notes

- This server uses simple authentication without password hashing (suitable for development only)
- For production, implement proper security measures (bcrypt, JWT, etc.)
- Consider migrating from JSON files to a proper database (MongoDB, PostgreSQL, etc.)
