# Lunoré - Luxury Fashion 

A modern, full-stack e-commerce application built with React, Express, and MongoDB.

## 🚀 Production Deployment

This project is optimized for deployment on Render or similar platforms.

### Environment Variables

Make sure to set the following environment variables in your Render dashboard:

**Backend (Server):**
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Set to `production`

**Frontend:**
- `VITE_API_URL` - Your backend API URL (e.g., https://your-app.onrender.com)

### Deployment Steps

#### Backend Deployment (Render Web Service)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the following:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variables listed above
5. Deploy!

#### Frontend Deployment (Render Static Site)

1. Create a new Static Site on Render
2. Connect your GitHub repository
3. Set the following:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add environment variables
5. Deploy!

## 📦 Tech Stack

- **Frontend**: React 19, React Router, Framer Motion, TailwindCSS
- **Backend**: Node.js, Express, MongoDB, JWT Authentication
- **Build Tool**: Vite

## 🛠️ Local Development

```bash
# Install dependencies
npm install
cd server && npm install

# Run development servers
npm run dev        # Frontend (port 5173)
npm run server     # Backend (port 5000)
```

## 📝 Features

- User authentication with JWT
- Product catalog with filtering
- Shopping cart functionality
- Secure checkout process
- Responsive design
- Smooth animations

## 🔒 Security

- JWT-based authentication
- Password hashing
- CORS protection
- Environment variable configuration

---

Built with ❤️ for luxury shopping experiences
