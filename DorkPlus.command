#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════
#  DORK+ — Launcher (Grok + ChatGPT)
# ═══════════════════════════════════════════════════════════════════════════

cd "$(dirname "$0")"

BASE_PORT=5085
USER_OFFSET=$(python3 -c "import getpass,hashlib;print(int(hashlib.md5(getpass.getuser().encode()).hexdigest(),16)%100)")
PORT=$((BASE_PORT + USER_OFFSET))
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
    pip install -q -r dork-plus/requirements.txt
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
echo "  :D DORK+"
echo "  → ${APP_URL}"
echo ""

python3 dork-plus/app/dashboard.py
