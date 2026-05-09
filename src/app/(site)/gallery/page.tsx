import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/metadata'
import Link from 'next/link'
import Image from 'next/image'
import { PageHero } from '@/components/blocks/PageHero'
import { getPayloadClient } from '@/lib/payload'
import { STATIC_ALBUMS, type StaticAlbum } from '@/lib/gallery-static'
import { ImageIcon } from 'lucide-react'

export const metadata: Metadata = pageMetadata(
  'Gallery',
  'Photo gallery from IQM events and activities.',
)

export const revalidate = 3600

type AlbumCard = {
  id: string
  title: string
  description?: string
  thumbUrl?: string
  count: number
}

export default async function GalleryPage() {
  const albums: AlbumCard[] = []

  // Load from Payload CMS first
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: 'gallery-albums', limit: 50 })
    for (const doc of result.docs) {
      const images = (doc.images as Array<{ image: { url?: string } }> | null) ?? []
      albums.push({
        id: String(doc.id),
        title: String(doc.title ?? ''),
        description: doc.description ? String(doc.description) : undefined,
        thumbUrl: images[0]?.image?.url,
        count: images.length,
      })
    }
  } catch {
    // DB unavailable — fall through to static
  }

  // Merge in static albums (Drupal-migrated) that aren't already in Payload
  const payloadIds = new Set(albums.map((a) => a.id))
  for (const sa of STATIC_ALBUMS) {
    if (!payloadIds.has(sa.id)) {
      albums.push({
        id: sa.id,
        title: sa.title,
        description: sa.description,
        thumbUrl: sa.images[0]?.url,
        count: sa.images.length,
      })
    }
  }

  return (
    <>
      <PageHero title="Gallery" breadcrumbs={[{ label: 'Gallery' }]} />
      <div className="max-w-6xl mx-auto px-6 py-12">
        {albums.length === 0 ? (
          <div className="text-center py-16 text-muted">
            <ImageIcon className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No gallery albums yet.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {albums.map((album) => (
              <Link
                key={album.id}
                href={`/gallery/${album.id}`}
                className="group block bg-white border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-video bg-surface">
                  {album.thumbUrl ? (
                    <Image
                      src={album.thumbUrl}
                      alt={album.title}
                      fill
                      className="object-cover group-hover:opacity-90 transition-opacity"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-muted/40" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h2 className="font-semibold text-primary text-sm group-hover:text-accent transition-colors">
                    {album.title}
                  </h2>
                  {album.description && (
                    <p className="text-muted text-xs mt-1 line-clamp-2">{album.description}</p>
                  )}
                  <p className="text-xs text-muted mt-1">
                    {album.count} photo{album.count !== 1 ? 's' : ''}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
