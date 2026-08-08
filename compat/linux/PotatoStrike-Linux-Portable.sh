#!/usr/bin/env sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
ROOT_DIR=$(CDPATH= cd -- "$SCRIPT_DIR/../.." && pwd)
cd "$ROOT_DIR"

open_file() {
  if command -v xdg-open >/dev/null 2>&1; then exec xdg-open "$1"; fi
  if command -v gio >/dev/null 2>&1; then exec gio open "$1"; fi
  if command -v kde-open >/dev/null 2>&1; then exec kde-open "$1"; fi
  if command -v gnome-open >/dev/null 2>&1; then exec gnome-open "$1"; fi
  for browser in firefox-esr firefox chromium chromium-browser google-chrome brave-browser opera; do
    if command -v "$browser" >/dev/null 2>&1; then exec "$browser" "$1"; fi
  done
  return 1
}

if [ -x "./dist/linux-unpacked/potato-strike" ]; then
  exec "./dist/linux-unpacked/potato-strike"
fi

if [ -x "./node_modules/.bin/electron" ]; then
  exec "./node_modules/.bin/electron" . --safe-offline
fi

if [ -f "./PotatoStrike.html" ]; then
  open_file "./PotatoStrike.html" || true
fi

echo "Could not open Potato Strike automatically."
echo "Try: sh compat/linux/PotatoStrike-Linux-Server.sh"
echo "Or open PotatoStrike.html manually in Firefox/Chromium."
exit 1
