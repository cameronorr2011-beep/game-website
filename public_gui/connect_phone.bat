@echo off
title NeuroMLCR — Phone Setup
echo ============================================
echo   Connect your Android phone to NeuroMLCR
echo ============================================
echo.
echo This works in TWO ways:
echo.
echo  [A] SAME Wi-Fi as this PC (recommended)
echo      1. On your phone: Settings - Developer options - Wireless debugging
echo         (tap "Enable", then "Pair device with pairing code")
echo      2. Note the IP:PORT and the 6-digit code shown
echo      3. Type them below when asked
echo.
echo  [B] DIFFERENT Wi-Fi or mobile data (remote play)
echo      1. On the phone (same Wi-Fi first time only): enable Wireless debugging
echo         and pair once as above. Note the phone's IP.
echo      2. On your router: forward TCP port 5555 (or the port shown after pair)
echo         to the phone's IP. On mobile data, install a VPN such as
echo         Tailscale/ZeroTier on phone + PC, then use the phone's VPN IP
echo         (100.x.x.x for Tailscale) instead of the home IP.
echo      3. Run: adb connect PHONE_IP:5555   (from any network!)
echo.
choice /C ABN /M "Select [A] same Wi-Fi, [B] remote setup, [N] quit"
if errorlevel 3 exit /b 0
if errorlevel 2 goto REMOTE

:EASY
set /p PAIR="Enter pairing IP:PORT (from phone): "
set /p CODE="Enter 6-digit pairing code: "
adb pair %PAIR% %CODE%
set /p DEV="Enter connect IP:PORT (usually different port): "
adb connect %DEV%
goto SAVE

:REMOTE
set /p DEV="Enter phone IP:PORT reachable from this PC (e.g. 100.50.10.2:5555): "
adb connect %DEV%

:SAVE
adb devices
echo.
choice /C YN /M "Device shows 'device' in the list above? Save this config"
if errorlevel 2 exit /b 0
python -c "import json;c=json.load(open('bot_config.json'));c['device']='%DEV%';json.dump(c,open('bot_config.json','w'),indent=1)"
echo [OK] Saved to bot_config.json
pause
