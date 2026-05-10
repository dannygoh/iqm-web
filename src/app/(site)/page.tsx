import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import Link from 'next/link'
import { ArrowRight, Users, ClipboardList, BookOpen, Phone } from 'lucide-react'

export const metadata: Metadata = pageMetadata(
  'Institute of Quality Malaysia',
  'IQM is a professional membership body for quality practitioners in Malaysia, promoting quality excellence across industry and government.',
)

const QUICK_LINKS = [
  {
    icon: Users,
    title: 'Types of Membership',
    desc: 'Individual, Corporate, and Company membership options.',
    href: '/types-membership',
  },
  {
    icon: ClipboardList,
    title: 'MRCA Registration',
    desc: 'Register as a certified quality auditor or consultant.',
    href: '/registration-schemes',
  },
  {
    icon: BookOpen,
    title: 'Members Directory',
    desc: 'Search our register of active IQM members.',
    href: '/members-directory',
  },
  {
    icon: Phone,
    title: 'Contact Us',
    desc: 'Get in touch with the IQM secretariat.',
    href: '/contact',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-white py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block bg-gold/20 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
            Promoting Quality Excellence Since 1984
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal mb-6 leading-tight">
            Institute of Quality Malaysia
          </h1>
          <p className="text-lg text-white/75 max-w-2xl mx-auto leading-relaxed mb-10">
            A professional membership body dedicated to advancing quality culture,
            certifying practitioners, and connecting quality professionals across Malaysia.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/types-membership"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-gold-foreground font-semibold px-6 py-3 rounded-md transition-colors"
            >
              Become a Member
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/registration-schemes"
              className="inline-flex items-center gap-2 border border-white/40 hover:border-white text-white font-semibold px-6 py-3 rounded-md transition-colors"
            >
              MRCA Registration
            </Link>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="bg-surface py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-2xl text-primary text-center mb-10">
            What We Offer
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {QUICK_LINKS.map(({ icon: Icon, title, desc, href }) => (
              <Link
                key={href}
                href={href}
                className="bg-white border border-border rounded-lg p-6 hover:shadow-md hover:border-gold/40 transition-all group"
              >
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-gold/10 transition-colors">
                  <Icon className="w-5 h-5 text-primary group-hover:text-gold transition-colors" />
                </div>
                <h3 className="font-semibold text-primary text-sm mb-1">{title}</h3>
                <p className="text-muted text-xs leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About strip */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-12 h-1 bg-gold rounded-full mb-5" />
            <h2 className="font-display text-3xl text-primary font-normal mb-5">
              Who We Are
            </h2>
            <p className="text-foreground/75 leading-relaxed mb-4">
              IQM collaborates with SIRIM, the Department of Standards Malaysia, MAMPU, NPC,
              and other professional bodies to drive quality standards and accreditation
              across Malaysian industry and government.
            </p>
            <p className="text-foreground/75 leading-relaxed mb-6">
              Through our Malaysian Register of Certified Auditors (MRCA) programme,
              we certify quality auditors and consultants who meet international standards.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-gold hover:text-gold font-semibold text-sm transition-colors"
            >
              Learn more about IQM <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="bg-primary rounded-xl p-8 text-white">
            <h3 className="font-display text-xl mb-6">Our Directories</h3>
            <ul className="space-y-4">
              {[
                { label: 'Members Directory', href: '/members-directory' },
                { label: 'MRCA Auditors Directory', href: '/mrca-auditors-directory' },
                { label: 'MRCA Consultants Directory', href: '/mrca-consultants-directory' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center justify-between text-white/80 hover:text-gold transition-colors group"
                  >
                    <span className="text-sm font-medium">{label}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
