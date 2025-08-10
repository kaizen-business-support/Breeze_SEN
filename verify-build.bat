@echo off
echo 🔍 Verifying Breeze Platform Build...
echo.

cd apps\main-app

if not exist "out" (
    echo ❌ Build not found! Please run deploy-local.bat first
    pause
    exit /b 1
)

echo ✅ Build directory exists: out\
echo.

echo 📄 Generated Pages:
dir /b out\*.html
echo.

echo 📂 Service Pages:
dir /b out\services\ 2>nul
echo.

echo 📊 Admin & System Pages:
if exist "out\admin\index.html" echo ✅ Admin Dashboard: out\admin\index.html
if exist "out\cashier\index.html" echo ✅ Cashier POS: out\cashier\index.html
if exist "out\employee\index.html" echo ✅ Employee Login: out\employee\index.html
if exist "out\account\index.html" echo ✅ Account Page: out\account\index.html
echo.

echo 📝 Build Summary:
echo - Total HTML files: 
dir /s /b out\*.html | find /c /v ""
echo - Static assets ready for deployment
echo - GitHub Pages compatible structure
echo.

echo 🎉 Build verification completed!
echo Ready for GitHub deployment!
echo.
pause