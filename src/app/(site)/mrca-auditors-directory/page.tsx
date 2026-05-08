import type { Metadata } from 'next'
import { PageHero } from '@/components/blocks/PageHero'
import { DirectoryTable, type Column, type FilterOption } from '@/components/blocks/DirectoryTable'
import { Badge } from '@/components/ui/badge'
import { getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'MRCA Auditors Directory',
  description:
    'Search the register of certified quality system auditors under the MRCA programme.',
}

export const dynamic = 'force-dynamic'

type Auditor = {
  id: number
  name: string
  grade: string
  registrationNumber: string
  status: string
}

const GRADE_ORDER = [
  'Principal Auditor',
  'Lead Auditor',
  'Senior Auditor',
  'Auditor',
  'Provisional Auditor',
  'Internal Quality Auditor',
]

const COLUMNS: Column<Auditor>[] = [
  { key: 'name', label: 'Name', sortable: true },
  {
    key: 'grade',
    label: 'Grade',
    sortable: true,
    render: (v) => (
      <Badge variant="outline" className="text-xs border-primary/30 text-primary whitespace-nowrap">
        {String(v)}
      </Badge>
    ),
  },
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

const FILTER_OPTIONS: FilterOption[] = GRADE_ORDER.map((g) => ({ label: g, value: g }))

export default async function AuditorsDirectoryPage() {
  let auditors: Auditor[] = []

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'auditors',
      limit: 500,
      sort: 'name',
    })
    auditors = result.docs.map((d) => ({
      id: typeof d.id === 'number' ? d.id : 0,
      name: String(d.name ?? ''),
      grade: String(d.grade ?? ''),
      registrationNumber: String(d.registrationNumber ?? ''),
      status: String(d.status ?? 'Active'),
    }))
  } catch {
    // DB unavailable — show empty state
  }

  return (
    <>
      <PageHero
        title="MRCA Auditors Directory"
        subtitle="Malaysian Register of Certified Auditors — Quality System Auditors"
        breadcrumbs={[{ label: 'MRCA', href: '/registration-schemes' }, { label: 'Auditors Directory' }]}
      />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <DirectoryTable
          data={auditors}
          columns={COLUMNS}
          filterKey="grade"
          filterOptions={FILTER_OPTIONS}
          filterLabel="Filter by grade"
          searchKeys={['name', 'registrationNumber']}
          pageSize={30}
          emptyMessage="No auditors found. The directory is populated after migration."
        />
      </div>
    </>
  )
}
