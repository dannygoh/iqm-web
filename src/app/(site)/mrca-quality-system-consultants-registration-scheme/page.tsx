import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { PageHero } from '@/components/blocks/PageHero'
import { DocumentList } from '@/components/blocks/DocumentList'

export const metadata: Metadata = pageMetadata(
  'MRCA Quality System Consultants Registration Scheme',
  'Apply to register as a certified quality system consultant under the MRCA QSCRS programme.',
)

const DOCUMENTS = [
  {
    name: 'Invitation Letter',
    url: '/files/applcation forms/NEW MRCA APPLICATION CHECKLIST.pdf',
    description: 'Contact IQM secretariat to obtain an invitation letter',
    fileType: 'pdf' as const,
  },
  {
    name: 'QSCRS Application Form (MRCA PD14-1 and/or PD14-2)',
    url: '/files/applcation forms/NEW MRCA APPLICATION CHECKLIST.pdf',
    description: 'Main application form for consultant registration',
    fileType: 'pdf' as const,
  },
  {
    name: 'QSCRS Booklet for Application (MRCA 002)',
    url: '/files/applcation forms/BookletForApplicationMRCA001.pdf',
    description: 'Full application guidance and registration criteria',
    fileType: 'pdf' as const,
  },
]

export default function ConsultantsScheme() {
  return (
    <>
      <PageHero
        title="MRCA Quality System Consultants Registration Scheme"
        subtitle="QSCRS — Malaysian Register of Certified Auditors"
        breadcrumbs={[
          { label: 'MRCA', href: '/registration-schemes' },
          { label: 'Consultants Scheme' },
        ]}
      />
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">

        <section>
          <p className="text-foreground/80 leading-relaxed">
            The purpose of the Quality System Consultants Registration Scheme (QSCRS) is to
            grant registration to qualified individual quality system consultants who comply
            with the registration criteria stated in MRCA 002.
          </p>
        </section>

        {/* Payment info */}
        <section className="bg-surface border border-border rounded-lg p-6 space-y-3">
          <h2 className="font-semibold text-primary">Application &amp; Payment</h2>
          <ul className="text-sm text-foreground/75 space-y-2 leading-relaxed">
            <li>The MRCA Fees Schedule is listed on item 6.0 of page 3 of 5 of MRCA 002.</li>
            <li>
              Send a crossed cheque for <strong>RM 100.00</strong> for application and processing fees.
            </li>
            <li>
              <strong>Cheques:</strong> crossed and payable to{' '}
              <em>"Institute of Quality M'sia (MRCA-Program)"</em>. Do not enclose cash.
            </li>
            <li>
              <strong>Online Transfer:</strong> Maybank A/C No. <strong>5141 8721 3265</strong>
            </li>
            <li>Annual fees will be invoiced after assessment of your application.</li>
            <li>
              Applicants are advised to purchase a copy of QS1, QS2 &amp; QS3 as detailed
              references — a nominal charge of <strong>RM 20.00</strong> covers part of the printing cost.
            </li>
          </ul>
        </section>

        {/* Application package */}
        <section>
          <h2 className="font-display text-xl text-primary font-normal mb-4">
            Application Package
          </h2>
          <DocumentList documents={DOCUMENTS} />
        </section>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-5">
          <p className="text-sm text-foreground/75 leading-relaxed">
            For further enquiries about the QSCRS, please{' '}
            <a href="/contact" className="text-accent hover:text-accent-light font-medium">
              contact the IQM secretariat
            </a>{' '}
            or refer to the MRCA 002 document for full registration criteria.
          </p>
        </div>
      </div>
    </>
  )
}
