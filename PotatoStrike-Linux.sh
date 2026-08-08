#!/usr/bin/env sh
set -eu

cd "$(dirname "$0")"

if [ -x "./compat/linux/PotatoStrike-Linux-Portable.sh" ]; then
  exec "./compat/linux/PotatoStrike-Linux-Portable.sh"
fi

if [ -x ./node_modules/.bin/electron ]; then
  exec ./node_modules/.bin/electron .
fi

if command -v npx >/dev/null 2>&1 && npx --no-install electron --version >/dev/null 2>&1; then
  exec npx --no-install electron .
fi

if command -v xdg-open >/dev/null 2>&1; then
  exec xdg-open ./PotatoStrike.html
fi

if command -v sensible-browser >/dev/null 2>&1; then
  exec sensible-browser ./PotatoStrike.html
fi

echo "Install npm/electron dependencies or open PotatoStrike.html in a browser."
exit 1
