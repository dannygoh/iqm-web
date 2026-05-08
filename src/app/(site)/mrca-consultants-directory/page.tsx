import type { Metadata } from 'next'
import { PageHero } from '@/components/blocks/PageHero'
import { DirectoryTable, type Column } from '@/components/blocks/DirectoryTable'
import { getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'MRCA Consultants Directory',
  description:
    'Search the register of certified quality system consultants under the MRCA programme.',
}

export const dynamic = 'force-dynamic'

type Consultant = {
  id: number
  name: string
  registrationNumber: string
  status: string
}

const COLUMNS: Column<Consultant>[] = [
  { key: 'name', label: 'Name', sortable: true },
  {
    key: 'registrationNumber',
    label: 'Registration No.',
    sortable: true,
    render: (v) => (
      <span className="font-mono text-xs text-muted">{String(v) || '—'}</span>
    ),
  },
  {
    key: 'status',
    label: 'Status',
    render: (v) => (
      <span className={`text-xs font-medium ${v === 'Active' ? 'text-green-700' : 'text-muted'}`}>
        {String(v)}
      </span>
    ),
  },
]

export default async function ConsultantsDirectoryPage() {
  let consultants: Consultant[] = []

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'consultants',
      limit: 500,
      sort: 'name',
    })
    consultants = result.docs.map((d) => ({
      id: typeof d.id === 'number' ? d.id : 0,
      name: String(d.name ?? ''),
      registrationNumber: String(d.registrationNumber ?? ''),
      status: String(d.status ?? 'Active'),
    }))
  } catch {
    // DB unavailable — show empty state
  }

  return (
    <>
      <PageHero
        title="MRCA Consultants Directory"
        subtitle="Malaysian Register of Certified Auditors — Quality System Consultants"
        breadcrumbs={[{ label: 'MRCA', href: '/registration-schemes' }, { label: 'Consultants Directory' }]}
      />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <DirectoryTable
          data={consultants}
          columns={COLUMNS}
          searchKeys={['name', 'registrationNumber']}
          pageSize={30}
          emptyMessage="No consultants found. The directory is populated after migration."
        />
      </div>
    </>
  )
}
