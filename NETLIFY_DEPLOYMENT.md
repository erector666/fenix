# 🌐 Netlify Deployment Guide - FENIX Construction Tracker

## 📋 Overview

Since Netlify is a static site hosting platform, we need to deploy the backend API separately and connect it to an external database. This guide shows you how to make your FENIX app work on Netlify.

## 🚀 Deployment Strategy

### Frontend: Netlify (Static React App)
### Backend: Vercel/Railway/Render (Node.js API)
### Database: External PostgreSQL/MySQL Provider

## 📦 Step-by-Step Deployment

### Step 1: Deploy Backend API

**Option A: Vercel (Recommended)**
```bash
# Create a new directory for backend
mkdir fenix-backend
cd fenix-backend

# Copy backend files
cp -r server/ ./
cp package.json ./
cp prisma/ ./
cp .env ./

# Deploy to Vercel
vercel --prod
```

**Option B: Railway**
1. Go to [Railway.app](https://railway.app)
2. Connect your GitHub repository
3. Select the backend directory
4. Add environment variables
5. Deploy

**Option C: Render**
1. Go to [Render.com](https://render.com)
2. Create new Web Service
3. Connect your repository
4. Set build command: `npm install && npm run db:generate`
5. Set start command: `npm run server`

### Step 2: Set Up Database

**Option A: Supabase (Recommended)**
1. Go to [Supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database
4. Copy connection string
5. Update your backend environment variables

**Option B: Neon**
1. Go to [Neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string
4. Update environment variables

**Option C: PlanetScale (MySQL)**
1. Go to [Planetscale.com](https://planetscale.com)
2. Create new database
3. Copy connection string
4. Update schema for MySQL

### Step 3: Configure Environment Variables

**Backend Environment Variables:**
```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# App Configuration
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://your-netlify-app.netlify.app
```

**Frontend Environment Variables (Netlify):**
```env
REACT_APP_API_URL=https://your-backend-url.vercel.app/api
```

### Step 4: Deploy Frontend to Netlify

**Option A: Netlify CLI**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=build
```

**Option B: Netlify Dashboard**
1. Go to [Netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Set build command: `npm run build`
5. Set publish directory: `build`
6. Add environment variables
7. Deploy

### Step 5: Set Up Database Schema

After backend deployment, run these commands:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to production database
npm run db:push

# Seed with initial data
npm run db:seed
```

## 🔧 Configuration Files

### Netlify Configuration (`netlify.toml`)
```toml
[build]
  command = "npm run build"
  publish = "build"

[build.environment]
  REACT_APP_API_URL = "https://your-backend-url.vercel.app/api"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Backend Package.json (for separate deployment)
```json
{
  "name": "fenix-backend",
  "version": "1.0.0",
  "main": "server/index.js",
  "scripts": {
    "start": "node server/index.js",
    "dev": "nodemon server/index.js",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:seed": "node server/seed.js"
  },
  "dependencies": {
    "@prisma/client": "^5.7.1",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2"
  },
  "devDependencies": {
    "prisma": "^5.7.1"
  }
}
```

## 🌍 Environment Variables Setup

### Netlify Environment Variables
1. Go to your Netlify dashboard
2. Navigate to Site settings → Environment variables
3. Add:
   - `REACT_APP_API_URL`: Your backend API URL

### Backend Environment Variables
1. Go to your backend deployment platform
2. Add environment variables:
   - `DATABASE_URL`: Your database connection string
   - `JWT_SECRET`: Your JWT secret key
   - `CORS_ORIGIN`: Your Netlify app URL

## 🔄 Database Migration

### From Development to Production
```bash
# Generate migration
npx prisma migrate dev --name production-setup

# Deploy migration to production
npx prisma migrate deploy

# Seed production database
npm run db:seed
```

### Backup and Restore
```bash
# Backup database
pg_dump your_database > backup.sql

# Restore database
psql your_database < backup.sql
```

## 🛠️ Troubleshooting

### Common Issues

**1. CORS Errors**
- Ensure `CORS_ORIGIN` is set correctly in backend
- Check that frontend URL matches exactly

**2. Database Connection Issues**
- Verify `DATABASE_URL` is correct
- Check database is accessible from backend
- Ensure SSL is configured properly

**3. Build Errors**
- Check all dependencies are installed
- Verify environment variables are set
- Check for TypeScript/JavaScript errors

**4. API Not Working**
- Verify backend is deployed and running
- Check API endpoints are accessible
- Test with Postman or curl

### Debug Commands
```bash
# Test database connection
npx prisma studio

# Check API health
curl https://your-backend-url.vercel.app/api/health

# Test frontend build
npm run build

# Check environment variables
echo $REACT_APP_API_URL
```

## 📊 Monitoring

### Health Checks
- Backend: `https://your-backend-url.vercel.app/api/health`
- Database: Check connection status
- Frontend: Verify all features work

### Logs
- Netlify: Site settings → Functions → Logs
- Backend: Check deployment platform logs
- Database: Monitor connection and query performance

## 🔒 Security

### Environment Variables
- Never commit `.env` files
- Use strong JWT secrets
- Rotate database passwords regularly

### CORS Configuration
- Only allow your Netlify domain
- Use HTTPS for all connections
- Validate all API requests

## 📞 Support

### Getting Help
1. Check deployment logs
2. Verify environment variables
3. Test API endpoints
4. Check database connection

### Useful Resources
- [Netlify Documentation](https://docs.netlify.com)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Prisma Documentation](https://prisma.io/docs)

---

**Your FENIX Construction Tracker is now ready for Netlify deployment! 🎉** 