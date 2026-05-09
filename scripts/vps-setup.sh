#!/usr/bin/env bash
# VPS initial setup for iqm-web
# Run once as root on a fresh Debian 13 server:
#   bash <(curl -fsSL https://raw.githubusercontent.com/dannygoh/iqm-web/main/scripts/vps-setup.sh)
set -euo pipefail

DOMAIN_STAGING="www2.iqm.org.my"
APP_DIR="/opt/iqm-web"
DEPLOY_USER="deploy"

echo "=== IQM Web VPS Setup ==="

# ── System update ────────────────────────────────────────────────────────────
apt-get update -qq && apt-get upgrade -y -qq

# ── Install Docker ───────────────────────────────────────────────────────────
if ! command -v docker &>/dev/null; then
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com | sh
fi

# ── Install Nginx ────────────────────────────────────────────────────────────
apt-get install -y -qq nginx

# ── Install Certbot ──────────────────────────────────────────────────────────
apt-get install -y -qq snapd
snap install core && snap refresh core
snap install --classic certbot
ln -sf /snap/bin/certbot /usr/bin/certbot

# ── Install ufw firewall ─────────────────────────────────────────────────────
apt-get install -y -qq ufw
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable

# ── Create deploy user ────────────────────────────────────────────────────────
if ! id "$DEPLOY_USER" &>/dev/null; then
    useradd -m -s /bin/bash "$DEPLOY_USER"
    usermod -aG docker "$DEPLOY_USER"
    echo "Created user: $DEPLOY_USER"
fi

# ── Create app directory ──────────────────────────────────────────────────────
mkdir -p "$APP_DIR/public/files"
mkdir -p "$APP_DIR/public/media"
mkdir -p "$APP_DIR/public/images"
chown -R "$DEPLOY_USER:$DEPLOY_USER" "$APP_DIR"

# ── Configure Nginx ───────────────────────────────────────────────────────────
mkdir -p /var/www/certbot
cat > /etc/nginx/sites-available/iqm-web << 'NGINXEOF'
server {
    listen 80;
    listen [::]:80;
    server_name www2.iqm.org.my;
    location /.well-known/acme-challenge/ { root /var/www/certbot; }
    location / { return 301 https://$host$request_uri; }
}
NGINXEOF

ln -sf /etc/nginx/sites-available/iqm-web /etc/nginx/sites-enabled/iqm-web
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# ── Provision SSL certificate ─────────────────────────────────────────────────
echo ""
echo "=== Provisioning SSL certificate for $DOMAIN_STAGING ==="
echo "Ensure DNS A record for $DOMAIN_STAGING points to this server first."
read -rp "Press Enter when DNS is ready, or Ctrl-C to abort..."
certbot certonly --webroot -w /var/www/certbot \
    -d "$DOMAIN_STAGING" \
    --non-interactive --agree-tos \
    -m admin@iqm.org.my

# ── Install full Nginx config (with SSL) ─────────────────────────────────────
# Copy from the repo (run from APP_DIR after first git clone)
echo ""
echo "=== Next steps ==="
echo "1. Copy docker-compose.prod.yml and nginx.conf to $APP_DIR:"
echo "   git clone https://github.com/dannygoh/iqm-web.git $APP_DIR"
echo ""
echo "2. Replace 'dannygoh' in docker-compose.prod.yml with your GitHub username."
echo ""
echo "3. Create $APP_DIR/.env from .env.example with production values."
echo ""
echo "4. Copy nginx.conf to /etc/nginx/sites-available/iqm-web and reload:"
echo "   cp $APP_DIR/nginx.conf /etc/nginx/sites-available/iqm-web"
echo "   nginx -t && systemctl reload nginx"
echo ""
echo "5. Set up GitHub Actions secrets (see docs/deployment.md)."
echo ""
echo "6. First deploy: trigger the GitHub Actions workflow."
echo ""
echo "Setup complete. SSL cert installed for $DOMAIN_STAGING."
