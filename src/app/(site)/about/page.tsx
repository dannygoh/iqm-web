import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import { PageHero } from '@/components/blocks/PageHero'

export const metadata: Metadata = pageMetadata(
  'About IQM',
  'Learn about the Institute of Quality Malaysia — our history, mission, and commitment to promoting quality excellence.',
)

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About IQM"
        breadcrumbs={[{ label: 'About IQM' }]}
      />

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <section className="prose prose-slate max-w-none">
          <h2 className="font-display text-2xl text-primary font-normal border-b border-border pb-3">
            Who We Are
          </h2>
          <p className="text-foreground/80 leading-relaxed mt-4">
            The Institute of Quality Malaysia (IQM) is a non-profit professional membership
            body established to promote quality excellence and professionalism in Malaysia.
            IQM provides a platform for quality practitioners across industries to network,
            develop, and advance their knowledge and skills.
          </p>
          <p className="text-foreground/80 leading-relaxed mt-4">
            We serve as the national body for quality professionals — bringing together
            individuals and organisations committed to quality improvement in the Malaysian
            private and public sectors.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-primary font-normal border-b border-border pb-3">
            Our Mission
          </h2>
          <div className="mt-4 grid sm:grid-cols-3 gap-6">
            {[
              {
                title: 'Promote',
                body: 'Promote quality culture and awareness across all sectors of Malaysia.',
              },
              {
                title: 'Develop',
                body: 'Develop quality professionals through training, certification, and recognition programmes.',
              },
              {
                title: 'Connect',
                body: 'Connect quality practitioners, industry, and government to drive continuous improvement.',
              },
            ].map(({ title, body }) => (
              <div key={title} className="bg-surface rounded-lg p-5 border border-border">
                <div className="w-8 h-1 bg-gold mb-3 rounded-full" />
                <h3 className="font-semibold text-primary">{title}</h3>
                <p className="mt-1 text-sm text-foreground/70 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl text-primary font-normal border-b border-border pb-3">
            History
          </h2>
          <p className="text-foreground/80 leading-relaxed mt-4">
            IQM was founded in 1984 and has since grown into a respected professional body
            with members from both the public and private sectors. Over the decades, IQM
            has developed and administered the Malaysian Register of Certified Auditors (MRCA)
            scheme and numerous quality professional development programmes.
          </p>
        </section>
      </div>
    </>
  )
}
