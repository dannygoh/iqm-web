import type { Metadata } from 'next'
import { PageHero } from '@/components/blocks/PageHero'
import { DirectoryTable, type Column, type FilterOption } from '@/components/blocks/DirectoryTable'
import { Badge } from '@/components/ui/badge'
import { getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Members Directory',
  description: 'Search and browse the register of active Institute of Quality Malaysia members.',
}

export const dynamic = 'force-dynamic'

type Member = {
  id: number
  name: string
  memberType: string
  status: string
}

const COLUMNS: Column<Member>[] = [
  { key: 'name', label: 'Name', sortable: true },
  {
    key: 'memberType',
    label: 'Membership Grade',
    sortable: true,
    render: (v) => (
      <Badge variant="outline" className="text-xs border-primary/30 text-primary">
        {String(v)}
      </Badge>
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

const FILTER_OPTIONS: FilterOption[] = [
  { label: 'Fellow', value: 'Fellow' },
  { label: 'Member', value: 'Member' },
  { label: 'Associate', value: 'Associate' },
  { label: 'Affiliate', value: 'Affiliate' },
  { label: 'Student', value: 'Student' },
  { label: 'Company', value: 'Company' },
  { label: 'Life', value: 'Life' },
  { label: 'Honorary Fellow', value: 'Honorary Fellow' },
]

export default async function MembersDirectoryPage() {
  let members: Member[] = []

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'members',
      limit: 2000,
      sort: 'name',
    })
    members = result.docs.map((d) => ({
      id: typeof d.id === 'number' ? d.id : 0,
      name: String(d.name ?? ''),
      memberType: String(d.memberType ?? ''),
      status: String(d.status ?? 'Active'),
    }))
  } catch {
    // DB unavailable — show empty state
  }

  return (
    <>
      <PageHero
        title="Members Directory"
        breadcrumbs={[{ label: 'Members Directory' }]}
      />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <DirectoryTable
          data={members}
          columns={COLUMNS}
          filterKey="memberType"
          filterOptions={FILTER_OPTIONS}
          filterLabel="Filter by grade"
          searchKeys={['name']}
          pageSize={30}
          emptyMessage="No members found. The directory is populated after migration."
        />
      </div>
    </>
  )
}
