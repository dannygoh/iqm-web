'use client'

import { DirectoryTable, type Column, type FilterOption } from './DirectoryTable'
import { Badge } from '@/components/ui/badge'

type Auditor = { id: number; name: string; grade: string; registrationNumber: string; status: string }

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

export function AuditorsTable({ data }: { data: Auditor[] }) {
  return (
    <DirectoryTable
      data={data}
      columns={COLUMNS}
      filterKey="grade"
      filterOptions={FILTER_OPTIONS}
      filterLabel="Filter by grade"
      searchKeys={['name', 'registrationNumber']}
      pageSize={30}
      emptyMessage="No auditors found. The directory is populated after migration."
    />
  )
}
