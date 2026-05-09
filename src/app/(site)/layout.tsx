import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { DM_Serif_Display, Inter } from 'next/font/google'
import { BASE_METADATA } from '@/lib/metadata'
import { cn } from '@/lib/utils'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import '../globals.css'

export const metadata: Metadata = {
  ...BASE_METADATA,
  title: {
    template: '%s | Institute of Quality Malaysia',
    default: 'Institute of Quality Malaysia',
  },
  description:
    'IQM is a professional membership body for quality practitioners in Malaysia, promoting quality excellence across industry and government.',
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
})

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(inter.variable, dmSerifDisplay.variable, 'h-full antialiased')}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
