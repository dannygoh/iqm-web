import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { PageHero } from '@/components/blocks/PageHero'
import { AuditorsTable } from '@/components/blocks/AuditorsTable'
import { getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = pageMetadata(
  'MRCA Auditors Directory',
  'Search the register of certified quality system auditors under the MRCA programme.',
)

export const dynamic = 'force-dynamic'

export default async function AuditorsDirectoryPage() {
  let auditors: { id: number; name: string; grade: string; registrationNumber: string; status: string }[] = []

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: 'auditors', limit: 500, sort: 'name' })
    auditors = result.docs.map((d) => ({
      id: typeof d.id === 'number' ? d.id : 0,
      name: String(d.name ?? ''),
      grade: String(d.grade ?? ''),
      registrationNumber: String(d.registrationNumber ?? ''),
      status: String(d.status ?? 'Active'),
    }))
  } catch {
    // DB unavailable — empty state
  }

  return (
    <>
      <PageHero
        title="MRCA Auditors Directory"
        subtitle="Malaysian Register of Certified Auditors — Quality System Auditors"
        breadcrumbs={[{ label: 'MRCA', href: '/registration-schemes' }, { label: 'Auditors Directory' }]}
      />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <AuditorsTable data={auditors} />
      </div>
    </>
  )
}
