'use client'

import { DirectoryTable, type Column } from './DirectoryTable'

type Consultant = { id: number; name: string; registrationNumber: string; status: string }

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

export function ConsultantsTable({ data }: { data: Consultant[] }) {
  return (
    <DirectoryTable
      data={data}
      columns={COLUMNS}
      searchKeys={['name', 'registrationNumber']}
      pageSize={30}
      emptyMessage="No consultants found. The directory is populated after migration."
    />
  )
}
