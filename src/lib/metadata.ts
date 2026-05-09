import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.iqm.org.my'
const siteName = 'Institute of Quality Malaysia'

export const BASE_METADATA: Metadata = {
  metadataBase: new URL(siteUrl),
  openGraph: {
    siteName,
    type: 'website',
    locale: 'en_MY',
    images: [
      {
        url: '/images/iqm_logo.png',
        width: 120,
        height: 77,
        alt: 'IQM Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    site: '@IQMalaysia',
  },
  robots: {
    index: true,
    follow: true,
  },
}

/** Merge page-specific title + description into the full metadata shape with OG fields. */
export function pageMetadata(title: string, description: string): Metadata {
  return {
    ...BASE_METADATA,
    title,
    description,
    openGraph: {
      ...BASE_METADATA.openGraph,
      title,
      description,
    },
    twitter: {
      ...BASE_METADATA.twitter,
      title,
      description,
    },
  }
}
