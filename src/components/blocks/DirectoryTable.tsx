'use client'

import { useState, useMemo } from 'react'
import { Search, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export interface Column<T> {
  key: keyof T
  label: string
  sortable?: boolean
  render?: (value: T[keyof T], row: T) => React.ReactNode
}

export interface FilterOption {
  label: string
  value: string
}

interface DirectoryTableProps<T extends { id: number | string }> {
  data: T[]
  columns: Column<T>[]
  filterKey?: keyof T
  filterOptions?: FilterOption[]
  filterLabel?: string
  searchKeys?: (keyof T)[]
  pageSize?: number
  emptyMessage?: string
}

type SortDir = 'asc' | 'desc' | null

export function DirectoryTable<T extends { id: number | string }>({
  data,
  columns,
  filterKey,
  filterOptions,
  filterLabel = 'Filter',
  searchKeys = [],
  pageSize = 25,
  emptyMessage = 'No records found.',
}: DirectoryTableProps<T>) {
  const [query, setQuery] = useState('')
  const [filterValue, setFilterValue] = useState('all')
  const [sortKey, setSortKey] = useState<keyof T | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>(null)
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let rows = data

    // Text search
    if (query.trim() && searchKeys.length > 0) {
      const q = query.toLowerCase()
      rows = rows.filter((row) =>
        searchKeys.some((k) => String(row[k] ?? '').toLowerCase().includes(q)),
      )
    }

    // Dropdown filter
    if (filterKey && filterValue && filterValue !== 'all') {
      rows = rows.filter((row) => String(row[filterKey]) === filterValue)
    }

    // Sort
    if (sortKey && sortDir) {
      rows = [...rows].sort((a, b) => {
        const av = String(a[sortKey] ?? '')
        const bv = String(b[sortKey] ?? '')
        const cmp = av.localeCompare(bv)
        return sortDir === 'asc' ? cmp : -cmp
      })
    }

    return rows
  }, [data, query, filterKey, filterValue, sortKey, sortDir, searchKeys])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)

  function toggleSort(key: keyof T) {
    if (sortKey !== key) {
      setSortKey(key)
      setSortDir('asc')
    } else if (sortDir === 'asc') {
      setSortDir('desc')
    } else {
      setSortKey(null)
      setSortDir(null)
    }
    setPage(1)
  }

  function SortIcon({ col }: { col: Column<T> }) {
    if (!col.sortable) return null
    if (sortKey !== col.key) return <ChevronsUpDown className="w-3.5 h-3.5 opacity-40" />
    if (sortDir === 'asc') return <ChevronUp className="w-3.5 h-3.5 text-accent" />
    return <ChevronDown className="w-3.5 h-3.5 text-accent" />
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        {searchKeys.length > 0 && (
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <Input
              placeholder="Search…"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1) }}
              className="pl-9"
            />
          </div>
        )}
        {filterKey && filterOptions && (
          <Select
            value={filterValue}
            onValueChange={(v) => { setFilterValue(v ?? 'all'); setPage(1) }}
          >
            <SelectTrigger className="w-52">
              <SelectValue placeholder={filterLabel} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {filterOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <p className="self-center text-sm text-muted ml-auto">
          {filtered.length} {filtered.length === 1 ? 'record' : 'records'}
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-primary text-white">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={cn(
                    'text-left px-4 py-3 font-semibold whitespace-nowrap',
                    col.sortable && 'cursor-pointer select-none hover:bg-primary-light',
                  )}
                  onClick={() => col.sortable && toggleSort(col.key)}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {col.label}
                    <SortIcon col={col} />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-muted">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginated.map((row, i) => (
                <tr
                  key={row.id}
                  className={cn(
                    'border-t border-border transition-colors hover:bg-primary/5',
                    i % 2 === 0 ? 'bg-white' : 'bg-surface',
                  )}
                >
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-3">
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 rounded border border-border text-sm hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <span className="text-sm text-muted">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded border border-border text-sm hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
