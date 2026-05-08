import type { Metadata } from 'next'
import { PageHero } from '@/components/blocks/PageHero'
import { MembersTable } from '@/components/blocks/MembersTable'
import { getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Members Directory',
  description: 'Search and browse the register of active Institute of Quality Malaysia members.',
}

export const dynamic = 'force-dynamic'

export default async function MembersDirectoryPage() {
  let members: { id: number; name: string; memberType: string; status: string }[] = []

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: 'members', limit: 2000, sort: 'name' })
    members = result.docs.map((d) => ({
      id: typeof d.id === 'number' ? d.id : 0,
      name: String(d.name ?? ''),
      memberType: String(d.memberType ?? ''),
      status: String(d.status ?? 'Active'),
    }))
  } catch {
    // DB unavailable — empty state
  }

  return (
    <>
      <PageHero title="Members Directory" breadcrumbs={[{ label: 'Members Directory' }]} />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <MembersTable data={members} />
      </div>
    </>
  )
}
