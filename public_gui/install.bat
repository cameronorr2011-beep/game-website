@echo off
title NeuroMLCR Setup
echo ============================================
echo   NeuroMLCR — AI + ML Clash Royale Player
echo ============================================
echo.

:: 1. Check for Python
python --version >nul 2>&1
if errorlevel 1 (
    echo [X] Python not found. Downloading Python 3.12 installer...
    echo     Please install it (check "Add Python to PATH") and rerun this file.
    start "" https://www.python.org/downloads/windows/
    pause
    exit /b 1
)
echo [OK] Python found.

:: 2. Install dependencies
echo [..] Installing Python frameworks (PyTorch CPU + Pillow + requests)...
python -m pip install --quiet pillow requests
python -m pip install --quiet torch torchvision --index-url https://download.pytorch.org/whl/cpu
if errorlevel 1 (
    echo [X] pip install failed. Check your internet connection.
    pause
    exit /b 1
)
echo [OK] Frameworks installed.

:: 3. Check for ADB
where adb >nul 2>&1
if errorlevel 1 (
    echo [.] adb not on PATH. Downloading platform-tools...
    if not exist platform-tools (
        powershell -Command "Invoke-WebRequest -Uri 'https://dl.google.com/android/repository/platform-tools-latest-windows.zip' -OutFile 'platform-tools.zip'"
        powershell -Command "Expand-Archive -Path 'platform-tools.zip' -DestinationPath '.' -Force"
        del platform-tools.zip
    )
    set "PATH=%CD%\platform-tools;%PATH%"
)
adb version >nul 2>&1
if errorlevel 1 (
    echo [X] Could not set up adb. Download platform-tools manually from
    echo     https://developer.android.com/tools/releases/platform-tools
    echo     and add it to your PATH.
    pause
    exit /b 1
)
echo [OK] adb ready.

:: 4. Make bot_config.json if missing
if not exist bot_config.json (
    echo {"device": "127.0.0.1:5555", "screen": {"w": 1080, "h": 2340}} > bot_config.json
    echo [OK] Created bot_config.json
)

echo.
echo Setup complete!
echo   NEXT STEPS:
echo   1. Put groq_key.txt (your free Groq API key) in this folder.
echo   2. Run connect_phone.bat to pair your phone.
echo   3. Run NeuroMLCR.bat to start playing + learning.
echo.
pause
