$env:GIT_CURL_VERBOSE=1; git push origin master
# 🏗️ FENIX Construction Tracker

A professional employee tracking and management system designed specifically for construction companies. Track worker locations, manage work sessions, monitor vehicle usage, and generate comprehensive reports.

![FENIX Logo](public/fenix.png)

## ✨ Features

### 🎯 Core Functionality
- **Real-time GPS Tracking** - Monitor worker locations in real-time
- **Work Session Management** - Start, pause, and end work sessions with detailed tracking
- **Vehicle Management** - Track vehicle usage and kilometers
- **Break Management** - Monitor break times and durations
- **Screenshot Capture** - Document work progress with location-tagged screenshots

### 👥 User Roles
- **Admin Dashboard** - Comprehensive overview with analytics and reporting
- **Employee Interface** - Simple, intuitive work tracking interface
- **Role-based Access** - Secure authentication and authorization

### 📊 Analytics & Reporting
- **Daily/Monthly Reports** - Track hours worked and productivity
- **Location History** - Complete GPS trail for each work session
- **Vehicle Analytics** - Monitor vehicle usage and distance traveled
- **Real-time Maps** - Visual representation of worker locations

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- PostgreSQL database
- Google Maps API key

### Installation

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
   npm run setup-env
   ```
   Or copy `env.example` to `.env` and configure manually.

4. **Set up database**
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 📱 Mobile App (Android)

### Build Android APK
```bash
# Development build
npm run build:android

# Release build
npm run build:android:release
```

### Android Features
- Native GPS tracking
- Offline capability
- Push notifications
- Camera integration
- Background location updates

## 🏗️ Architecture

### Frontend
- **React 18** - Modern UI framework
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **Google Maps API** - Location visualization

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **Prisma ORM** - Database management
- **JWT** - Authentication
- **PostgreSQL** - Database

### Mobile
- **Capacitor** - Cross-platform mobile framework
- **Android SDK** - Native Android features

## 📊 Database Schema

### Core Models
- **Users** - Employee and admin accounts
- **WorkSessions** - Work tracking sessions
- **Vehicles** - Company vehicle management
- **Locations** - GPS coordinate tracking
- **Breaks** - Break time management

## 🔧 Configuration

### Environment Variables
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/fenix"

# Authentication
JWT_SECRET="your-secret-key"

# Google Maps
GOOGLE_MAPS_API_KEY="your-google-maps-key"

# Server
PORT=3001
NODE_ENV=production
```

### API Endpoints
- `POST /api/auth/login` - User authentication
- `POST /api/work-sessions/start` - Start work session
- `PUT /api/work-sessions/:id/end` - End work session
- `GET /api/admin/work-sessions` - Admin work session data
- `POST /api/location` - Update location

## 🚀 Deployment

### Web Deployment
```bash
npm run deploy:web
```

### Android Deployment
```bash
npm run deploy:android
```

### Production Build
```bash
npm run build:prod
```

## 📈 Monitoring & Analytics

### Built-in Analytics
- Real-time worker locations
- Work session duration tracking
- Vehicle usage statistics
- Break time analysis
- Productivity metrics

### Custom Reports
- Daily work summaries
- Monthly productivity reports
- Vehicle usage reports
- Location-based analytics

## 🔒 Security

- **JWT Authentication** - Secure token-based auth
- **Role-based Access** - Admin/Employee permissions
- **Data Encryption** - Sensitive data protection
- **Input Validation** - XSS and injection prevention

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Email: support@fenix.com
- Documentation: [Wiki](https://github.com/erector666/fenix/wiki)
- Issues: [GitHub Issues](https://github.com/erector666/fenix/issues)

## 🏆 About FENIX

FENIX Construction is a leading construction company dedicated to building better tomorrows. This tracking system was developed to improve efficiency, safety, and project management in the construction industry.

---

**Built with ❤️ by FENIX Construction Team** 

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "vercel-build": "npm run build",
    "postinstall": "prisma generate",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "setup-env": "node setup-env.js",
    "setup": "node setup-env.js",
    "server": "node server/index.js",
    "dev": "concurrently \"npm run server\" \"npm start\"",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio",
    "db:seed": "node server/seed.js",
    "db:migrate-km": "node server/migrate-kilometers.js",
    "build:prod": "npm run build",
    "build:android": "npm run build && npx cap sync android",
    "build:android:release": "npm run build && npx cap sync android && cd android && ./gradlew assembleRelease",
    "deploy:web": "npm run build:prod",
    "deploy:android": "npm run build:android",
    "publish:prepare": "npm run build:prod && npm run test",
    "clean": "rm -rf build node_modules package-lock.json && npm install",
    "build:production": "node scripts/build-production.js"
  }
}
``` 