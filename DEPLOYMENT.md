# Render Deployment Checklist

## ✅ Files Removed for Production

### Development & Test Files Deleted:
- ✅ `server/seedProducts.js` - Database seeding script
- ✅ `server/checkProducts.js` - Development utility
- ✅ `server/test-register.js` - Test file
- ✅ `eslint.config.js` - ESLint configuration
- ✅ `postcss.config.js` - PostCSS config
- ✅ `pnpm-lock.yaml` (root) - Lock file
- ✅ `server/pnpm-lock.yaml` - Lock file

### Package.json Optimizations:
- ✅ Removed all devDependencies from root package.json
- ✅ Removed nodemon from server package.json
- ✅ Removed dev/seed scripts from server
- ✅ Moved Vite and plugin-react to dependencies (needed for build)

## 📋 Pre-Deployment Checklist

### 1. Environment Variables Setup

**Backend (.env in server/):**
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=production
```

**Frontend (.env in root/):**
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

### 2. Render Configuration

#### Backend Web Service:
- **Name**: lunore-backend
- **Root Directory**: `server`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment**: Node
- **Plan**: Free (or your choice)

**Environment Variables to Add:**
- `MONGODB_URI`
- `JWT_SECRET`
- `NODE_ENV=production`

#### Frontend Static Site:
- **Name**: lunore-frontend
- **Root Directory**: `.` (root)
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`

**Environment Variables to Add:**
- `VITE_API_URL` (your backend URL from above)

### 3. MongoDB Setup
- ✅ Create MongoDB Atlas cluster (if not done)
- ✅ Whitelist Render IP addresses (0.0.0.0/0 for simplicity)
- ✅ Create database user
- ✅ Get connection string

### 4. Final Checks Before Deploy
- [ ] All environment variables configured in Render
- [ ] MongoDB connection string is correct
- [ ] CORS settings in server allow frontend domain
- [ ] API URL in frontend points to backend
- [ ] No hardcoded localhost URLs in code

## 🚀 Deployment Steps

### Step 1: Deploy Backend First
1. Go to Render Dashboard
2. New → Web Service
3. Connect GitHub repo
4. Configure as above
5. Add environment variables
6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. **Copy the backend URL** (e.g., https://lunore-backend.onrender.com)

### Step 2: Deploy Frontend
1. Go to Render Dashboard
2. New → Static Site
3. Connect same GitHub repo
4. Configure as above
5. Add `VITE_API_URL` with backend URL from Step 1
6. Click "Create Static Site"
7. Wait for deployment

### Step 3: Test Your Application
- [ ] Visit frontend URL
- [ ] Test user registration
- [ ] Test user login
- [ ] Test adding products to cart
- [ ] Test checkout flow
- [ ] Check browser console for errors

## 🔧 Troubleshooting

### Backend Issues:
- **500 errors**: Check Render logs for MongoDB connection issues
- **CORS errors**: Update CORS settings in `server.js`
- **JWT errors**: Verify JWT_SECRET is set

### Frontend Issues:
- **API connection failed**: Check VITE_API_URL is correct
- **Build failed**: Check all dependencies are in package.json
- **404 on routes**: Add `_redirects` file with `/* /index.html 200`

## 📊 Production Optimizations Applied

### Build Optimizations:
- ✅ Vite production build with minification
- ✅ Code splitting for vendor chunks
- ✅ Source maps disabled for smaller bundle
- ✅ Tree shaking enabled

### Security:
- ✅ No dev dependencies in production
- ✅ Environment variables for secrets
- ✅ JWT authentication
- ✅ CORS protection

### Performance:
- ✅ Removed unnecessary dev files
- ✅ Optimized bundle size
- ✅ Production-ready server configuration

## 📝 Post-Deployment

### Monitor Your Application:
1. Check Render logs regularly
2. Monitor MongoDB usage
3. Set up error tracking (optional: Sentry)
4. Configure custom domain (optional)

### Maintenance:
- Keep dependencies updated
- Monitor for security vulnerabilities
- Regular database backups
- Performance monitoring

---

**Ready to Deploy!** 🎉

Your application is now optimized for production deployment on Render.
