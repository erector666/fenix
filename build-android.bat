@echo off
echo Building FENIX Construction Tracker for Android...
echo.

echo Step 1: Building React app...
npm run build
if %errorlevel% neq 0 (
    echo Build failed!
    pause
    exit /b 1
)

echo.
echo Step 2: Syncing with Android...
npx cap sync android
if %errorlevel% neq 0 (
    echo Sync failed!
    pause
    exit /b 1
)

echo.
echo Step 3: Opening Android Studio...
npx cap open android

echo.
echo Android project ready! 
echo Open android/app/build.gradle to customize app settings
echo Build APK in Android Studio: Build > Build Bundle(s) / APK(s) > Build APK(s)
pause 