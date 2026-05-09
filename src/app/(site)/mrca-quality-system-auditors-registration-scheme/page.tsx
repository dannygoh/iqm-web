import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { PageHero } from '@/components/blocks/PageHero'
import { DocumentList } from '@/components/blocks/DocumentList'

export const metadata: Metadata = pageMetadata(
  'MRCA Quality System Auditors Registration Scheme',
  'Apply to register as a certified quality system auditor under the MRCA QSARS programme.',
)

const DOCUMENTS = [
  {
    name: 'New MRCA Application Checklist',
    url: '/files/applcation forms/NEW MRCA APPLICATION CHECKLIST.pdf',
    description: 'PDF · 1 page — complete before submitting your application',
    fileType: 'pdf' as const,
  },
  {
    name: 'QSARS Booklet for Application (MRCA001, Rev 01-2011)',
    url: '/files/applcation forms/BookletForApplicationMRCA001.pdf',
    description: 'PDF · 21 pages — full application guidance',
    fileType: 'pdf' as const,
  },
  {
    name: 'QSARS Application For Auditor Certification (MRCA PD10, Rev 2-2013)',
    url: '/files/applcation forms/QSARS Application For Auditor Certification MRCA Application Form PD 10 (Rev 2-2013).pdf',
    description: 'PDF · 3 pages — main application form',
    fileType: 'pdf' as const,
  },
  {
    name: 'Audit Log (MRCA PD11-1, Rev 01-2011)',
    url: '/files/applcation forms/Audit Log MRCA PD 11-1.doc',
    description: 'MS Word · 1 page — duplicate as needed',
    fileType: 'doc' as const,
  },
  {
    name: 'QMS Auditing Experience Log (MRCA PD11-2, Rev 01-2011)',
    url: '/files/applcation forms/QMS Auditing Exp Log MRCA PD 11-2.doc',
    description: 'MS Word · 2 pages — duplicate as needed',
    fileType: 'doc' as const,
  },
  {
    name: 'MRCA Auditor Registration Renewal Form (PD11)',
    url: '/files/applcation forms/QSARS-MRCA Auditor Registration Renewal Form PD 11.pdf',
    description: 'PDF · 3 pages — for renewing existing MRCA registration',
    fileType: 'pdf' as const,
  },
]

export default function AuditorsScheme() {
  return (
    <>
      <PageHero
        title="MRCA Quality System Auditors Registration Scheme"
        subtitle="QSARS — Malaysian Register of Certified Auditors"
        breadcrumbs={[
          { label: 'MRCA', href: '/registration-schemes' },
          { label: 'Auditors Scheme' },
        ]}
      />
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">

        {/* Payment info */}
        <section className="bg-surface border border-border rounded-lg p-6 space-y-3">
          <h2 className="font-semibold text-primary">Application &amp; Payment</h2>
          <ul className="text-sm text-foreground/75 space-y-2 leading-relaxed">
            <li>The MRCA Fees Schedule is listed on item 18.0 of MRCA 002.</li>
            <li>
              Send the appropriate processing fees together with <strong>RM 10.00</strong>{' '}
              to offset package and postage costs.
            </li>
            <li>
              <strong>Cheques:</strong> crossed and payable to{' '}
              <em>"Institute of Quality M'sia (MRCA-Program)"</em>. Do not enclose cash.
            </li>
            <li>
              <strong>Online Transfer:</strong> Maybank A/C No. <strong>5141 8721 3265</strong>
            </li>
            <li>Annual fees will be invoiced after assessment of your application.</li>
          </ul>
        </section>

        {/* Application package */}
        <section>
          <h2 className="font-display text-xl text-primary font-normal mb-4">
            Application Package — Download All Documents
          </h2>
          <p className="text-sm text-muted mb-5">
            You may duplicate items 4 &amp; 5 if you need additional copies to fill in your details.
          </p>
          <DocumentList documents={DOCUMENTS} />
        </section>

        {/* Grades table */}
        <section>
          <h2 className="font-display text-xl text-primary font-normal mb-4">Auditor Grades</h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="text-left px-4 py-3 font-semibold">Grade</th>
                  <th className="text-left px-4 py-3 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Principal Auditor', 'Most senior grade — extensive auditing and leadership experience'],
                  ['Lead Auditor', 'Qualified to lead audit teams and manage audit programmes'],
                  ['Senior Auditor', 'Experienced auditor with advanced technical competency'],
                  ['Auditor', 'Qualified to conduct independent quality system audits'],
                  ['Provisional Auditor', 'Working towards full Auditor qualification'],
                  ['Internal Quality Auditor', 'Certified to conduct internal quality audits within an organisation'],
                ].map(([grade, desc], i) => (
                  <tr key={grade} className={`border-t border-border ${i % 2 === 0 ? 'bg-white' : 'bg-surface'}`}>
                    <td className="px-4 py-3 font-medium text-primary whitespace-nowrap">{grade}</td>
                    <td className="px-4 py-3 text-foreground/75">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  )
}
