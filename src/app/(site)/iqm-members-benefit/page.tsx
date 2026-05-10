import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import Link from 'next/link'
import { PageHero } from '@/components/blocks/PageHero'
import { Check, Download } from 'lucide-react'

export const metadata: Metadata = pageMetadata(
  "IQM Members' Benefits",
  "Benefits of membership at the Institute of Quality Malaysia.",
)

const BENEFITS = [
  'Access to IQM events, seminars, and professional development programmes',
  'Use of IQM membership designatory letters (e.g. FIQM, MIQM, AIQM)',
  'Eligibility to register under the MRCA quality auditor and consultant schemes',
  'Networking opportunities with quality professionals across Malaysia',
  'Access to IQM publications, technical papers, and research outputs',
  'Ability to tender for government quality consultancy projects (via MRCA)',
  'Participation in national and international quality conferences and forums',
  'Connection to the Asia-Pacific Quality Organization (APQO) network',
  'Advisory and consultancy services on quality-related matters',
  'Access to member directory listings and referrals',
]

export default function MembersBenefitPage() {
  return (
    <>
      <PageHero
        title="IQM Members' Benefits"
        breadcrumbs={[{ label: 'Membership', href: '/types-membership' }, { label: "Members' Benefits" }]}
      />
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        <p className="text-foreground/80 leading-relaxed">
          In view of the competitive and borderless business activities in this modern time,
          IQM and its members are experiencing increasing liberalisation and globalisation
          challenges worldwide. IQM is transforming its activities and services to benefit
          members in a more innovative manner to face these challenges.
        </p>

        <div className="bg-surface rounded-lg border border-border p-8">
          <h2 className="font-display text-xl text-primary font-normal mb-6">
            What You Get as an IQM Member
          </h2>
          <ul className="space-y-3">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-foreground/80 text-sm leading-relaxed">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href="/types-membership"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/80 text-white font-semibold px-5 py-2.5 rounded-md transition-colors text-sm">
            View Membership Types
          </Link>
          <a
            href="/files/IQM-Members-Benefits.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-gold text-gold hover:bg-gold/5 font-semibold px-5 py-2.5 rounded-md transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            Download Full Benefits PDF
          </a>
        </div>
      </div>
    </>
  )
}
