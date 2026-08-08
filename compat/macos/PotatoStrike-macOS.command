#!/usr/bin/env sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
ROOT_DIR=$(CDPATH= cd -- "$SCRIPT_DIR/../.." && pwd)
cd "$ROOT_DIR"

if [ -f "./PotatoStrike.html" ]; then
  exec open "./PotatoStrike.html"
fi

echo "PotatoStrike.html not found."
exit 1
