@echo off
cd /d "%~dp0"
if exist "node_modules\electron\dist\electron.exe" (
  start "" "node_modules\electron\dist\electron.exe" .
) else (
  echo Electron runtime not found.
  echo Run: npm install
  echo Then run this file again, or run: npm run start
  pause
)
