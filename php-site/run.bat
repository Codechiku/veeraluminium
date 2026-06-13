@echo off
REM ============================================================
REM  Veer Aluminium & Fabrication - PHP site launcher
REM  Starts PHP's built-in web server and opens the site.
REM ============================================================

setlocal
cd /d "%~dp0"

REM --- Find PHP (PATH first, then common XAMPP/WAMP locations) ---
set "PHP=php"
where php >nul 2>nul
if errorlevel 1 (
    if exist "C:\xampp\php\php.exe" set "PHP=C:\xampp\php\php.exe"
    if exist "C:\wamp64\bin\php\php8\php.exe" set "PHP=C:\wamp64\bin\php\php8\php.exe"
    if exist "C:\php\php.exe" set "PHP=C:\php\php.exe"
)

"%PHP%" -v >nul 2>nul
if errorlevel 1 (
    echo  [ERROR] PHP was not found.
    echo  Install PHP or XAMPP, or edit this file to point PHP at php.exe.
    pause
    exit /b 1
)

echo.
echo  ============================================
echo   Veer Aluminium - PHP site
echo  ============================================
echo   URL:    http://localhost:8000
echo   Admin:  http://localhost:8000/admin/login.php
echo           email: admin@veeraluminium.com
echo           pass:  admin123
echo.
echo   Press Ctrl+C to stop.
echo  ============================================
echo.

start "" http://localhost:8000
"%PHP%" -S localhost:8000 -t "%~dp0"

pause
endlocal
