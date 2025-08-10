@echo off
echo Simple installation for Breeze monorepo...
echo.

echo [1/4] Installing root dependencies...
npm install --prefer-offline --no-audit --ignore-scripts

echo.
echo [2/4] Installing UI package dependencies...
cd packages\ui
npm install --prefer-offline --no-audit --ignore-scripts

echo.
echo [3/4] Installing car wash app dependencies...
cd ..\..\apps\car-wash-app
npm install --prefer-offline --no-audit --ignore-scripts

echo.
echo [4/4] Installing restaurant app dependencies...
cd ..\restaurant-app
npm install --prefer-offline --no-audit --ignore-scripts

cd ..\..
echo.
echo Installation complete!
echo.
echo To start the apps:
echo   start-car-wash.bat       - Start Car Wash Service (Port 3001)
echo   start-restaurant.bat     - Start Restaurant Service (Port 3002)
echo.
echo Or use npm scripts:
echo   npm run dev:car-wash     - Start Car Wash Service
echo   npm run dev:restaurant   - Start Restaurant Service