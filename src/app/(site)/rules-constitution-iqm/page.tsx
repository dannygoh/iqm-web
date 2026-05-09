import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { PageHero } from '@/components/blocks/PageHero'
import { FileText, Download } from 'lucide-react'

export const metadata: Metadata = pageMetadata(
  'Rules & Constitution',
  'The Rules and Constitution of the Institute of Quality Malaysia, approved by the membership.',
)

export default function RulesPage() {
  return (
    <>
      <PageHero
        title="Rules & Constitution of IQM"
        breadcrumbs={[{ label: 'About', href: '/about' }, { label: 'Rules & Constitution' }]}
      />
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <p className="text-foreground/80 leading-relaxed">
          The Rules and Constitution of the Institute of Quality Malaysia was approved by members
          at the 18th Annual General Meeting held on 25th April 1998 and the Extraordinary General
          Meeting held on 7th November 1998.
        </p>
        <div className="bg-surface border border-border rounded-lg p-6 flex items-center gap-6">
          <div className="flex-shrink-0 w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-primary">Rules &amp; Constitution of IQM</p>
            <p className="text-muted text-sm mt-0.5">PDF document</p>
          </div>
          <a
            href="/files/circulars/Rule-8-Code-of-Conduct-2012-11-24.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </a>
        </div>
        <div className="bg-surface border border-border rounded-lg p-6 flex items-center gap-6">
          <div className="flex-shrink-0 w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-primary">Rule 8 — Code of Conduct</p>
            <p className="text-muted text-sm mt-0.5">All IQM members are to abide and act according to this Code of Conduct. — PDF document</p>
          </div>
          <a
            href="/files/circulars/Rule-8-Code-of-Conduct-2012-11-24.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </a>
        </div>
      </div>
    </>
  )
}
