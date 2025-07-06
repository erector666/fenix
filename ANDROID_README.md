# 📱 FENIX Construction Tracker - Android App

## 🚀 Quick Start

### Prerequisites
- **Android Studio** (latest version)
- **Java JDK 11** or higher
- **Android SDK** (API level 21+)
- **Node.js** and **npm**

### Build Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build for Android:**
   ```bash
   # Option 1: Use the batch script (Windows)
   build-android.bat
   
   # Option 2: Manual steps
   npm run build
   npx cap sync android
   npx cap open android
   ```

3. **In Android Studio:**
   - Wait for Gradle sync to complete
   - Connect Android device or start emulator
   - Click **Run** (green play button)

## 📋 Android Features

### ✅ Working Features
- **Location tracking** (GPS)
- **Camera access** (if needed later)
- **Device information**
- **Offline capability**
- **Responsive design**

### 🔧 Android Permissions
The app automatically requests:
- **Location** (for worker tracking)
- **Camera** (for future photo features)
- **Internet** (for Google Maps)

## 🏗️ Customization

### App Icon
Replace: `android/app/src/main/res/mipmap-*`

### App Name
Edit: `android/app/src/main/res/values/strings.xml`

### Package Name
Edit: `android/app/build.gradle` (applicationId)

### Version
Edit: `android/app/build.gradle` (versionCode, versionName)

## 📦 Building APK

### Debug APK
1. **Android Studio** → Build → Build Bundle(s) / APK(s) → Build APK(s)
2. **Location:** `android/app/build/outputs/apk/debug/app-debug.apk`

### Release APK
1. **Generate keystore** (if first time)
2. **Configure signing** in `android/app/build.gradle`
3. **Build** → Build Bundle(s) / APK(s) → Build APK(s)

## 🚀 Publishing to Google Play

1. **Create Google Play Console** account
2. **Upload APK** or Android App Bundle
3. **Fill app details** (description, screenshots, etc.)
4. **Submit for review**

## 🔄 Development Workflow

```bash
# 1. Make changes to React code
# 2. Build and sync
npm run build
npx cap sync android

# 3. Test on device/emulator
npx cap run android

# 4. Repeat
```

## 📱 Testing

### Physical Device
1. **Enable Developer Options** on Android device
2. **Enable USB Debugging**
3. **Connect via USB**
4. **Run from Android Studio**

### Emulator
1. **Create AVD** in Android Studio
2. **Start emulator**
3. **Run app**

## 🛠️ Troubleshooting

### Common Issues
- **Gradle sync fails** → Check internet connection
- **Build fails** → Clean project (Build → Clean Project)
- **App crashes** → Check logcat in Android Studio
- **Location not working** → Grant permissions manually

### Useful Commands
```bash
# Clean and rebuild
npx cap clean android
npx cap sync android

# Update Capacitor
npm update @capacitor/core @capacitor/cli @capacitor/android

# Check Android setup
npx cap doctor android
```

## 📞 Support

For issues:
1. Check Android Studio logcat
2. Verify permissions are granted
3. Test on different devices
4. Check Capacitor documentation

---

**Happy Building! 🚀** 