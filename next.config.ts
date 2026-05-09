import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  // Note: output:'standalone' is intentionally omitted — Payload v3's React.cache-based
  // admin routing is incompatible with Next.js standalone bundling.
  images: {
    remotePatterns: [
      // Allow images served from the same VPS (Payload uploads via Nginx)
      {
        protocol: 'https',
        hostname: 'www.iqm.org.my',
      },
      {
        protocol: 'https',
        hostname: 'www2.iqm.org.my',
      },
    ],
  },
}

export default withPayload(nextConfig)
