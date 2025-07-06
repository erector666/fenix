# 🗄️ Database Setup Guide - FENIX Construction Tracker

## 📋 Overview

This guide explains how to set up the database integration for the FENIX Construction Tracker using Prisma ORM. The app now uses a proper database instead of localStorage for persistent data storage.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

```bash
# Run the interactive setup
npm run setup-env

# Or manually copy and configure
cp env.example .env
```

### 3. Configure Database

Choose your database provider and update the `DATABASE_URL` in your `.env` file:

#### Option A: PostgreSQL (Recommended)
```env
DATABASE_URL=postgresql://username:password@localhost:5432/fenix_construction
```

#### Option B: MySQL
```env
DATABASE_URL=mysql://username:password@localhost:3306/fenix_construction
```

#### Option C: MongoDB
```env
DATABASE_URL=mongodb://localhost:27017/fenix_construction
```

#### Option D: SQLite (Development)
```env
DATABASE_URL=file:./dev.db
```

### 4. Set Up Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database with initial data
npm run db:seed
```

### 5. Start the Application

```bash
# Start both server and React app
npm run dev

# Or start separately
npm run server  # Backend API
npm start       # React frontend
```

## 🌐 Vercel Deployment with Database

### Step 1: Set Up PostgreSQL Database

**Option A: Vercel Postgres (Recommended)**
1. Go to your Vercel dashboard
2. Navigate to Storage → Create Database
3. Choose PostgreSQL
4. Select your region
5. Copy the connection string

**Option B: External PostgreSQL Providers**
- **Supabase** (Free tier available)
- **Neon** (Free tier available)
- **Railway** (Free tier available)
- **PlanetScale** (MySQL, free tier available)

### Step 2: Configure Environment Variables

In your Vercel dashboard, add these environment variables:

```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# App Configuration
NODE_ENV=production
PORT=3000

# Frontend API URL
REACT_APP_API_URL=https://your-vercel-app.vercel.app/api
```

### Step 3: Deploy to Vercel

```bash
# Deploy using the script
./deploy-vercel.ps1

# Or manually
vercel --prod
```

### Step 4: Set Up Database Schema

After deployment, run these commands:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to production database
npm run db:push

# Seed with initial data
npm run db:seed
```

## 🗄️ Database Providers

### PostgreSQL (Recommended)

**Pros:**
- Excellent performance
- ACID compliance
- Rich feature set
- Great for complex queries

**Setup:**
```bash
# Install PostgreSQL locally
# macOS: brew install postgresql
# Ubuntu: sudo apt-get install postgresql
# Windows: Download from postgresql.org

# Create database
createdb fenix_construction

# Or use Docker
docker run -d -p 5432:5432 --name postgres \
  -e POSTGRES_DB=fenix_construction \
  -e POSTGRES_USER=fenix_user \
  -e POSTGRES_PASSWORD=your_password \
  postgres:latest
```

### MySQL

**Pros:**
- Widely supported
- Good performance
- Easy to find hosting

**Setup:**
```bash
# Install MySQL locally
# macOS: brew install mysql
# Ubuntu: sudo apt-get install mysql-server
# Windows: Download from mysql.com

# Or use Docker
docker run -d -p 3306:3306 --name mysql \
  -e MYSQL_ROOT_PASSWORD=root_password \
  -e MYSQL_DATABASE=fenix_construction \
  -e MYSQL_USER=fenix_user \
  -e MYSQL_PASSWORD=your_password \
  mysql:latest
```

### MongoDB

**Pros:**
- Flexible schema
- Good for document-based data
- Easy scaling

**Setup:**
```bash
# Install MongoDB locally
# macOS: brew install mongodb-community
# Ubuntu: sudo apt-get install mongodb
# Windows: Download from mongodb.com

# Or use Docker
docker run -d -p 27017:27017 --name mongodb \
  mongo:latest
```

### SQLite (Development Only)

**Pros:**
- No setup required
- File-based
- Perfect for development

**Setup:**
```env
DATABASE_URL=file:./dev.db
```

## 🔧 Database Schema

The application uses the following main entities:

### Users
- **id**: Unique identifier
- **email**: User email (unique)
- **name**: User's full name
- **password**: Hashed password
- **role**: ADMIN, EMPLOYEE, MANAGER
- **isActive**: Account status

### Vehicles
- **id**: Unique identifier
- **name**: Vehicle name
- **plate**: License plate (unique)
- **type**: VAN, TRUCK, CAR, MOTORCYCLE, OTHER
- **isActive**: Vehicle status

### Work Sessions
- **id**: Unique identifier
- **userId**: Reference to user
- **vehicleId**: Reference to vehicle (optional)
- **startTime**: Session start time
- **endTime**: Session end time (optional)
- **startLocation**: JSON with latitude/longitude
- **endLocation**: JSON with latitude/longitude (optional)
- **workDescription**: Description of work
- **gasAmount**: Fuel amount used
- **status**: ACTIVE, PAUSED, COMPLETED, CANCELLED
- **totalHours**: Calculated work hours
- **breakDuration**: Total break time in minutes

