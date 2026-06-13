@echo off
REM ============================================================
REM  Veer Aluminium & Fabrication - dev launcher
REM  Double-click this file to start the website locally.
REM ============================================================

setlocal
cd /d "%~dp0"

echo.
echo  ============================================
echo   Veer Aluminium ^& Fabrication - starting...
echo  ============================================
echo.

REM --- Check Node.js is installed ---
where node >nul 2>nul
if errorlevel 1 (
    echo  [ERROR] Node.js is not installed or not on PATH.
    echo  Download it from https://nodejs.org/ and try again.
    echo.
    pause
    exit /b 1
)

REM --- Install dependencies if missing ---
if not exist "node_modules" (
    echo  Installing dependencies ^(first run^)...
    call npm install
    if errorlevel 1 (
        echo  [ERROR] npm install failed.
        pause
        exit /b 1
    )
)

REM --- Generate Prisma client ---
echo  Generating Prisma client...
call npx prisma generate
if errorlevel 1 (
    echo  [WARN] Prisma generate failed - continuing anyway.
)

REM --- Start the dev server ---
echo.
echo  Starting dev server at http://localhost:3000
echo  Press Ctrl+C to stop.
echo.
start "" http://localhost:3000
call npm run dev

pause
endlocal
