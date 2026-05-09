import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { PageHero } from '@/components/blocks/PageHero'

export const metadata: Metadata = pageMetadata(
  'Aims & Objectives',
  'The aims and objectives of the Institute of Quality Malaysia — promoting quality advancement, education, and professional development.',
)

const AIMS = [
  {
    n: '1',
    text: 'To create, promote and stimulate interest in the advancement of quality and its application to industry and business.',
  },
  {
    n: '2',
    text: 'To hold seminars, courses and various other activities for the members and public so that it will help to broaden and upgrade their knowledge in the field concerned and to provide them with opportunity to obtain experience in the application of quality, techniques, systems and philosophy.',
  },
  {
    n: '3',
    text: 'Advisory and consultancy services to organizations on matters concerning quality and inspection.',
  },
  {
    n: '4',
    text: 'Discussion on common technical problems at meetings and technical conferences with other professionals and specialists in quality.',
  },
  {
    n: '5',
    text: 'To cooperate with universities and other educational institutions, public authorities, and industry for the furtherance of education and research in all aspects of quality, and to procure the publication of the result of any research carried out by or in conjunction with the Institute.',
  },
]

export default function AimsPage() {
  return (
    <>
      <PageHero
        title="Aims & Objectives"
        breadcrumbs={[{ label: 'About', href: '/about' }, { label: 'Aims & Objectives' }]}
      />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-foreground/80 leading-relaxed mb-10">
          The Institute of Quality Malaysia is committed to advancing quality standards and
          professional development across Malaysian industry and government. Our aims are:
        </p>
        <ol className="space-y-6">
          {AIMS.map(({ n, text }) => (
            <li key={n} className="flex gap-5">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center">
                {n}
              </span>
              <p className="text-foreground/80 leading-relaxed pt-1">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </>
  )
}
