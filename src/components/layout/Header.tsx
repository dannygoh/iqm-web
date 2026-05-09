'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const NAV_LINKS = [
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'About IQM', href: '/about' },
      { label: 'Aims & Objectives', href: '/iqm-aims-and-objectives' },
      { label: 'Board of Management', href: '/board-management-year-20152017' },
      { label: 'Rules & Constitution', href: '/rules-constitution-iqm' },
    ],
  },
  {
    label: 'Membership',
    href: '/types-membership',
    children: [
      { label: 'Types of Membership', href: '/types-membership' },
      { label: 'Member Benefits', href: '/iqm-members-benefit' },
      { label: 'Corporate Membership', href: '/corporate-membership' },
      { label: 'Non-Corporate Members', href: '/non-corporate-members' },
      { label: 'Fees & Subscriptions', href: '/entrance-fee-and-annual-subscriptions' },
      { label: 'Download Forms', href: '/download-application-forms' },
    ],
  },
  {
    label: 'MRCA',
    href: '/registration-schemes',
    children: [
      { label: 'Registration Schemes', href: '/registration-schemes' },
      { label: 'Auditors Scheme', href: '/mrca-quality-system-auditors-registration-scheme' },
      { label: 'Consultants Scheme', href: '/mrca-quality-system-consultants-registration-scheme' },
    ],
  },
  {
    label: 'Directory',
    href: '/members-directory',
    children: [
      { label: 'Members Directory', href: '/members-directory' },
      { label: 'MRCA Auditors', href: '/mrca-auditors-directory' },
      { label: 'MRCA Consultants', href: '/mrca-consultants-directory' },
    ],
  },
  { label: 'Events', href: '/events' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-white rounded overflow-hidden flex-shrink-0 shadow-sm">
            <Image
              src="/images/iqm_logo.png"
              alt="IQM Logo"
              width={60}
              height={40}
              className="h-10 w-auto block"
              priority
            />
          </div>
          <span className="text-white font-display text-base leading-tight hidden sm:block">
            Institute of Quality Malaysia
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/90 hover:text-accent-light text-sm font-medium px-3 py-2 rounded transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden bg-primary-light px-4 pb-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-white/90 hover:text-accent-light text-sm font-medium py-2 border-b border-white/10"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
