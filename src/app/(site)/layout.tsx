import type { ReactNode } from 'react'
import { DM_Serif_Display, Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import '../globals.css'

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
