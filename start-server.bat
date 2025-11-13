@echo off
echo ========================================
echo   New Year Timer 2026 - Local Server
echo ========================================
echo.
echo Starting local server on http://localhost:8000
echo.
echo Once the server starts, open your browser and go to:
echo   http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.
echo ========================================
echo.

python -m http.server 8000
