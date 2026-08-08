#!/usr/bin/env sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
ROOT_DIR=$(CDPATH= cd -- "$SCRIPT_DIR/../.." && pwd)
cd "$ROOT_DIR"

PORT="${POTATO_PORT:-8787}"

if command -v node >/dev/null 2>&1 && [ -f "server.js" ]; then
  echo "Potato Strike server: http://localhost:$PORT"
  PORT="$PORT" node server.js
  exit $?
fi

if command -v python3 >/dev/null 2>&1; then
  echo "Potato Strike static server: http://localhost:$PORT/PotatoStrike.html"
  python3 -m http.server "$PORT"
  exit $?
fi

echo "Node.js or Python 3 is required for server mode."
exit 1
