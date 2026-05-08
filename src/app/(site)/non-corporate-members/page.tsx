import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/blocks/PageHero'
import { MembershipTierCard } from '@/components/blocks/MembershipTierCard'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Non-Corporate Members',
  description: 'Affiliate and Student membership at the Institute of Quality Malaysia.',
}

export default function NonCorporatePage() {
  return (
    <>
      <PageHero
        title="Non-Corporate Members"
        breadcrumbs={[{ label: 'Membership', href: '/types-membership' }, { label: 'Non-Corporate Members' }]}
      />
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        <p className="text-foreground/80 leading-relaxed">
          Non-Corporate membership is open to any individual who supports the objectives of IQM.
          It comprises two grades designed for those starting their quality career or still
          in education.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          <MembershipTierCard
            grade="Affiliate Member"
            requirements={[
              'Successfully completed secondary education (SPM or GCE equivalent)',
              'Association with the Institute and its activities',
              'Must conduce to the general advancement of quality',
              'Subject to Board of Management approval',
            ]}
          />
          <MembershipTierCard
            grade="Student Member"
            requirements={[
              'Bona fide student at a recognised University, College, or Technical School',
              'Prior approval from the Vice-Chancellor or Head of School required',
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
            Download Membership Form
          </Link>
        </div>
      </div>
    </>
  )
}
