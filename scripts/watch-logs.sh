#!/usr/bin/env bash
# Post-launch log watcher — surfaces errors from Docker and Nginx.
# Run on the VPS: bash scripts/watch-logs.sh
# Press Ctrl-C to stop.

APP_DIR="/opt/iqm-web"
NGINX_LOG="/var/log/nginx/error.log"

echo "=== IQM Web — Live Log Monitor ==="
echo "    Watching for errors. Ctrl-C to stop."
echo "    $(date)"
echo ""

# Error patterns to highlight
PATTERN="error|Error|ERROR|ECONNREFUSED|unhandledRejection|TypeError|ReferenceError|500|502|503"

# Tail Docker app logs + Nginx error log simultaneously
(
    docker compose -f "$APP_DIR/docker-compose.prod.yml" logs -f --no-log-prefix app 2>&1 | \
        grep --line-buffered -iE "$PATTERN" | \
        sed 's/^/[app] /'
) &
PID_DOCKER=$!

(
    tail -F "$NGINX_LOG" 2>/dev/null | \
        grep --line-buffered -iE "$PATTERN" | \
        sed 's/^/[nginx] /'
) &
PID_NGINX=$!

# Periodic health check every 30s
(
    while true; do
        sleep 30
        STATUS=$(curl -sf http://localhost:3000/api/health | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['status'])" 2>/dev/null || echo "unreachable")
        echo "[health] $(date '+%H:%M:%S') — $STATUS"
    done
) &
PID_HEALTH=$!

trap "kill $PID_DOCKER $PID_NGINX $PID_HEALTH 2>/dev/null; echo 'Monitor stopped.'" EXIT INT TERM
wait
