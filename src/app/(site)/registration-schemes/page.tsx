import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import Link from 'next/link'
import { PageHero } from '@/components/blocks/PageHero'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = pageMetadata(
  'MRCA Registration Schemes',
  'The Malaysian Register of Certified Auditors (MRCA) quality system auditor and consultant registration schemes.',
)

export default function RegistrationSchemesPage() {
  return (
    <>
      <PageHero
        title="MRCA Registration Schemes"
        breadcrumbs={[{ label: 'MRCA', href: '/registration-schemes' }]}
      />
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        <p className="text-foreground/80 leading-relaxed">
          The Malaysian Register of Certified Auditors (MRCA) is administered by IQM to certify
          quality professionals who meet defined registration criteria. Registered practitioners
          are eligible to tender for government quality consultancy and auditing contracts.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Auditors Scheme */}
          <div className="bg-white border border-border rounded-lg p-6 space-y-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-1 bg-gold rounded-full" />
            <h2 className="font-display text-xl text-primary font-normal">
              Quality System Auditors<br />Registration Scheme (QSARS)
            </h2>
            <p className="text-foreground/75 text-sm leading-relaxed">
              For quality professionals wishing to register as certified quality system auditors.
              The MRCA Fees Schedule is listed in MRCA 002. Applications require processing fees
              plus RM 10.00 for package and postage.
            </p>
            <ul className="text-sm text-foreground/70 space-y-1">
              <li>• Cheques payable to <em>"Institute of Quality M'sia (MRCA-Program)"</em></li>
              <li>• Online Transfer: MBB A/C No.: 5141 8721 3265</li>
              <li>• Annual fees invoiced after application assessment</li>
            </ul>
            <Link
              href="/mrca-quality-system-auditors-registration-scheme"
              className="inline-flex items-center gap-2 text-gold hover:text-gold font-semibold text-sm transition-colors"
            >
              View Auditors Scheme <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Consultants Scheme */}
          <div className="bg-white border border-border rounded-lg p-6 space-y-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-1 bg-gold rounded-full" />
            <h2 className="font-display text-xl text-primary font-normal">
              Quality System Consultants<br />Registration Scheme (QSCRS)
            </h2>
            <p className="text-foreground/75 text-sm leading-relaxed">
              For qualified individual quality system consultants who comply with the
              registration criteria stated in MRCA 002. A crossed cheque for RM 100.00
              covers application and processing fees.
            </p>
            <ul className="text-sm text-foreground/70 space-y-1">
              <li>• Cheques payable to <em>"Institute of Quality M'sia (MRCA-Program)"</em></li>
              <li>• Online Transfer: MBB A/C No.: 5141 8721 3265</li>
              <li>• Annual fees invoiced after application assessment</li>
            </ul>
            <Link
              href="/mrca-quality-system-consultants-registration-scheme"
              className="inline-flex items-center gap-2 text-gold hover:text-gold font-semibold text-sm transition-colors"
            >
              View Consultants Scheme <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-5">
          <p className="text-sm text-foreground/70 leading-relaxed">
            <span className="font-semibold text-primary">Note:</span> Please do not enclose cash.
            All cheques must be crossed. Application forms and supporting documents are available
            on the respective scheme pages.{' '}
            <Link href="/download-application-forms" className="text-gold hover:text-gold">
              Download application forms →
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
