import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import Link from 'next/link'
import { PageHero } from '@/components/blocks/PageHero'
import { MembershipTierCard } from '@/components/blocks/MembershipTierCard'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = pageMetadata(
  'Types of Membership',
  'Individual, Corporate, and Company membership options at the Institute of Quality Malaysia.',
)

export default function TypesMembershipPage() {
  return (
    <>
      <PageHero
        title="Types of Membership"
        breadcrumbs={[{ label: 'Membership', href: '/types-membership' }, { label: 'Types of Membership' }]}
      />
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">

        {/* Individual Corporate */}
        <section>
          <h2 className="font-display text-2xl text-primary font-normal mb-2">Individual Membership</h2>
          <div className="w-12 h-1 bg-gold rounded-full mb-6" />

          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted mb-4">Corporate Members</h3>
          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            <MembershipTierCard
              grade="Fellow"
              highlight
              requirements={[
                'Must have been a Member for at least 10 years',
                'At least 7 years of professional experience in a senior quality role',
                'Made substantial contributions to quality advancement',
                'Admission by invitation of the Board of Management',
              ]}
            />
            <MembershipTierCard
              grade="Member"
              requirements={[
                'Appropriate University Degree or equivalent professional qualification',
                'At least 4 years of relevant experience',
                'Or: 10+ years of relevant experience without formal qualification',
              ]}
            />
            <MembershipTierCard
              grade="Associate"
              requirements={[
                'Appropriate University Degree or equivalent qualification',
                'At least 1 year of relevant experience',
                'Or: 5+ years of relevant experience without formal qualification',
              ]}
            />
          </div>

          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted mb-4">Non-Corporate Members</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            <MembershipTierCard
              grade="Affiliate Member"
              requirements={[
                'Successfully completed secondary education (SPM or GCE equivalent)',
                'Association with the Institute and its activities',
                'Subject to Board of Management approval',
              ]}
            />
            <MembershipTierCard
              grade="Student Member"
              requirements={[
                'Bona fide student at a recognised University, College, or Technical School',
                'Prior approval from Vice-Chancellor or Head of School required',
              ]}
            />
          </div>
        </section>

        {/* Company Membership */}
        <section>
          <h2 className="font-display text-2xl text-primary font-normal mb-2">Company Membership</h2>
          <div className="w-12 h-1 bg-gold rounded-full mb-6" />
          <p className="text-foreground/80 leading-relaxed mb-4">
            Company Membership is open to any Institutes, Companies, or Government Departments
            that wish to support the aims of IQM and benefit from membership activities. Company
            Members gain access to IQM events, publications, and the right to nominate staff
            for individual membership consideration.
          </p>
          <Link
            href="/corporate-membership"
            className="inline-flex items-center gap-2 text-gold hover:text-gold font-semibold text-sm transition-colors"
          >
            More about Corporate Membership <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* Life Membership */}
        <section>
          <h2 className="font-display text-2xl text-primary font-normal mb-2">Life Membership</h2>
          <div className="w-12 h-1 bg-gold rounded-full mb-6" />
          <p className="text-foreground/80 leading-relaxed">
            Life Membership is available to qualifying Individual Members. A one-time subscription
            of RM 300.00 grants permanent membership without further annual subscription obligations.
          </p>
        </section>

        <div className="border-t border-border pt-8 flex flex-wrap gap-4">
          <Link href="/entrance-fee-and-annual-subscriptions"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/80 text-white font-semibold px-5 py-2.5 rounded-md transition-colors text-sm">
            View Fee Schedule <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/download-application-forms"
            className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-surface font-semibold px-5 py-2.5 rounded-md transition-colors text-sm">
            Download Application Forms
          </Link>
        </div>
      </div>
    </>
  )
}
