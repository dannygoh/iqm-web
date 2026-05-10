'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryImage {
  url: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

interface GalleryGridProps {
  images: GalleryImage[]
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  function prev() {
    setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null))
  }

  function next() {
    setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null))
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') setLightboxIndex(null)
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }

  const active = lightboxIndex !== null ? images[lightboxIndex] : null

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="relative aspect-square overflow-hidden rounded-lg bg-surface hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2"
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Previous"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <div
            className="max-w-4xl max-h-[80vh] px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.url}
              alt={active.alt}
              width={active.width ?? 1200}
              height={active.height ?? 800}
              className="object-contain max-h-[70vh] w-auto mx-auto"
            />
            {active.caption && (
              <p className="text-white/70 text-sm text-center mt-3">{active.caption}</p>
            )}
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2"
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Next"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          <div className="absolute bottom-4 text-white/50 text-sm">
            {(lightboxIndex ?? 0) + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}
