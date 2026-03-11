@echo off
echo ==========================================
echo   BCS - PROFESSIONAL BUILD SCRIPT
echo ==========================================

echo [1/4] Installing PHP dependencies...
composer install --no-interaction --optimize-autoloader

echo.
echo [2/4] Installing NPM dependencies...
call npm install

echo.
echo [3/4] Compiling assets (Vite)...
call npm run build

echo.
echo [4/4] Clearing Laravel caches...
php artisan optimize:clear

echo.
echo ==========================================
echo   BUILD COMPLETED SUCCESSFULLY!
echo ==========================================
pause
