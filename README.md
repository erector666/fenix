# 🏗️ FENIX Construction Tracker

A comprehensive construction management application for tracking worker activities, vehicles, machines, and worksites.

## 🚀 Features

- **Worker Management**: Track employee work sessions, breaks, and activities
- **Vehicle Tracking**: Monitor vehicle usage and kilometers
- **Machine Management**: Track equipment usage and maintenance
- **Worksite Management**: Manage multiple construction sites
- **Photo Capture**: Workers can take photos of their work
- **Document Management**: Store and access project documents
- **Multi-language Support**: English, Macedonian, Albanian, German, Spanish
- **Real-time Location Tracking**: GPS-based location monitoring
- **Admin Dashboard**: Comprehensive reporting and management tools

## 🛠️ Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Mobile**: Capacitor for Android app
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📱 Mobile App

This project includes a mobile app built with Capacitor for Android devices.

### Android Features
- Location tracking (GPS)
- Camera access for photo capture
- Offline capability
- Responsive design

## 🌐 Deployment

### Vercel Deployment

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel
   ```

3. **Environment Variables**:
   Set the following in your Vercel dashboard:
   - `REACT_APP_API_URL`: Your API endpoint

### Manual Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy the `build` folder** to your hosting provider

## 🔧 Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/erector666/fenix.git
   cd fenix
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm start
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

### Android Development

1. **Install Capacitor**:
   ```bash
   npm install @capacitor/core @capacitor/cli
   npx cap init
   ```

2. **Add Android platform**:
   ```bash
   npm install @capacitor/android
   npx cap add android
   ```

3. **Sync and open**:
   ```bash
   npx cap sync android
   npx cap open android
   ```

## 📋 Usage

### Worker Login
- **Email**: `petre@fenix.com` / `ilija@fenix.com` / etc.
- **Password**: `admin123`

### Admin Login
- **Email**: `kango@fenix.com`
- **Password**: `admin123`

### Features

#### Worker Dashboard
- Start/End work sessions
- Take breaks
- Capture work photos
- View project documents
- Track vehicle kilometers

#### Admin Dashboard
- Monitor all workers
- View work history
- Manage materials
- Access work photos
- Manage project documents
- Generate reports

## 🌍 Multi-language Support

The app supports 5 languages:
- 🇺🇸 English
- 🇲🇰 Macedonian
- 🇦🇱 Albanian
- 🇩🇪 German
- 🇪🇸 Spanish

## 📁 Project Structure

```
FENIX-CONS-APP/
├── src/
│   ├── App.js              # Main application component
│   ├── services/
│   │   └── api.js          # API service layer
│   └── ...
├── public/
│   ├── index.html
│   └── assets/
├── android/                # Android app files
├── vercel.json            # Vercel configuration
├── package.json
└── README.md
```

## 🔒 Security

- Environment variables for sensitive data
- Input validation
- Secure authentication
- HTTPS enforcement

## 📞 Support

For issues or questions:
1. Check the console for error messages
2. Verify environment variables are set
3. Ensure all dependencies are installed
4. Check browser compatibility

## 📄 License

This project is proprietary software for FENIX Construction.

---

**Built with ❤️ for FENIX Construction** 