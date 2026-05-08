# IQM Web — Deployment Runbook

## Prerequisites

- Debian 13 VPS (4 GB RAM, 1 vCPU, 50 GB NVMe)
- SSH root access
- DNS A record for `www2.iqm.org.my` pointing to the VPS IP
- GitHub repository with secrets configured (see Step 4)

---

## Step 1 — Initial VPS setup (run once as root)

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/OWNER/iqm-web/main/scripts/vps-setup.sh)
```

This installs Docker, Nginx, Certbot, and configures the firewall.

---

## Step 2 — Clone the repository and create `.env`

```bash
git clone https://github.com/OWNER/iqm-web.git /opt/iqm-web
cd /opt/iqm-web

# Edit docker-compose.prod.yml: replace OWNER with your GitHub username
sed -i 's|OWNER|<your-github-username>|g' docker-compose.prod.yml

# Create .env from example
cp .env.example .env
nano .env
```

**Required values in `.env`:**

```env
NEXT_PUBLIC_SITE_URL=https://www2.iqm.org.my
PAYLOAD_SECRET=<generate: openssl rand -base64 32>
DATABASE_URI=postgresql://iqm:<strong-password>@postgres:5432/iqm_db
POSTGRES_PASSWORD=<same strong password>
SMTP_HOST=<your smtp host>
SMTP_PORT=587
SMTP_USER=<smtp username>
SMTP_PASS=<smtp password>
CONTACT_EMAIL_TO=contact@iqm.org.my
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<from Cloudflare dashboard>
TURNSTILE_SECRET_KEY=<from Cloudflare dashboard>
```

---

## Step 3 — Install Nginx SSL config and provision certificate

```bash
# Provision cert (DNS must be live first)
certbot certonly --webroot -w /var/www/certbot \
    -d www2.iqm.org.my \
    --non-interactive --agree-tos \
    -m admin@iqm.org.my

# Install the full Nginx config
cp /opt/iqm-web/nginx.conf /etc/nginx/sites-available/iqm-web
nginx -t && systemctl reload nginx

# Enable auto-renewal
systemctl enable --now snap.certbot.renew.timer
```

---

## Step 4 — Configure GitHub Actions secrets

In the GitHub repository → Settings → Secrets and variables → Actions, add:

| Secret | Value |
|--------|-------|
| `VPS_HOST` | VPS IP address or hostname |
| `VPS_USER` | `deploy` (or `root` for simplicity) |
| `VPS_SSH_KEY` | Private SSH key (generate a dedicated deploy key) |
| `VPS_PORT` | `22` (or custom SSH port) |
| `GHCR_USER` | Your GitHub username |
| `GHCR_TOKEN` | GitHub PAT with `read:packages` scope |

**Generate a deploy SSH key:**
```bash
ssh-keygen -t ed25519 -C "iqm-web-deploy" -f ~/.ssh/iqm_deploy
# Add public key to VPS authorized_keys
cat ~/.ssh/iqm_deploy.pub >> /root/.ssh/authorized_keys
# Add private key content as VPS_SSH_KEY secret in GitHub
cat ~/.ssh/iqm_deploy
```

---

## Step 5 — First deployment

Push to `main` or trigger the workflow manually in GitHub Actions:
```
Actions → Build & Deploy → Run workflow
```

The workflow will:
1. Build the Docker image and push to `ghcr.io/OWNER/iqm-web`
2. SSH to VPS and run `docker compose pull && up -d`
3. App is available at `https://www2.iqm.org.my`

---

## Step 6 — Seed the database

After first deploy, run the migration to populate Members, Auditors, and Consultants:

```bash
# SSH into VPS
ssh deploy@<vps-ip>
cd /opt/iqm-web

# Copy the SQL dump to VPS (from local machine)
# scp db-export.sql.gz deploy@<vps-ip>:/opt/iqm-web/

# Run the migration inside the app container
docker compose -f docker-compose.prod.yml exec app \
    sh -c "DATABASE_URI=\$DATABASE_URI PAYLOAD_SECRET=\$PAYLOAD_SECRET npx tsx scripts/migrate.ts"
```

---

## Step 7 — Smoke test checklist

- [ ] `https://www2.iqm.org.my/` — home page loads
- [ ] `/about`, `/types-membership`, `/contact` — static pages render
- [ ] `/members-directory` — shows seeded members with filter working
- [ ] `/mrca-auditors-directory` — shows auditors, grade filter works
- [ ] `/gallery` — shows albums (static + any added via admin)
- [ ] `/gallery/agm-36` — static album detail with lightbox
- [ ] `/admin` — Payload admin UI loads, can log in
- [ ] Contact form — submits, email arrives at `contact@iqm.org.my`
- [ ] Old Drupal URL `/sites/default/files/foo.pdf` → redirects to `/files/foo.pdf`
- [ ] SSL padlock green, no mixed-content warnings
- [ ] Mobile nav hamburger works on small screen

---

## Production cutover (Phase 7)

When client approves staging:

1. Update `nginx.conf` — change `server_name` to `www.iqm.org.my`
2. Provision new cert: `certbot certonly --webroot -d www.iqm.org.my ...`
3. Update `.env`: set `NEXT_PUBLIC_SITE_URL=https://www.iqm.org.my`
4. Trigger production deploy via workflow dispatch (select `production`)
5. Update DNS A record for `www.iqm.org.my` to VPS IP
6. Monitor Nginx and Next.js logs for 24 hours: `docker compose logs -f`

---

## Useful commands

```bash
# View live logs
docker compose -f docker-compose.prod.yml logs -f app

# Restart app only (after .env change)
docker compose -f docker-compose.prod.yml restart app

# Access Postgres CLI
docker compose -f docker-compose.prod.yml exec postgres psql -U iqm -d iqm_db

# Check Nginx status
systemctl status nginx
nginx -t

# Force SSL renewal
certbot renew --dry-run
```
