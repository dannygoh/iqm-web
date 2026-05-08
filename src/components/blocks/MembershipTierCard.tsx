import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MembershipTierCardProps {
  grade: string
  requirements: string[]
  highlight?: boolean
  className?: string
}

export function MembershipTierCard({
  grade,
  requirements,
  highlight = false,
  className,
}: MembershipTierCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border p-6 flex flex-col gap-4',
        highlight
          ? 'border-accent bg-accent/5'
          : 'border-border bg-white',
        className,
      )}
    >
      <div className={cn('font-display text-xl', highlight ? 'text-accent' : 'text-primary')}>
        {grade}
      </div>
      <ul className="space-y-2">
        {requirements.map((req, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
            <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
            {req}
          </li>
        ))}
      </ul>
    </div>
  )
}
