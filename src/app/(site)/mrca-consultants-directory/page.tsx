import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { PageHero } from '@/components/blocks/PageHero'
import { ConsultantsTable } from '@/components/blocks/ConsultantsTable'
import { getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = pageMetadata(
  'MRCA Consultants Directory',
  'Search the register of certified quality system consultants under the MRCA programme.',
)

export const dynamic = 'force-dynamic'

export default async function ConsultantsDirectoryPage() {
  let consultants: { id: number; name: string; registrationNumber: string; status: string }[] = []

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: 'consultants', limit: 500, sort: 'name' })
    consultants = result.docs.map((d) => ({
      id: typeof d.id === 'number' ? d.id : 0,
      name: String(d.name ?? ''),
      registrationNumber: String(d.registrationNumber ?? ''),
      status: String(d.status ?? 'Active'),
    }))
  } catch {
    // DB unavailable — empty state
  }

  return (
    <>
      <PageHero
        title="MRCA Consultants Directory"
        subtitle="Malaysian Register of Certified Auditors — Quality System Consultants"
        breadcrumbs={[{ label: 'MRCA', href: '/registration-schemes' }, { label: 'Consultants Directory' }]}
      />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <ConsultantsTable data={consultants} />
      </div>
    </>
  )
}
