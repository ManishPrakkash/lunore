# 🚀 Render Deployment Guide - Lunoré E-Commerce

## Quick Start Deployment

### Step 1: Prepare Your Repository
```bash
# Commit all changes
git add .
git commit -m "Production ready for Render deployment"
git push origin main
```

### Step 2: Deploy on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render will auto-detect `render.yaml` and create both services

### Step 3: Add Secret Environment Variables

In Render Dashboard, add these to **lunore-backend** service:

**MONGODB_URI**
```
mongodb+srv://username:password@cluster.mongodb.net/lunore?retryWrites=true&w=majority
```

**JWT_SECRET** (generate with: `openssl rand -base64 32`)
```
your-secure-random-string-here
```

### Step 4: Deploy!

Click **"Apply"** and wait 5-10 minutes. Done! 🎉

## What's Configured

✅ Backend API (Node.js/Express) on `/server`
✅ Frontend (React/Vite) on `/`
✅ Auto-deploy on git push
✅ CORS auto-configured
✅ Security headers
✅ React Router support
✅ Health checks

## URLs After Deployment

- **Backend**: `https://lunore-backend.onrender.com`
- **Frontend**: `https://lunore-frontend.onrender.com`
- **Health Check**: `https://lunore-backend.onrender.com/api/health`

## Troubleshooting

**Build fails?** Check Render logs in dashboard
**CORS errors?** Verify CORS_ORIGIN is set correctly
**MongoDB errors?** Check MONGODB_URI format and IP whitelist

---
**Need help?** Check `DEPLOYMENT.md` for detailed guide
