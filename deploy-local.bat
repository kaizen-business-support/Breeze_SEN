@echo off
echo 🌊 Building Breeze Platform for Deployment...
echo.

cd apps\main-app

echo 📦 Installing dependencies...
call npm install

echo 🏗️ Building production bundle...
call npm run build

echo ✅ Build completed successfully!
echo.
echo 📂 Static files are ready in: apps\main-app\out\
echo.
echo 🚀 Next Steps:
echo 1. Push code to GitHub repository
echo 2. Enable GitHub Pages in repository settings
echo 3. GitHub Actions will automatically deploy from 'gh-pages' branch
echo.
echo 🌐 Your app will be available at: https://YOURUSERNAME.github.io/breeze-platform
echo.
pause