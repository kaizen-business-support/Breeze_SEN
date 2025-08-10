@echo off
echo Installing Breeze monorepo dependencies...

echo Installing root dependencies...
npm install --prefer-offline --no-audit

echo Installing package dependencies...
cd packages\ui
npm install --prefer-offline --no-audit
cd ..\types
npm install --prefer-offline --no-audit
cd ..\config
npm install --prefer-offline --no-audit

echo Installing app dependencies...
cd ..\..\apps\car-wash-app
npm install --prefer-offline --no-audit
cd ..\restaurant-app
npm install --prefer-offline --no-audit

cd ..\..
echo Installation complete!
echo.
echo To start development:
echo   npm run dev           - Start all apps
echo   npm run car-wash      - Start car wash app only
echo   npm run restaurant    - Start restaurant app only