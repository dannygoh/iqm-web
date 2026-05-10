import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import Link from 'next/link'
import { PageHero } from '@/components/blocks/PageHero'
import { DocumentList } from '@/components/blocks/DocumentList'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = pageMetadata(
  'Download Application Forms',
  'Download IQM membership and MRCA registration application forms.',
)

const MEMBERSHIP_FORMS = [
  {
    name: 'IQM New Member Application Form (Feb 2020)',
    url: '/files/applcation forms/IQM NEW MEMBER APPLICATION FORM.pdf',
    description: 'For Individual membership — Fellow, Member, Associate, Affiliate',
    fileType: 'pdf' as const,
  },
  {
    name: 'IQM New Company Member Application Form (Feb 2020)',
    url: '/files/applcation forms/IQM NEW COMPANY MEMBER APPLICATION FORM.pdf',
    description: 'For Company (Corporate) membership',
    fileType: 'pdf' as const,
  },
]

const MRCA_FORMS = [
  {
    name: 'New MRCA Application Checklist',
    url: '/files/applcation forms/NEW MRCA APPLICATION CHECKLIST.pdf',
    description: 'Checklist — complete before submitting your application',
    fileType: 'pdf' as const,
  },
  {
    name: 'QSARS Application For Auditor Certification (MRCA PD10, Rev 2-2013)',
    url: '/files/applcation forms/QSARS Application For Auditor Certification MRCA Application Form PD 10 (Rev 2-2013).pdf',
    description: 'Quality System Auditors Registration Scheme — application form',
    fileType: 'pdf' as const,
  },
  {
    name: 'QSARS Booklet for Application (MRCA001, Rev 01-2011)',
    url: '/files/applcation forms/BookletForApplicationMRCA001.pdf',
    description: '21-page booklet with full application guidance',
    fileType: 'pdf' as const,
  },
  {
    name: 'Audit Log (MRCA PD11-1)',
    url: '/files/applcation forms/Audit Log MRCA PD 11-1.doc',
    description: 'MS Word document — duplicate as needed',
    fileType: 'doc' as const,
  },
  {
    name: 'QMS Auditing Experience Log (MRCA PD11-2)',
    url: '/files/applcation forms/QMS Auditing Exp Log MRCA PD 11-2.doc',
    description: 'MS Word document — duplicate as needed',
    fileType: 'doc' as const,
  },
  {
    name: 'MRCA Auditor Registration Renewal Form (PD11)',
    url: '/files/applcation forms/QSARS-MRCA Auditor Registration Renewal Form PD 11.pdf',
    description: 'For renewing existing MRCA auditor registration',
    fileType: 'pdf' as const,
  },
]

export default function DownloadFormsPage() {
  return (
    <>
      <PageHero
        title="Download Application Forms"
        breadcrumbs={[{ label: 'Membership', href: '/types-membership' }, { label: 'Download Forms' }]}
      />
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        <section>
          <h2 className="font-display text-xl text-primary font-normal mb-1">Membership Application Forms</h2>
          <p className="text-muted text-sm mb-5">
            For joining IQM as an Individual or Company member.{' '}
            <Link href="/types-membership" className="text-gold hover:text-gold">
              Check which membership type is right for you.
            </Link>
          </p>
          <DocumentList documents={MEMBERSHIP_FORMS} />
        </section>

        <section>
          <h2 className="font-display text-xl text-primary font-normal mb-1">MRCA Registration Forms</h2>
          <p className="text-muted text-sm mb-5">
            For registering as a certified quality auditor or consultant under the Malaysian Register
            of Certified Auditors (MRCA) scheme.{' '}
            <Link href="/registration-schemes" className="text-gold hover:text-gold">
              Learn about the MRCA schemes.
            </Link>
          </p>
          <DocumentList documents={MRCA_FORMS} />
        </section>

        <div className="border-t border-border pt-6">
          <p className="text-sm text-muted leading-relaxed">
            Please send completed forms together with the applicable fee to the IQM Secretariat.
            Cheques must be crossed and made payable to{' '}
            <strong className="text-foreground">"Institute of Quality M'sia (MRCA-Program)"</strong>.
          </p>
          <p className="text-sm text-muted mt-2">
            For enquiries: <Link href="/contact" className="text-gold hover:text-gold inline-flex items-center gap-1">Contact us <ArrowRight className="w-3 h-3" /></Link>
          </p>
        </div>
      </div>
    </>
  )
}
