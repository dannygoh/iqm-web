FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat

# ── deps: production-only node_modules ───────────────────────────────────────
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ── builder: full deps + Next.js build ───────────────────────────────────────
FROM base AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Dummy build-time credentials (Payload generates importmap/types; no live DB needed)
ARG DATABASE_URI=postgresql://iqm:build@localhost:5432/iqm_db
ARG PAYLOAD_SECRET=build-time-secret-not-used-in-production
ARG NEXT_PUBLIC_SITE_URL=https://www.iqm.org.my

ENV DATABASE_URI=${DATABASE_URI}
ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# ── runner: production image ──────────────────────────────────────────────────
# Uses full node_modules (not standalone) so Payload's React.cache-based admin
# routing can load @payloadcms/* packages from node_modules correctly.
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Copy production node_modules (no devDeps)
COPY --from=deps    --chown=nextjs:nodejs /app/node_modules ./node_modules
# Copy Next.js build output and app files
COPY --from=builder --chown=nextjs:nodejs /app/.next        ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public       ./public
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/next.config.ts ./next.config.ts
COPY --from=builder --chown=nextjs:nodejs /app/src/migrations ./src/migrations

# Ensure upload dirs are owned by nextjs
RUN mkdir -p public/files public/media \
 && chown -R nextjs:nodejs public

USER nextjs

EXPOSE 3000

CMD ["node_modules/.bin/next", "start"]
