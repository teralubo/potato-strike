@echo off
cd /d "%~dp0"
if exist "node_modules\electron\dist\electron.exe" (
  set POTATO_SAFE_OFFLINE=1
  start "" "node_modules\electron\dist\electron.exe" . --safe-offline
) else (
  echo Electron runtime not found.
  echo Run: npm install
  echo Then run this file again, or run: npm run start
  pause
)
