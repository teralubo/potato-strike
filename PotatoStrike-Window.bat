@echo off
cd /d "%~dp0"
if exist "node_modules\electron\dist\electron.exe" (
  set POTATO_SAFE_OFFLINE=1
  start "" "node_modules\electron\dist\electron.exe" . --safe-offline
) else (
  echo Electron runtime not found. Run npm install first.
  pause
)
