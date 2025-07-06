# 🚀 FENIX Construction Tracker - Complete Deployment Guide

## 📋 Overview

This guide provides step-by-step instructions for deploying your FENIX Construction Tracker app to production on Vercel with a PostgreSQL database.

## 🎯 Prerequisites

- ✅ GitHub repository: `https://github.com/erector666/fenix.git`
- ✅ Vercel account (free tier available)
- ✅ PostgreSQL database (Vercel Postgres, Supabase, Neon, etc.)
- ✅ Node.js 18+ and npm 8+

## 🚀 Quick Deployment (5 Minutes)

### Step 1: Deploy to Vercel

1. **Go to [Vercel.com](https://vercel.com)**
2. **Sign up/Login** with your GitHub account
3. **Click "New Project"**
4. **Import your repository**: `erector666/fenix`
5. **Configure project settings**:
   - **Framework Preset:** Other
   - **Build Command:** `npm run vercel-build`
   - **Output Directory:** `build`
   - **Install Command:** `npm install`

### Step 2: Set Environment Variables

In your Vercel project dashboard, go to **Settings → Environment Variables** and add:

```env
# Required Variables
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key-here-minimum-32-characters
NODE_ENV=production

# Optional Variables
CORS_ORIGIN=https://your-app.vercel.app
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Step 3: Deploy

Click **"Deploy"** and wait for the build to complete!

## 🗄️ Database Setup

### Option A: Vercel Postgres (Recommended)

1. **In Vercel Dashboard:**
   - Go to **Storage → Create Database**
   - Choose **PostgreSQL**
   - Select your region
   - Copy the connection string

2. **Set Environment Variable:**
   ```env
   DATABASE_URL=your-vercel-postgres-connection-string
   ```

### Option B: Supabase

1. **Create Supabase Project:**
   - Go to [Supabase.com](https://supabase.com)
   - Create new project
   - Go to Settings → Database
   - Copy connection string

2. **Set Environment Variable:**
   ```env
   DATABASE_URL=postgresql://postgres:[password]@[host]:5432/postgres
   ```

### Option C: Neon

1. **Create Neon Project:**
   - Go to [Neon.tech](https://neon.tech)
   - Create new project
   - Copy connection string

2. **Set Environment Variable:**
   ```env
   DATABASE_URL=postgresql://username:password@host/database
   ```

## 🔧 Post-Deployment Setup

### Step 1: Set Up Database Schema

After deployment, you need to set up your database:

```bash
# Clone your repository locally
git clone https://github.com/erector666/fenix.git
cd fenix

# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with initial data
npm run db:seed
```

### Step 2: Test Your Deployment

1. **Check Health Endpoint:**
   ```
   https://your-app.vercel.app/api/health
   ```

2. **Test Login:**
   - Go to your deployed app
   - Try logging in with test credentials:
     - **Admin:** `kango@fenix.com` / `admin123`
     - **Employee:** `petre@fenix.com` / `admin123`

## 📁 Project Structure

```
fenix/
├── server/
│   └── index.js          # API server (Vercel function)
├── src/
│   ├── App.js            # React app
│   └── services/
│       └── api.js        # API client
├── prisma/
│   └── schema.prisma     # Database schema
├── vercel.json           # Vercel configuration
├── package.json          # Dependencies and scripts
├── env.production.example # Production environment template
└── README.md
```

## 🔧 Configuration Files

### Vercel Configuration (`vercel.json`)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.js",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "functions": {
    "server/index.js": {
      "maxDuration": 30
    }
  }
}
```

### Package.json Scripts
```json
{
  "scripts": {
    "vercel-build": "npm run build",
    "postinstall": "prisma generate",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:seed": "node server/seed.js"
  }
}
```

## 🌍 Environment Variables

### Required Variables

**In Vercel Dashboard:**
```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-here

# App Configuration
NODE_ENV=production
```

**Frontend Environment Variables:**
```env
# This is set automatically by vercel.json
REACT_APP_API_URL=/api
```

## 🔄 Database Operations

### Local Development
```bash
# Set up local database
cp env.production.example .env
# Edit .env with your database connection string

# Generate Prisma client
npm run db:generate

# Push schema
npm run db:push

# Seed data
npm run db:seed
```

### Production Database Management
```bash
# Connect to database
npx prisma studio

# Run migrations
npx prisma migrate deploy

# Reset database (WARNING: Deletes all data)
npx prisma migrate reset
```

## 🛠️ Troubleshooting

### Common Issues

**1. Build Errors**
- Check all dependencies are installed
- Verify Prisma client is generated
- Check for TypeScript/JavaScript errors

**2. Database Connection Issues**
- Verify `DATABASE_URL` format
- Check database is accessible
- Ensure SSL is configured properly

**3. API Not Working**
- Check Vercel function logs
- Verify API endpoints are accessible
- Test with Postman or curl

**4. CORS Errors**
- Check CORS configuration in server
- Verify frontend URL matches
- Check browser console for errors

### Debug Commands
```bash
# Test database connection
npx prisma studio

# Check API health
curl https://your-app.vercel.app/api/health

# Test frontend build
npm run build

# Check environment variables
echo $DATABASE_URL
```

## 📊 Monitoring

### Vercel Dashboard
- **Functions:** Monitor serverless function performance
- **Analytics:** Track page views and performance
- **Logs:** View function execution logs

### Database Monitoring
- **Vercel Postgres:** Built-in monitoring
- **Supabase:** Dashboard with metrics
- **Neon:** Performance insights

### Health Checks
```bash
# Test API health
curl https://your-app.vercel.app/api/health

# Test database connection
curl https://your-app.vercel.app/api/users
```

## 🔒 Security

### Environment Variables
- Never commit `.env` files
- Use strong JWT secrets
- Rotate database passwords regularly

### Database Security
- Use SSL connections
- Restrict database access
- Regular backups

### API Security
- Validate all inputs
- Use proper authentication
- Rate limiting (if needed)

## 💰 Cost Optimization

### Free Tier Limits
- **Vercel:** 100GB bandwidth, 100 serverless function executions/day
- **Vercel Postgres:** 256MB storage, 0.5GB bandwidth
- **Supabase:** 500MB database, 2GB bandwidth
- **Neon:** 0.5GB storage, 10GB transfer

### Optimization Tips
- Use connection pooling
- Optimize database queries
- Cache frequently accessed data
- Monitor function usage

## 📱 Mobile App Deployment

### Android App
```bash
# Build for Android
npm run build:android

# Build release APK
npm run build:android:release
```

### Capacitor Configuration
```bash
# Sync with Capacitor
npx cap sync android

# Open in Android Studio
npx cap open android
```

## 📞 Support

### Getting Help
1. Check Vercel deployment logs
2. Verify environment variables
3. Test API endpoints
4. Check database connection

### Useful Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Documentation](https://prisma.io/docs)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Supabase Documentation](https://supabase.com/docs)

## 🎉 Deployment Checklist

- [ ] Vercel account created
- [ ] GitHub repository connected
- [ ] Environment variables set
- [ ] Database created and connected
- [ ] Build completed successfully
- [ ] Database schema pushed
- [ ] Initial data seeded
- [ ] Health endpoint working
- [ ] Login functionality tested
- [ ] All features working
- [ ] Mobile app tested (if applicable)
- [ ] Performance optimized
- [ ] Security measures implemented
- [ ] Monitoring set up

## 🚀 Production Features

### ✅ What's Included
- **Full-stack React app** with Node.js backend
- **PostgreSQL database** with Prisma ORM
- **JWT authentication** with secure tokens
- **GPS location tracking** for employees
- **Work session management** with start/end times
- **Vehicle tracking** with kilometer logging
- **Multi-language support** (English, Macedonian, Albanian, German, Spanish)
- **Mobile-responsive design** with Tailwind CSS
- **Real-time updates** and notifications
- **Admin dashboard** with comprehensive reporting
- **Photo capture** for work documentation
- **Break management** during work sessions
- **Export functionality** for reports
- **Secure API endpoints** with proper validation

### 🔧 Technical Stack
- **Frontend:** React.js, Tailwind CSS, Lucide React
- **Backend:** Node.js, Express.js, Prisma ORM
- **Database:** PostgreSQL
- **Authentication:** JWT tokens with bcrypt
- **Deployment:** Vercel (serverless)
- **Mobile:** Capacitor for Android app
- **Maps:** Google Maps API integration

---

**Your FENIX Construction Tracker is now ready for production deployment! 🚀**

Visit: [https://vercel.com](https://vercel.com) to deploy your application 