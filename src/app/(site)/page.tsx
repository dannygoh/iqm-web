import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import Link from 'next/link'
import Image from 'next/image'
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
      <section className="relative isolate overflow-hidden">
        {/* Background: KL skyline + gradient layers */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero-towers.jpg"
            alt="Petronas Twin Towers, Kuala Lumpur"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 bg-primary/55" />
        </div>

        {/* Main content */}
        <div className="container-prose relative grid min-h-[88vh] grid-cols-1 items-center py-24 text-primary-foreground">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold">
              <span className="h-px w-10 bg-gold" />
              Est. 1989 · Kuala Lumpur
            </div>
            <h1 className="mt-6 font-display text-balance text-5xl leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl">
              Quality<span className="italic text-gold"> in Unity.</span>
              <br />Standards <span className="italic">in Practice.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-primary-foreground/80">
              The Institute of Quality Malaysia advances the nation&apos;s quality profession —
              collaborating with SIRIM, Department of Standards Malaysia, MAMPU, NPC and global
              bodies to set the benchmark for excellence.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/types-membership"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-gold-foreground hover:opacity-90 transition"
              >
                Become a Member <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10 transition"
              >
                About the Institute
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-primary-foreground/15 bg-primary/40 backdrop-blur">
          <div className="container-prose grid grid-cols-2 gap-px sm:grid-cols-4">
            {[
              { value: '35+',   label: 'Years advancing quality' },
              { value: '1000s', label: 'Certified members' },
              { value: '10+',   label: 'National partnerships' },
              { value: '32',    label: 'COSTAM affiliates' },
            ].map(({ value, label }) => (
              <div key={label} className="px-4 py-6 text-primary-foreground">
                <div className="font-display text-3xl text-gold">{value}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-primary-foreground/70">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="bg-secondary py-16 px-6">
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
