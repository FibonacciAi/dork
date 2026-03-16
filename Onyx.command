#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════
#  ONYX — Launcher
# ═══════════════════════════════════════════════════════════════════════════

cd "$(dirname "$0")"

PORT=5082
APP_URL="http://127.0.0.1:${PORT}"

# Load .env
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Kill existing
lsof -ti:${PORT} | xargs kill -9 2>/dev/null

# Create venv if needed
if [ ! -d "venv" ]; then
    echo "  Setting up environment..."
    python3 -m venv venv
    source venv/bin/activate
    pip install -q -r onyx/requirements.txt
else
    source venv/bin/activate
fi

# Open browser in app mode
sleep 1 && {
    if [ -d "/Applications/Google Chrome.app" ]; then
        open -na "Google Chrome" --args --app="${APP_URL}" --window-size=1440,900 2>/dev/null
    elif [ -d "/Applications/Microsoft Edge.app" ]; then
        open -na "Microsoft Edge" --args --app="${APP_URL}" 2>/dev/null
    else
        open "${APP_URL}"
    fi
} &

echo ""
echo "  ◆ ONYX"
echo "  → ${APP_URL}"
echo ""

python3 onyx/app/dashboard.py
