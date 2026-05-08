import Link from 'next/link'

const FOOTER_LINKS = {
  About: [
    { label: 'About IQM', href: '/about' },
    { label: 'Aims & Objectives', href: '/iqm-aims-and-objectives' },
    { label: 'Board of Management', href: '/board-management-year-20152017' },
    { label: 'Rules & Constitution', href: '/rules-constitution-iqm' },
  ],
  Membership: [
    { label: 'Types of Membership', href: '/types-membership' },
    { label: 'Member Benefits', href: '/iqm-members-benefit' },
    { label: 'Fees & Subscriptions', href: '/entrance-fee-and-annual-subscriptions' },
    { label: 'Download Forms', href: '/download-application-forms' },
  ],
  Directories: [
    { label: 'Members Directory', href: '/members-directory' },
    { label: 'MRCA Auditors', href: '/mrca-auditors-directory' },
    { label: 'MRCA Consultants', href: '/mrca-consultants-directory' },
    { label: 'Contact Us', href: '/contact' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Org info */}
          <div>
            <h3 className="font-display text-xl mb-3">IQM</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Institute of Quality Malaysia<br />
              Promoting quality excellence across Malaysia.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-accent text-xs font-semibold uppercase tracking-widest mb-3">
                {heading}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-accent-light text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/20 mt-10 pt-6 text-center text-white/50 text-sm">
          © {new Date().getFullYear()} Institute of Quality Malaysia. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
