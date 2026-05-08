import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  output: 'standalone',
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
