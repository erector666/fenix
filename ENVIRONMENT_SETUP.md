# 🔐 Environment Setup Guide - FENIX Construction Tracker

## 📋 Overview

This guide explains how to set up environment variables and database connections for the FENIX Construction Tracker application.

## 🚀 Quick Start

### 1. Copy Environment Template

```bash
# Copy the example file to create your local environment file
cp env.example .env
```

### 2. Configure Your Environment

Edit the `.env` file and replace all `your_*` values with your actual credentials.

## 🗄️ Database Configuration Options

### Option 1: Firebase (Recommended for Real-time)

Firebase is recommended for real-time data synchronization between workers and admins.

#### Setup Steps:
1. **Create Firebase Project:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Firestore Database

2. **Get Firebase Config:**
   - Go to Project Settings → General
   - Scroll down to "Your apps"
   - Click "Add app" → Web app
   - Copy the config object

3. **Update Environment Variables:**
   ```env
   FIREBASE_API_KEY=your_actual_api_key
   FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=123456789
   FIREBASE_APP_ID=your_app_id
   ```

### Option 2: MongoDB

#### Setup Steps:
1. **Local MongoDB:**
   ```bash
   # Install MongoDB locally
   # Or use Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

2. **MongoDB Atlas (Cloud):**
   - Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a cluster
   - Get connection string

3. **Update Environment Variables:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/fenix_construction
   MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/fenix_construction
   ```

### Option 3: PostgreSQL

#### Setup Steps:
1. **Local PostgreSQL:**
   ```bash
   # Install PostgreSQL locally
   # Or use Docker
   docker run -d -p 5432:5432 --name postgres -e POSTGRES_PASSWORD=password postgres:latest
   ```

2. **Update Environment Variables:**
   ```env
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_DATABASE=fenix_construction
   POSTGRES_USER=fenix_user
   POSTGRES_PASSWORD=your_secure_password
   ```

## 🗺️ Google Maps Configuration

### Setup Steps:
1. **Create Google Cloud Project:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable Maps JavaScript API

2. **Get API Key:**
   - Go to APIs & Services → Credentials
   - Create API Key
   - Restrict the key to your domain

3. **Update Environment Variables:**
   ```env
   GOOGLE_MAPS_API_KEY=your_actual_google_maps_api_key
   ```

## 📧 Email & Notification Setup

### SendGrid (Email)
1. **Create SendGrid Account:**
   - Sign up at [SendGrid](https://sendgrid.com/)
   - Verify your domain
   - Create API key

2. **Update Environment Variables:**
   ```env
   SENDGRID_API_KEY=your_sendgrid_api_key
   SENDGRID_FROM_EMAIL=noreply@yourdomain.com
   SENDGRID_FROM_NAME=FENIX Construction
   ```

### Twilio (SMS)
1. **Create Twilio Account:**
   - Sign up at [Twilio](https://www.twilio.com/)
   - Get Account SID and Auth Token
   - Get a phone number

2. **Update Environment Variables:**
   ```env
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=+1234567890
   ```

## ☁️ Cloud Storage Setup

### AWS S3
1. **Create AWS Account:**
   - Sign up at [AWS](https://aws.amazon.com/)
   - Create S3 bucket
   - Create IAM user with S3 access

2. **Update Environment Variables:**
   ```env
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=us-east-1
   AWS_S3_BUCKET=fenix-construction-files
   ```

## 🔐 Security Configuration

### JWT Secrets
Generate secure random strings for JWT secrets:

```bash
# Generate 32-character random string
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate 16-character random string for IV
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

Update environment variables:
```env
JWT_SECRET=your_generated_32_character_secret
JWT_REFRESH_SECRET=your_generated_refresh_secret
ENCRYPTION_KEY=your_32_character_encryption_key
ENCRYPTION_IV=your_16_character_iv
```

## 🚀 Deployment Configuration

### Netlify
1. **Deploy to Netlify:**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `build`

2. **Set Environment Variables:**
   - Go to Site Settings → Environment Variables
   - Add all your production environment variables

### Vercel
1. **Deploy to Vercel:**
   - Connect your GitHub repository
   - Vercel will auto-detect React app

2. **Set Environment Variables:**
   - Go to Project Settings → Environment Variables
   - Add all your production environment variables

## 📱 Mobile App Configuration

### Capacitor Setup
Update the Capacitor configuration in `capacitor.config.ts`:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: process.env.CAPACITOR_APP_ID || 'com.fenix.construction',
  appName: process.env.CAPACITOR_APP_NAME || 'FENIX Construction',
  webDir: 'build',
  server: {
    url: process.env.CAPACITOR_SERVER_URL || 'http://localhost:3000',
    cleartext: true
  }
};

export default config;
```

## 🔧 Development vs Production

### Environment-Specific Files
Create different environment files for different environments:

```bash
# Development
cp env.example .env.development

# Production
cp env.example .env.production

# Testing
cp env.example .env.test
```

### Loading Environment Variables
In your application, load the appropriate environment file:

```javascript
// Load environment variables based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
require('dotenv').config({ path: envFile });
```

## 🛡️ Security Best Practices

### 1. Never Commit Sensitive Data
- ✅ Use `.env` files for local development
- ✅ Set environment variables in deployment platforms
- ❌ Never commit `.env` files to version control

### 2. Use Different Keys for Different Environments
- Development: Use test/development API keys
- Production: Use production API keys
- Staging: Use staging API keys

### 3. Rotate Keys Regularly
- Change API keys every 3-6 months
- Use different keys for different services
- Monitor API usage for suspicious activity

### 4. Restrict API Keys
- Restrict Google Maps API key to your domain
- Use IAM roles for AWS services
- Enable API key restrictions in all services

## 🔍 Troubleshooting

### Common Issues

#### 1. Environment Variables Not Loading
```bash
# Check if .env file exists
ls -la .env

# Verify file permissions
chmod 600 .env

# Check if dotenv is installed
npm install dotenv
```

#### 2. Database Connection Issues
```bash
# Test MongoDB connection
mongosh "mongodb://localhost:27017/fenix_construction"

# Test PostgreSQL connection
psql -h localhost -U fenix_user -d fenix_construction

# Check Firebase connection
# Use Firebase console to verify project settings
```

#### 3. API Key Issues
- Verify API keys are correct
- Check API quotas and billing
- Ensure API services are enabled
- Verify domain restrictions

## 📞 Support

If you encounter issues:

1. **Check the logs** for error messages
2. **Verify environment variables** are set correctly
3. **Test database connections** manually
4. **Check API service status** pages
5. **Review security settings** and permissions

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com/)
- [Google Maps API Guide](https://developers.google.com/maps/documentation)
- [SendGrid API Documentation](https://sendgrid.com/docs/api-reference/)
- [Twilio API Documentation](https://www.twilio.com/docs)

---

**Remember: Keep your environment variables secure and never share them publicly! 🔐** 