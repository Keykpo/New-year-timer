#!/bin/bash
echo "========================================"
echo "  New Year Timer 2026 - Local Server"
echo "========================================"
echo ""
echo "Starting local server on http://localhost:8000"
echo ""
echo "Once the server starts, open your browser and go to:"
echo "  http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""
echo "========================================"
echo ""

# Try Python 3 first, then Python 2
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    python -m http.server 8000
else
    echo "ERROR: Python is not installed!"
    echo "Please install Python from https://www.python.org/"
    read -p "Press Enter to exit..."
fi
