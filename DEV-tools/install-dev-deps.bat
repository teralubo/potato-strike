@echo off
cd /d "%~dp0\.."
where npm >nul 2>nul
if errorlevel 1 (
  echo npm nie jest zainstalowany. Do grania go nie potrzebujesz - uruchom PotatoStrike.html.
  echo Do buildow Electron zainstaluj Node.js LTS ze strony nodejs.org.
  pause
  exit /b 1
)
npm install
pause
