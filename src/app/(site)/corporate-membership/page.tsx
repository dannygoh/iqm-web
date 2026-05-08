import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/blocks/PageHero'
import { MembershipTierCard } from '@/components/blocks/MembershipTierCard'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Corporate Membership',
  description: 'Corporate membership grades at the Institute of Quality Malaysia — Fellow, Member, and Associate.',
}

export default function CorporateMembershipPage() {
  return (
    <>
      <PageHero
        title="Corporate Membership"
        breadcrumbs={[{ label: 'Membership', href: '/types-membership' }, { label: 'Corporate Membership' }]}
      />
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
        <p className="text-foreground/80 leading-relaxed">
          Corporate membership is open to individual persons and comprises three grades,
          reflecting professional experience and contribution to quality advancement.
        </p>

        <div className="grid sm:grid-cols-3 gap-6">
          <MembershipTierCard
            grade="Fellow (FIQM)"
            highlight
            requirements={[
              'Must have been a Member for at least 10 years',
              'At least 7 years of professional experience in a senior quality position',
              'Made substantial contribution to the advancement of quality',
              'Admission by invitation of the Board of Management only',
              'Numbers are limited',
            ]}
          />
          <MembershipTierCard
            grade="Member (MIQM)"
            requirements={[
              'Appropriate University Degree or professional qualification recognised by the Board',
              'At least 4 years of relevant experience',
              'Alternatively: 10+ years of relevant experience (no formal qualification required)',
            ]}
          />
          <MembershipTierCard
            grade="Associate (AIQM)"
            requirements={[
              'Appropriate University Degree or professional qualification recognised by the Board',
              'At least 1 year of relevant experience',
              'Alternatively: 5+ years of relevant experience (no formal qualification required)',
            ]}
          />
        </div>

        <div className="border-t border-border pt-8 flex flex-wrap gap-4">
          <Link href="/entrance-fee-and-annual-subscriptions"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-semibold px-5 py-2.5 rounded-md transition-colors text-sm">
            View Fee Schedule <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/download-application-forms"
            className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-surface font-semibold px-5 py-2.5 rounded-md transition-colors text-sm">
            Download Application Form
          </Link>
        </div>
      </div>
    </>
  )
}
