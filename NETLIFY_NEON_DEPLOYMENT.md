# 🌐 Netlify + Neon Database Deployment Guide - FENIX Construction Tracker

## 📋 Overview

This guide shows you how to deploy your FENIX Construction Tracker app on Netlify with Neon PostgreSQL database using Netlify Functions. This is a **serverless solution** that keeps everything on Netlify!

## 🚀 Why Netlify + Neon?

- ✅ **Everything on Netlify** - No external backend needed
- ✅ **Serverless Functions** - Automatic scaling
- ✅ **Neon Database** - Serverless PostgreSQL
- ✅ **Free Tier** - Both Netlify and Neon have generous free tiers
- ✅ **Easy Setup** - Integrated deployment

## 📦 Step-by-Step Deployment

### Step 1: Set Up Neon Database

1. **Create Neon Account**
   - Go to [Neon.tech](https://neon.tech)
   - Sign up for free account
   - Create new project

2. **Get Connection String**
   - Go to your project dashboard
   - Click "Connection Details"
   - Copy the connection string
   - It looks like: `postgresql://username:password@host/database`

3. **Test Connection**
   ```bash
   # Install psql or use Neon's web console
   psql "your-neon-connection-string"
   ```

### Step 2: Configure Netlify Environment Variables

1. **Go to Netlify Dashboard**
   - Navigate to your site settings
   - Go to "Environment variables"

2. **Add These Variables:**
   ```env
   # Database
   DATABASE_URL=postgresql://username:password@host/database
   
   # JWT Secret (generate a strong one)
   JWT_SECRET=your-super-secret-jwt-key-here
   
   # App Configuration
   NODE_ENV=production
   ```

### Step 3: Deploy to Netlify

**Option A: Netlify CLI**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize Netlify (if not already done)
netlify init

# Deploy
netlify deploy --prod
```

**Option B: Netlify Dashboard**
1. Go to [Netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
   - Functions directory: `netlify/functions`
5. Add environment variables
6. Deploy

### Step 4: Set Up Database Schema

After deployment, you need to set up your database:

1. **Install Dependencies in Functions Directory**
   ```bash
   cd netlify/functions
   npm install
   ```

2. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

3. **Push Schema to Neon**
   ```bash
   npx prisma db push
   ```

4. **Seed Database**
   ```bash
   npx prisma db seed
   ```

### Step 5: Test Your Deployment

1. **Check Health Endpoint**
   ```
   https://your-site.netlify.app/.netlify/functions/api/health
   ```

2. **Test Login**
   - Go to your deployed site
   - Try logging in with test credentials
   - Check browser console for errors

## 🔧 Configuration Files

### Netlify Configuration (`netlify.toml`)
```toml
[build]
  command = "npm run build"
  publish = "build"
  functions = "netlify/functions"

[build.environment]
  REACT_APP_API_URL = "/.netlify/functions/api"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Functions Package.json (`netlify/functions/package.json`)
```json
{
  "name": "fenix-netlify-functions",
  "version": "1.0.0",
  "dependencies": {
    "@prisma/client": "^5.7.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2"
  },
  "devDependencies": {
    "prisma": "^5.7.1"
  }
}
```

### Prisma Schema (`netlify/functions/prisma/schema.prisma`)
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Your models here...
```

## 🌍 Environment Variables Setup

### Required Environment Variables

**In Netlify Dashboard:**
```env
# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://username:password@host/database

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-here

# App Configuration
NODE_ENV=production
```

**Frontend Environment Variables:**
```env
# This is set automatically by netlify.toml
REACT_APP_API_URL=/.netlify/functions/api
```

## 🔄 Database Operations

### Local Development
```bash
# Set up local database
cp env.example .env
# Edit .env with your Neon connection string

# Generate Prisma client
npx prisma generate

# Push schema
npx prisma db push

# Seed data
npx prisma db seed
```

### Production Database Management
```bash
# Connect to Neon database
npx prisma studio

# Run migrations
npx prisma migrate deploy

# Reset database (WARNING: Deletes all data)
npx prisma migrate reset
```

## 🛠️ Troubleshooting

### Common Issues

**1. Function Timeout**
- Netlify Functions have a 10-second timeout
- Optimize database queries
- Use connection pooling

**2. Database Connection Issues**
- Check `DATABASE_URL` format
- Verify Neon database is active
- Check SSL configuration

**3. CORS Errors**
- Functions handle CORS automatically
- Check browser console for errors
- Verify API endpoints

**4. Build Errors**
- Check all dependencies are installed
- Verify Prisma client is generated
- Check for TypeScript errors

### Debug Commands
```bash
# Test database connection
npx prisma studio

# Check function logs
netlify functions:list

# Test API locally
netlify dev

# Check environment variables
netlify env:list
```

## 📊 Monitoring

### Function Logs
- Go to Netlify dashboard
- Navigate to Functions → Logs
- Monitor function execution

### Database Monitoring
- Use Neon dashboard
- Monitor connection count
- Check query performance

### Health Checks
```bash
# Test API health
curl https://your-site.netlify.app/.netlify/functions/api/health

# Test database connection
curl https://your-site.netlify.app/.netlify/functions/api/users
```

## 🔒 Security

### Environment Variables
- Never commit `.env` files
- Use strong JWT secrets
- Rotate database passwords

### Database Security
- Use SSL connections
- Restrict database access
- Regular backups

### Function Security
- Validate all inputs
- Use proper authentication
- Rate limiting (if needed)

## 💰 Cost Optimization

### Free Tier Limits
- **Netlify**: 125K function invocations/month
- **Neon**: 0.5GB storage, 10GB transfer/month

### Optimization Tips
- Use connection pooling
- Optimize database queries
- Cache frequently accessed data
- Monitor function usage

## 📞 Support

### Getting Help
1. Check Netlify function logs
2. Verify environment variables
3. Test database connection
4. Check Neon dashboard

### Useful Resources
- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/)
- [Neon Documentation](https://neon.tech/docs)
- [Prisma Documentation](https://prisma.io/docs)
- [Netlify CLI](https://docs.netlify.com/cli/get-started/)

## 🎉 Deployment Checklist

- [ ] Neon database created and connected
- [ ] Environment variables set in Netlify
- [ ] Netlify functions deployed
- [ ] Database schema pushed
- [ ] Initial data seeded
- [ ] Health endpoint working
- [ ] Login functionality tested
- [ ] All features working

---

**Your FENIX Construction Tracker is now running on Netlify with Neon database! 🚀** 