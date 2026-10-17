@echo off
title NeuroMLCR
echo Starting NeuroMLCR — AI + ML brain + AI Coach dashboard...
start "NeuroMLCR-Dashboard" /min python -u dashboard.py
timeout /t 2 /nobreak >nul
start http://127.0.0.1:8765
echo.
echo Dashboard open at http://127.0.0.1:8765  (Ctrl+C here to stop the brain)
echo.
python -u bot_ml.py
pause
