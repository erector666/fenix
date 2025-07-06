@echo off
echo 🚀 FENIX Construction Tracker - Vercel Deployment
echo.

echo 📦 Building the project...
npm run build

if %errorlevel% neq 0 (
    echo ❌ Build failed! Please check the errors above.
    pause
    exit /b 1
)

echo ✅ Build completed successfully!
echo.

echo 🌐 Deploying to Vercel...
vercel --prod

if %errorlevel% neq 0 (
    echo ❌ Deployment failed! Please check the errors above.
    pause
    exit /b 1
)

echo.
echo 🎉 Deployment completed successfully!
echo 📱 Your app is now live on Vercel!
echo.
pause 