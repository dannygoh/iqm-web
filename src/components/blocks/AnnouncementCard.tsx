import Link from 'next/link'
import { FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Attachment {
  label?: string
  url: string
}

interface AnnouncementCardProps {
  title: string
  date: string
  excerpt?: string
  attachments?: Attachment[]
  className?: string
}

export function AnnouncementCard({
  title,
  date,
  excerpt,
  attachments,
  className,
}: AnnouncementCardProps) {
  const [year, month, day] = date.split('-')
  const formatted = new Date(date).toLocaleDateString('en-MY', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <article className={cn('bg-white border border-border rounded-lg p-6 flex gap-5', className)}>
      {/* Date badge */}
      <div className="flex-shrink-0 flex flex-col items-center justify-start bg-accent text-white rounded-md w-14 h-16 pt-2">
        <span className="text-xl font-bold leading-none">{day}</span>
        <span className="text-xs uppercase tracking-wide mt-0.5">
          {new Date(date).toLocaleDateString('en-MY', { month: 'short' })}
        </span>
        <span className="text-xs opacity-80">{year}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-primary text-base leading-snug">{title}</h3>
        {excerpt && (
          <p className="mt-1 text-muted text-sm line-clamp-2">{excerpt}</p>
        )}
        {attachments && attachments.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {attachments.map((att, i) => (
              <a
                key={i}
                href={att.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-light font-medium transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                {att.label || 'Download'}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
