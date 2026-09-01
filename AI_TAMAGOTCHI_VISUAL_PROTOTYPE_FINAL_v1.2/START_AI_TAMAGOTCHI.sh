#!/usr/bin/env sh
cd "$(dirname "$0")"
if command -v xdg-open >/dev/null 2>&1; then xdg-open "delivery/index.html" >/dev/null 2>&1 &
elif command -v open >/dev/null 2>&1; then open "delivery/index.html"
else echo "Open delivery/index.html in a browser."; fi
