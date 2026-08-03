@echo off
cd /d "%~dp0"
if exist "node_modules\electron\dist\electron.exe" (
  start "" "node_modules\electron\dist\electron.exe" . --editor
) else (
  start "" "game\editor.html"
)
