#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════
#  SuperGrok Creator — Launcher
# ═══════════════════════════════════════════════════════════════════════════

cd "$(dirname "$0")"

PORT=5083
APP_URL="http://127.0.0.1:${PORT}"

# ── Load .env if present ──────────────────────────────────────────────────
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# ── Kill any existing instance ────────────────────────────────────────────
lsof -ti:${PORT} | xargs kill -9 2>/dev/null

# ── Create venv if needed ─────────────────────────────────────────────────
if [ ! -d "venv" ]; then
    echo "  Creating virtual environment..."
    python3 -m venv venv
    source venv/bin/activate
    pip install -q -r supergrok/requirements.txt
else
    source venv/bin/activate
fi

# ── Launch browser in app mode ────────────────────────────────────────────
sleep 1 && {
    if [ -d "/Applications/Google Chrome.app" ]; then
        open -na "Google Chrome" --args --app="${APP_URL}" --window-size=1400,900 2>/dev/null
    elif [ -d "/Applications/Microsoft Edge.app" ]; then
        open -na "Microsoft Edge" --args --app="${APP_URL}" 2>/dev/null
    else
        open "${APP_URL}"
    fi
} &

# ── Start server ──────────────────────────────────────────────────────────
echo ""
echo "  ⚡ SuperGrok Creator"
echo "  → ${APP_URL}"
echo ""

python3 supergrok/app/dashboard.py
