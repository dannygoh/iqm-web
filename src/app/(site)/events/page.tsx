import type { Metadata } from 'next'
import { PageHero } from '@/components/blocks/PageHero'
import { getPayloadClient } from '@/lib/payload'
import { Calendar, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Upcoming IQM events, seminars, and professional development programmes.',
}

export const revalidate = 3600 // revalidate hourly

export default async function EventsPage() {
  let events: Array<{
    id: number
    title: string
    date: string
    endDate?: string
    location?: string
  }> = []

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'events',
      sort: 'date',
      where: {
        date: { greater_than_equal: new Date().toISOString() },
      },
      limit: 20,
    })
    events = result.docs as typeof events
  } catch {
    // DB may not be available during static build
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-MY', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <>
      <PageHero
        title="Events"
        breadcrumbs={[{ label: 'Events' }]}
      />
      <div className="max-w-4xl mx-auto px-6 py-12">
        {events.length === 0 ? (
          <div className="text-center py-16 text-muted">
            <Calendar className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No upcoming events at this time. Check back soon.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {events.map((event) => (
              <article key={event.id} className="bg-white border border-border rounded-lg p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-shrink-0 bg-accent text-white rounded-md px-4 py-3 text-center min-w-[60px]">
                    <span className="text-lg font-bold leading-none block">
                      {new Date(event.date).getDate()}
                    </span>
                    <span className="text-xs uppercase tracking-wide">
                      {new Date(event.date).toLocaleDateString('en-MY', { month: 'short' })}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-semibold text-primary">{event.title}</h2>
                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(event.date)}
                        {event.endDate && event.endDate !== event.date && (
                          <> — {formatDate(event.endDate)}</>
                        )}
                      </span>
                      {event.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {event.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
