@echo off
start "Laravel Server" "c:\wamp64\bin\php\php8.3.14\php.exe" artisan serve
start "Vite" npm run dev
