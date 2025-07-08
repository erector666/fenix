# 🏗️ FENIX Construction Tracker

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/erector666/fenix.git)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)

> Professional employee tracking and management system for construction companies

## 🚀 Live Demo

**Deploy your own instance:** [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/erector666/fenix.git)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [Mobile App](#-mobile-app)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🎯 Core Functionality
- **Employee GPS Tracking** - Real-time location monitoring
- **Work Session Management** - Start/stop work sessions with timestamps
- **Vehicle Tracking** - Kilometer logging and vehicle management
- **Photo Documentation** - Capture work progress photos
- **Break Management** - Track breaks during work sessions
- **Multi-language Support** - English, Macedonian, Albanian, German, Spanish

### 👥 User Management
- **Role-based Access** - Admin and Employee roles
- **Secure Authentication** - JWT-based login system
- **User Profiles** - Personal information and settings
- **Activity History** - Complete work session logs

### 📊 Admin Dashboard
- **Real-time Monitoring** - Live employee locations and status
- **Work Reports** - Detailed session analytics and exports
- **Employee Management** - Add, edit, and manage team members
- **Vehicle Management** - Track and manage company vehicles
- **Data Export** - CSV/Excel report generation

### 📱 Mobile Features
- **Offline Support** - Works without internet connection
- **GPS Integration** - Accurate location tracking
- **Camera Integration** - Photo capture for documentation
- **Push Notifications** - Real-time alerts and updates
- **Responsive Design** - Works on all device sizes

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Google Maps API** - Location and mapping features

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **Prisma ORM** - Database toolkit
- **PostgreSQL** - Primary database (via Supabase)
- **Supabase** - Backend-as-a-Service platform
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

### Deployment
- **Vercel** - Serverless deployment platform
- **Supabase** - Database, Auth, Storage, and Real-time
- **Capacitor** - Mobile app framework

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm 8+
- Supabase account (free tier available)
- Git

### Option 1: Supabase Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/erector666/fenix.git
   cd fenix
   ```

2. **Run automated setup**
   ```bash
   # Windows
   quick-supabase-setup.bat
   
   # PowerShell
   .\quick-supabase-setup.ps1
   
   # Manual setup
   npm run setup-supabase
   ```

3. **Update environment variables**
   ```bash
   # Edit .env with your Supabase credentials
   DATABASE_URL="postgresql://postgres:@rUXdQLZKkmIEtKIM@ofahxcdnwdmucrvipfbu.supabase.co:5432/postgres"
   SUPABASE_URL="https://ofahxcdnwdmucrvipfbu.supabase.co"
   SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mYWh4Y2Rud2RtdWNydmlwZmJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MTYwNjIsImV4cCI6MjA2NzM5MjA2Mn0.nqwmer6wYir9RmPBpbQsx22B9RdNRGvL_4-U2-STw4Q"
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

### Option 2: Manual Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/erector666/fenix.git
   cd fenix
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your database connection string and JWT secret
   ```

4. **Set up database**
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

### Test Credentials
- **Admin:** `kango@fenix.com` / `admin123`
- **Employee:** `petre@fenix.com` / `admin123`

## 🚀 Deployment

### Supabase + Vercel Deployment (Recommended)

1. **Set up Supabase**
   - Follow the [Supabase Setup Guide](./SUPABASE_DEPLOYMENT.md)
   - Your Supabase project is already configured with the provided credentials

2. **Deploy to Vercel**
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/erector666/fenix.git)

3. **Set Environment Variables in Vercel**
   ```env
   DATABASE_URL="postgresql://postgres:@rUXdQLZKkmIEtKIM@ofahxcdnwdmucrvipfbu.supabase.co:5432/postgres"
   SUPABASE_URL="https://ofahxcdnwdmucrvipfbu.supabase.co"
   SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mYWh4Y2Rud2RtdWNydmlwZmJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MTYwNjIsImV4cCI6MjA2NzM5MjA2Mn0.nqwmer6wYir9RmPBpbQsx22B9RdNRGvL_4-U2-STw4Q"
   SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
   JWT_SECRET="your-super-secret-jwt-key"
   NODE_ENV="production"
   ```

4. **Deploy!** Your app will be live in minutes.

### Alternative Deployments

- **Vercel + Neon**: See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
- **Netlify + Neon**: See [NETLIFY_NEON_DEPLOYMENT.md](./NETLIFY_NEON_DEPLOYMENT.md)
- **Manual Setup**: See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/login`
Login with email and password
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### POST `/api/auth/register`
Register new user (Admin only)
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "employee"
}
```

### Work Session Endpoints

#### POST `/api/sessions/start`
Start a new work session
```json
{
  "location": {
    "latitude": 41.9981,
    "longitude": 21.4254
  },
  "vehicleId": "vehicle-id"
}
```

#### POST `/api/sessions/end`
End current work session
```json
{
  "location": {
    "latitude": 41.9981,
    "longitude": 21.4254
  },
  "kilometers": 25.5
}
```

#### GET `/api/sessions`
Get work session history

### Employee Endpoints

#### GET `/api/employees`
Get all employees (Admin only)

#### GET `/api/employees/locations`
Get real-time employee locations (Admin only)

### Vehicle Endpoints

#### GET `/api/vehicles`
Get all vehicles

#### POST `/api/vehicles`
Add new vehicle (Admin only)

## 📱 Mobile App

### Android App Build

```bash
# Build for Android
npm run build:android

