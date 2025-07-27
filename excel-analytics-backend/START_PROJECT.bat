@echo off
echo ========================================
echo    Excel Analytics Project Starter
echo ========================================
echo.
echo This will start both backend and frontend servers
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Login Credentials:
echo User:  test@example.com / test123
echo Admin: admin@example.com / admin123
echo.
echo ========================================
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd excel-analytics-backend && npm start"

echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak > nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd excel-analytics-frontend && npm start"

echo.
echo ========================================
echo    Servers are starting...
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Opening frontend in browser...
timeout /t 3 /nobreak > nul
start http://localhost:3000
echo.
echo Press any key to close this window...
pause > nul 