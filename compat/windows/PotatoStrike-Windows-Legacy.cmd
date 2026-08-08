@echo off
setlocal
cd /d "%~dp0..\.."

if exist "PotatoStrike.html" (
  start "" "PotatoStrike.html"
  exit /b 0
)

if exist "game\index.html" (
  start "" "game\index.html"
  exit /b 0
)

echo PotatoStrike.html not found.
echo Put this launcher inside the Potato Strike folder or rebuild with npm run package:compat.
pause
exit /b 1
