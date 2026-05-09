import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import Link from 'next/link'
import { PageHero } from '@/components/blocks/PageHero'
import { FeeTable } from '@/components/blocks/FeeTable'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = pageMetadata(
  'Entrance Fee & Annual Subscriptions',
  'Fee schedule for IQM membership — entrance fees and annual subscriptions by membership category.',
)

const FEES = [
  { memberType: 'Company Member', entranceFee: '10.00', annualSubscription: '200.00' },
  { memberType: 'Fellow (FIQM)', entranceFee: '10.00', annualSubscription: '100.00' },
  { memberType: 'Member (MIQM)', entranceFee: '10.00', annualSubscription: '50.00' },
  { memberType: 'Life Member', entranceFee: '10.00', annualSubscription: '300.00', notes: 'One-time subscription only' },
  { memberType: 'Associate (AIQM)', entranceFee: '10.00', annualSubscription: '35.00' },
  { memberType: 'Affiliate Member', entranceFee: '10.00', annualSubscription: '20.00' },
  { memberType: 'Student Member', entranceFee: '10.00', annualSubscription: '10.00' },
]

export default function FeesPage() {
  return (
    <>
      <PageHero
        title="Entrance Fee & Annual Subscriptions"
        breadcrumbs={[{ label: 'Membership', href: '/types-membership' }, { label: 'Fees' }]}
      />
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <FeeTable rows={FEES} />

        <div className="bg-surface border border-border rounded-lg p-5">
          <p className="text-sm text-foreground/70 leading-relaxed">
            <span className="font-semibold text-primary">Note:</span> The Entrance Fee on
            admission to any grade of Membership is <strong>RM 10.00</strong>, applicable once
            upon joining. All amounts are in Malaysian Ringgit (RM). Fees are effective from
            1 January 1996.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href="/download-application-forms"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-semibold px-5 py-2.5 rounded-md transition-colors text-sm">
            Download Application Form <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/types-membership"
            className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-surface font-semibold px-5 py-2.5 rounded-md transition-colors text-sm">
            View Membership Types
          </Link>
        </div>
      </div>
    </>
  )
}
