Write-Host "🚀 FENIX Construction Tracker - Vercel Deployment" -ForegroundColor Green
Write-Host ""

Write-Host "📦 Building the project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Please check the errors above." -ForegroundColor Red
    Read-Host "Press Enter to continue"
    exit 1
}

Write-Host "✅ Build completed successfully!" -ForegroundColor Green
Write-Host ""

Write-Host "🌐 Deploying to Vercel..." -ForegroundColor Yellow
vercel --prod

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Deployment failed! Please check the errors above." -ForegroundColor Red
    Read-Host "Press Enter to continue"
    exit 1
}

Write-Host ""
Write-Host "🎉 Deployment completed successfully!" -ForegroundColor Green
Write-Host "📱 Your app is now live on Vercel!" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to continue" 