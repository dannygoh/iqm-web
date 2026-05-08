'use client'

import { DirectoryTable, type Column, type FilterOption } from './DirectoryTable'
import { Badge } from '@/components/ui/badge'

type Member = { id: number; name: string; memberType: string; status: string }

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

export function MembersTable({ data }: { data: Member[] }) {
  return (
    <DirectoryTable
      data={data}
      columns={COLUMNS}
      filterKey="memberType"
      filterOptions={FILTER_OPTIONS}
      filterLabel="Filter by grade"
      searchKeys={['name']}
      pageSize={30}
      emptyMessage="No members found. The directory is populated after migration."
    />
  )
}
