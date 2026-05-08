FROM node:22-alpine AS base

# ── deps: install production + dev deps ──────────────────────────────────────
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ── builder: compile the Next.js app ─────────────────────────────────────────
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Dummy credentials for build-time only (withPayload generates importmap/types,
# does NOT need a live DB; static pages gracefully degrade to empty state).
ARG DATABASE_URI=postgresql://iqm:build@localhost:5432/iqm_db
ARG PAYLOAD_SECRET=build-time-secret-not-used-in-production
ARG NEXT_PUBLIC_SITE_URL=https://www.iqm.org.my

ENV DATABASE_URI=${DATABASE_URI}
ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# ── runner: minimal production image ─────────────────────────────────────────
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Static files from build
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static    ./.next/static

# Ensure upload directories exist (runtime volumes mount over these)
RUN mkdir -p ./public/files ./public/media \
 && chown -R nextjs:nodejs ./public

USER nextjs

EXPOSE 3000
CMD ["node", "server.js"]
