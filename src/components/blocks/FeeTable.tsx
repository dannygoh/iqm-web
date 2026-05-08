import { cn } from '@/lib/utils'

interface FeeRow {
  memberType: string
  entranceFee: string
  annualSubscription: string
  notes?: string
}

interface FeeTableProps {
  rows: FeeRow[]
  className?: string
}

export function FeeTable({ rows, className }: FeeTableProps) {
  return (
    <div className={cn('overflow-x-auto rounded-lg border border-border', className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-primary text-white">
            <th className="text-left px-4 py-3 font-semibold">Membership Category</th>
            <th className="text-right px-4 py-3 font-semibold whitespace-nowrap">Entrance Fee (RM)</th>
            <th className="text-right px-4 py-3 font-semibold whitespace-nowrap">Annual Subscription (RM)</th>
            <th className="text-left px-4 py-3 font-semibold">Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={cn(
                'border-t border-border transition-colors',
                i % 2 === 0 ? 'bg-white' : 'bg-surface',
                'hover:bg-primary/5',
              )}
            >
              <td className="px-4 py-3 font-medium text-primary">{row.memberType}</td>
              <td className="px-4 py-3 text-right tabular-nums">{row.entranceFee}</td>
              <td className="px-4 py-3 text-right tabular-nums">{row.annualSubscription}</td>
              <td className="px-4 py-3 text-muted">{row.notes ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
