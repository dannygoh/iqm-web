#!/usr/bin/env bash
# Production cutover: www2.iqm.org.my → www.iqm.org.my
# Run on the VPS as root AFTER client has approved staging.
#
# Pre-requisites:
#   1. DNS A record for www.iqm.org.my already points to this server
#   2. Staging smoke test passed: bash scripts/smoke-test.sh https://www2.iqm.org.my
#   3. This script is run from /opt/iqm-web
set -euo pipefail

APP_DIR="/opt/iqm-web"
DOMAIN_PROD="www.iqm.org.my"
CERTBOT_EMAIL="admin@iqm.org.my"

echo ""
echo "=== IQM Web — Production Cutover ==="
echo "    $(date)"
echo ""

# ── Safety checks ─────────────────────────────────────────────────────────
if [[ ! -f "$APP_DIR/.env" ]]; then
    echo "ERROR: $APP_DIR/.env not found. Create it first." >&2
    exit 1
fi

if ! grep -q "PAYLOAD_SECRET" "$APP_DIR/.env"; then
    echo "ERROR: .env missing PAYLOAD_SECRET." >&2
    exit 1
fi

# ── Step 1: provision SSL cert for production domain ──────────────────────
echo "── Step 1: Provisioning SSL cert for $DOMAIN_PROD ──────────────────"
if [[ -d "/etc/letsencrypt/live/$DOMAIN_PROD" ]]; then
    echo "  Certificate already exists. Skipping."
else
    certbot certonly --webroot -w /var/www/certbot \
        -d "$DOMAIN_PROD" \
        -d "iqm.org.my" \
        --non-interactive --agree-tos \
        -m "$CERTBOT_EMAIL"
    echo "  ✓ Certificate provisioned."
fi

# ── Step 2: deploy production Nginx config ────────────────────────────────
echo ""
echo "── Step 2: Installing production Nginx config ───────────────────────"
cp "$APP_DIR/nginx-production.conf" /etc/nginx/sites-available/iqm-web
nginx -t
systemctl reload nginx
echo "  ✓ Nginx reloaded with production config."

# ── Step 3: update .env for production domain ─────────────────────────────
echo ""
echo "── Step 3: Updating NEXT_PUBLIC_SITE_URL in .env ────────────────────"
sed -i "s|NEXT_PUBLIC_SITE_URL=.*|NEXT_PUBLIC_SITE_URL=https://www.iqm.org.my|" "$APP_DIR/.env"
echo "  ✓ NEXT_PUBLIC_SITE_URL set to https://www.iqm.org.my"

# ── Step 4: restart app container to pick up new env ──────────────────────
echo ""
echo "── Step 4: Restarting app container ─────────────────────────────────"
cd "$APP_DIR"
docker compose -f docker-compose.prod.yml restart app
echo "  ✓ App container restarted."

# Wait for app to be ready
echo "  Waiting for app to be ready..."
for i in {1..12}; do
    if curl -sf http://localhost:3000/api/health >/dev/null 2>&1; then
        echo "  ✓ App is healthy."
        break
    fi
    if [[ $i -eq 12 ]]; then
        echo "  WARNING: App health check timed out. Check logs: docker compose logs app"
    fi
    sleep 5
done

# ── Step 5: smoke test production domain ──────────────────────────────────
echo ""
echo "── Step 5: Smoke testing $DOMAIN_PROD ──────────────────────────────"
if bash "$APP_DIR/scripts/smoke-test.sh" "https://$DOMAIN_PROD"; then
    echo "  ✓ Production smoke test passed."
else
    echo ""
    echo "  WARNING: Some smoke test checks failed."
    echo "  Review the output above and fix before announcing launch."
fi

# ── Step 6: print 24h monitoring reminder ─────────────────────────────────
echo ""
echo "═══════════════════════════════════════════════════════════════════════"
echo "  Cutover complete: https://www.iqm.org.my"
echo ""
echo "  NEXT STEPS:"
echo "  1. Verify DNS has propagated:  dig +short www.iqm.org.my"
echo "  2. Monitor logs for 24h:       docker compose -f docker-compose.prod.yml logs -f app"
echo "  3. Monitor Nginx errors:       tail -f /var/log/nginx/error.log"
echo "  4. Set Certbot auto-renewal:   systemctl enable --now snap.certbot.renew.timer"
echo "  5. (Optional) redirect staging: add 'return 301 https://www.iqm.org.my\$request_uri;'"
echo "     inside the www2.iqm.org.my 443 server block in nginx.conf"
echo "═══════════════════════════════════════════════════════════════════════"
echo ""
