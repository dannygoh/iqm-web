import { FileText, FileDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Doc {
  name: string
  url: string
  description?: string
  fileType?: 'pdf' | 'doc' | 'other'
}

interface DocumentListProps {
  documents: Doc[]
  className?: string
}

export function DocumentList({ documents, className }: DocumentListProps) {
  return (
    <ul className={cn('divide-y divide-border', className)}>
      {documents.map((doc, i) => (
        <li key={i} className="flex items-center gap-4 py-3">
          <div className="flex-shrink-0 w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-sm font-medium text-foreground">{doc.name}</span>
            {doc.description && (
              <p className="text-xs text-muted truncate">{doc.description}</p>
            )}
          </div>
          <a
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-light transition-colors"
          >
            <FileDown className="w-4 h-4" />
            Download
          </a>
        </li>
      ))}
    </ul>
  )
}
