import { cn } from '@/lib/utils'
import { Download } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface ProgrammeCardProps {
  icon?: LucideIcon
  title: string
  description: string
  downloadUrl?: string
  downloadLabel?: string
  className?: string
}

export function ProgrammeCard({
  icon: Icon,
  title,
  description,
  downloadUrl,
  downloadLabel = 'Download',
  className,
}: ProgrammeCardProps) {
  return (
    <div className={cn('bg-white border border-border rounded-lg p-6 flex flex-col gap-4 hover:shadow-md transition-shadow', className)}>
      {Icon && (
        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      )}
      <div>
        <h3 className="font-semibold text-primary text-base">{title}</h3>
        <p className="mt-1 text-muted text-sm leading-relaxed">{description}</p>
      </div>
      {downloadUrl && (
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-light transition-colors"
        >
          <Download className="w-4 h-4" />
          {downloadLabel}
        </a>
      )}
    </div>
  )
}
