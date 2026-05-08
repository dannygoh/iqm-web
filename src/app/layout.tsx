import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { DM_Serif_Display, Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'

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

export const metadata: Metadata = {
  title: {
    template: '%s | Institute of Quality Malaysia',
    default: 'Institute of Quality Malaysia',
  },
  description:
    'IQM is a professional membership body for quality practitioners in Malaysia.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(
        inter.variable,
        dmSerifDisplay.variable,
        'h-full antialiased',
      )}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
