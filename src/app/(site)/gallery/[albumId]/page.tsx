import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/blocks/PageHero'
import { GalleryGrid } from '@/components/blocks/GalleryGrid'
import { getPayloadClient } from '@/lib/payload'
import { getStaticAlbum, type StaticImage } from '@/lib/gallery-static'

type Props = {
  params: Promise<{ albumId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { albumId } = await params
  const staticAlbum = getStaticAlbum(albumId)
  if (staticAlbum) {
    return { title: staticAlbum.title, description: staticAlbum.description }
  }
  try {
    const payload = await getPayloadClient()
    const album = await payload.findByID({ collection: 'gallery-albums', id: albumId })
    return {
      title: String(album.title ?? 'Gallery'),
      description: album.description ? String(album.description) : undefined,
    }
  } catch {
    return { title: 'Gallery' }
  }
}

export const dynamic = 'force-dynamic'

export default async function AlbumPage({ params }: Props) {
  const { albumId } = await params

  let title = ''
  let description: string | undefined
  let images: StaticImage[] = []

  // 1. Try static albums (migrated Drupal photos)
  const staticAlbum = getStaticAlbum(albumId)
  if (staticAlbum) {
    title = staticAlbum.title
    description = staticAlbum.description
    images = staticAlbum.images
  } else {
    // 2. Try Payload CMS
    try {
      const payload = await getPayloadClient()
      const album = await payload.findByID({ collection: 'gallery-albums', id: albumId })
      title = String(album.title ?? '')
      description = album.description ? String(album.description) : undefined
      images = ((album.images as Array<{ image: { url?: string; alt?: string; width?: number; height?: number } | null }>) ?? [])
        .map((item) => ({
          url: item.image?.url ?? '',
          alt: item.image?.alt ?? title,
          width: item.image?.width ?? 1200,
          height: item.image?.height ?? 800,
        }))
        .filter((img) => img.url)
    } catch {
      notFound()
    }
  }

  if (!title) notFound()

  return (
    <>
      <PageHero
        title={title}
        subtitle={description}
        breadcrumbs={[{ label: 'Gallery', href: '/gallery' }, { label: title }]}
      />
      <div className="max-w-7xl mx-auto px-6 py-10">
        {images.length === 0 ? (
          <p className="text-center text-muted py-16">No images in this album yet.</p>
        ) : (
          <>
            <p className="text-sm text-muted mb-6">
              {images.length} photo{images.length !== 1 ? 's' : ''}
            </p>
            <GalleryGrid images={images} />
          </>
        )}
      </div>
    </>
  )
}
