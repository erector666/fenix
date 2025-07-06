# 🚀 Deployment Guide

This guide covers deploying the FENIX Construction Tracker to various platforms.

## 📋 Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] Database set up and migrated
- [ ] Google Maps API key configured
- [ ] SSL certificates ready (for production)
- [ ] Domain name configured
- [ ] Backup strategy in place

## 🌐 Web Deployment

### Option 1: Netlify (Recommended)

1. **Connect to GitLab**
   ```bash
   # Push to GitLab first
   git push origin main
   ```

2. **Deploy on Netlify**
   - Go to [Netlify](https://netlify.com)
   - Connect your GitLab repository
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Add environment variables in Netlify dashboard

3. **Environment Variables for Netlify**
   ```env
   REACT_APP_API_URL=https://your-backend-url.com
   REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-key
   ```

### Option 2: Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

### Option 3: Traditional Hosting

1. **Build the app**
   ```bash
   npm run build:prod
   ```

2. **Upload to server**
   - Upload `build/` folder to your web server
   - Configure nginx/Apache to serve static files
   - Set up SSL certificate

## 📱 Android App Deployment

### Google Play Store

1. **Build release APK**
   ```bash
   npm run build:android:release
   ```

2. **Sign the APK**
   ```bash
   # Generate keystore (first time only)
   keytool -genkey -v -keystore fenix-release-key.keystore -alias fenix-key-alias -keyalg RSA -keysize 2048 -validity 10000
   
   # Sign APK
   jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore fenix-release-key.keystore app-release-unsigned.apk fenix-key-alias
   ```

3. **Upload to Google Play Console**
   - Create developer account
   - Create new app
   - Upload signed APK
   - Fill app details and screenshots
   - Submit for review

### Direct APK Distribution

1. **Build APK**
   ```bash
   npm run build:android:release
   ```

2. **Distribute**
   - Share APK file directly
   - Use services like Firebase App Distribution
   - Upload to company intranet

## 🖥️ Backend Deployment

### Option 1: Heroku

1. **Create Heroku app**
   ```bash
   heroku create fenix-backend
   ```

2. **Add PostgreSQL**
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

4. **Run migrations**
   ```bash
   heroku run npm run db:push
   heroku run npm run db:seed
   ```

### Option 2: DigitalOcean

1. **Create Droplet**
   - Ubuntu 20.04 LTS
   - 2GB RAM minimum
   - Install Node.js, PostgreSQL, nginx

2. **Deploy application**
   ```bash
   # Clone repository
   git clone https://github.com/erector666/fenix.git
   cd fenix
   
   # Install dependencies
   npm install
   
   # Set up environment
   cp env.example .env
   # Edit .env with production values
   
   # Set up database
   npm run db:push
   npm run db:seed
   
   # Start with PM2
   npm install -g pm2
   pm2 start server/index.js --name fenix-backend
   pm2 startup
   ```

3. **Configure nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Option 3: AWS

1. **EC2 Instance**
   - Launch Ubuntu instance
   - Configure security groups
   - Install dependencies

2. **RDS Database**
   - Create PostgreSQL RDS instance
   - Configure security groups
   - Update DATABASE_URL

3. **Deploy with CodeDeploy**
   - Set up CodeDeploy application
   - Configure deployment scripts
   - Automate deployments

## 🔧 Production Configuration

### Environment Variables
```env
# Production settings
NODE_ENV=production
PORT=3001

# Database
DATABASE_URL=postgresql://user:password@host:5432/fenix

# Security
JWT_SECRET=your-super-secure-jwt-secret
JWT_EXPIRES_IN=24h

# Google Maps
GOOGLE_MAPS_API_KEY=your-production-google-maps-key

# CORS
CORS_ORIGIN=https://your-frontend-domain.com

# Logging
LOG_LEVEL=info
```

### Security Checklist

- [ ] HTTPS enabled
- [ ] JWT secret is strong and unique
- [ ] CORS properly configured
- [ ] Database credentials secured
- [ ] API rate limiting enabled
- [ ] Input validation implemented
- [ ] Error handling configured
- [ ] Logging set up

### Performance Optimization

- [ ] Database indexes created
- [ ] API response caching
- [ ] Static assets optimized
- [ ] CDN configured
- [ ] Database connection pooling
- [ ] Background job processing

## 📊 Monitoring & Maintenance

### Health Checks
```bash
# API health check
curl https://your-api.com/api/health

# Database connection
npm run db:studio
```

### Backup Strategy
```bash
# Database backup
pg_dump fenix > backup-$(date +%Y%m%d).sql

# Automated backups (cron job)
0 2 * * * pg_dump fenix > /backups/fenix-$(date +\%Y\%m\%d).sql
```

### Log Monitoring
- Set up log aggregation (ELK stack, Papertrail)
- Configure error alerting
- Monitor performance metrics

## 🚨 Troubleshooting

### Common Issues

1. **Build fails**
   ```bash
   npm run clean
   npm install
   npm run build
   ```

2. **Database connection issues**
   ```bash
   npm run db:generate
   npm run db:push
   ```

3. **Android build fails**
   ```bash
   npx cap clean android
   npx cap sync android
   ```

4. **API not responding**
   - Check server logs
   - Verify environment variables
   - Test database connection

### Support

For deployment issues:
- Check logs: `pm2 logs` or `heroku logs`
- Verify environment variables
- Test database connectivity
- Check network configuration

---

**Ready for production! 🚀** 