# Build release APK
npm run build:android:release

# Open in Android Studio
npx cap open android
```

### Capacitor Configuration

The app is configured for Android deployment using Capacitor. See the `android/` directory for native configurations.

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `NODE_ENV` | Environment (production/development) | Yes |
| `CORS_ORIGIN` | Allowed CORS origins | No |
| `REACT_APP_GOOGLE_MAPS_API_KEY` | Google Maps API key | No |

### Database Schema

The app uses Prisma with the following main models:
- **User** - Employee and admin accounts
- **WorkSession** - Work session records
- **Vehicle** - Company vehicles
- **Location** - GPS coordinates
- **Photo** - Work documentation photos

## 🛠️ Development

### Available Scripts

```bash
# Development
npm start              # Start development server
npm run dev            # Start both frontend and backend
npm run server         # Start backend only

# Building
npm run build          # Build for production
npm run vercel-build   # Build for Vercel deployment

# Database
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema to database
npm run db:seed        # Seed with initial data
npm run db:studio      # Open Prisma Studio

# Testing
npm test               # Run tests
npm run lint           # Lint code
npm run lint:fix       # Fix linting issues

# Mobile
npm run build:android  # Build for Android
npm run build:android:release  # Build release APK
```

### Project Structure

```
fenix/
├── server/                 # Backend API
│   ├── index.js           # Express server
│   ├── seed.js            # Database seeding
│   └── migrate-kilometers.js
├── src/                   # Frontend React app
│   ├── App.js            # Main application
│   ├── index.js          # Entry point
│   ├── index.css         # Global styles
│   └── services/
│       └── api.js        # API client
├── prisma/               # Database schema
│   └── schema.prisma
├── android/              # Android app
├── public/               # Static assets
├── vercel.json          # Vercel configuration
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help

1. Check the [Deployment Guide](./DEPLOYMENT_GUIDE.md)
2. Review the [API Documentation](#-api-documentation)
3. Check existing [Issues](https://github.com/erector666/fenix/issues)
4. Create a new issue with detailed information

### Common Issues

- **Build Errors**: Check Node.js version (18+) and dependencies
- **Database Issues**: Verify connection string and database accessibility
- **CORS Errors**: Check CORS configuration and frontend URL
- **Authentication Issues**: Verify JWT secret and token expiration

## 🎉 Acknowledgments

- Built with React and Node.js
- Deployed on Vercel
- Database powered by PostgreSQL
- Icons by Lucide React
- Styling with Tailwind CSS

---

**Made with ❤️ by FENIX Construction**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/erector666/fenix.git) 