### Breaks
- **id**: Unique identifier
- **workSessionId**: Reference to work session
- **startTime**: Break start time
- **endTime**: Break end time (optional)
- **duration**: Break duration in minutes
- **reason**: Reason for break

### Locations
- **id**: Unique identifier
- **userId**: Reference to user
- **workSessionId**: Reference to work session (optional)
- **latitude**: GPS latitude
- **longitude**: GPS longitude
- **accuracy**: GPS accuracy
- **timestamp**: Location timestamp
- **address**: Human-readable address
- **isActive**: Location status

## 🛠️ Database Commands

### Prisma Commands

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes to database
npm run db:push

# Create and run migrations
npm run db:migrate

# Open Prisma Studio (database GUI)
npm run db:studio

# Seed database with initial data
npm run db:seed
```

### Manual Database Operations

```bash
# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# View database in browser
npx prisma studio

# Generate migration from schema changes
npx prisma migrate dev --name add_new_field

# Deploy migrations to production
npx prisma migrate deploy
```

## 🔐 Security Considerations

### Password Hashing
- All passwords are hashed using bcrypt
- Salt rounds: 10
- Never store plain text passwords

### JWT Authentication
- Tokens expire after 24 hours
- Secure secret key required
- Admin-only endpoints protected

### Database Security
- Use strong passwords
- Restrict database access
- Enable SSL for production
- Regular backups

## 📊 Data Migration

### From localStorage to Database

The app automatically migrates from localStorage to database:

1. **First run**: Database is seeded with initial data
2. **Existing users**: Can log in with same credentials
3. **Work sessions**: Start fresh in database
4. **No data loss**: localStorage data preserved as backup

### Backup and Restore

```bash
# PostgreSQL backup
pg_dump fenix_construction > backup.sql

# PostgreSQL restore
psql fenix_construction < backup.sql

# MySQL backup
mysqldump fenix_construction > backup.sql

# MySQL restore
mysql fenix_construction < backup.sql

# MongoDB backup
mongodump --db fenix_construction

# MongoDB restore
mongorestore --db fenix_construction dump/fenix_construction
```

## 🔄 Real-time Updates

### Current Implementation
- REST API endpoints
- Polling for updates
- Manual refresh required

### Future Enhancements
- WebSocket connections
- Server-sent events
- Real-time notifications

## 🚀 Deployment

### Environment Variables for Production

```env
# Database
DATABASE_URL=your_production_database_url

# Security
JWT_SECRET=your_production_jwt_secret
JWT_REFRESH_SECRET=your_production_refresh_secret

# API
PORT=5000
NODE_ENV=production
```

### Database Hosting Options

#### PostgreSQL
- **Heroku Postgres**: Easy setup, good free tier
- **AWS RDS**: Scalable, enterprise-grade
- **DigitalOcean Managed Databases**: Simple, reliable
- **Supabase**: Open source, feature-rich

#### MySQL
- **PlanetScale**: Serverless, scalable
- **AWS RDS**: Managed MySQL service
- **Google Cloud SQL**: Fully managed
- **DigitalOcean Managed MySQL**: Simple setup

#### MongoDB
- **MongoDB Atlas**: Official cloud service
- **AWS DocumentDB**: MongoDB-compatible
- **Google Cloud Firestore**: Document database

## 🔍 Troubleshooting

### Common Issues

#### 1. Database Connection Failed
```bash
# Check if database is running
# PostgreSQL
pg_isready -h localhost -p 5432

# MySQL
mysql -h localhost -P 3306 -u root -p

# MongoDB
mongosh --host localhost --port 27017
```

#### 2. Prisma Client Not Generated
```bash
# Regenerate Prisma client
npm run db:generate

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 3. Migration Errors
```bash
# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Check migration status
npx prisma migrate status
```

#### 4. Authentication Issues
```bash
# Check JWT secret in .env
echo $JWT_SECRET

# Verify token format
# Should be: Bearer <token>
```

### Performance Optimization

#### Database Indexes
- Automatically created by Prisma
- Optimized for common queries
- Monitor query performance

#### Connection Pooling
- Prisma handles connection pooling
- Configure pool size for production
- Monitor connection usage

## 📈 Monitoring

### Database Metrics
- Connection count
- Query performance
- Storage usage
- Error rates

### Application Metrics
- API response times
- Error rates
- User activity
- Work session statistics

## 🔄 Backup Strategy

### Automated Backups
```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump fenix_construction > backup_$DATE.sql
aws s3 cp backup_$DATE.sql s3://your-backup-bucket/
```

### Recovery Testing
- Test backup restoration monthly
- Verify data integrity
- Document recovery procedures

## 📞 Support

### Getting Help
1. Check the logs for error messages
2. Verify database connection
3. Test API endpoints
4. Review environment variables

### Useful Commands
```bash
# Check API health
curl http://localhost:5000/api/health

# Test database connection
npx prisma studio

# View logs
tail -f logs/app.log
```

---

**Happy Database Management! 🗄️** 