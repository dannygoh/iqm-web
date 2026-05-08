/**
 * Static gallery data from migrated Drupal photos.
 * These albums are served from public/media/gallery/ without needing Payload CMS.
 * New albums should be added via the Payload admin UI.
 */

export interface StaticImage {
  url: string
  alt: string
  width: number
  height: number
}

export interface StaticAlbum {
  id: string
  title: string
  description?: string
  images: StaticImage[]
}

const AGM_36_IMAGES: StaticImage[] = [
  { url: '/media/gallery/2017-12/1.jpg', alt: 'IQM 36th AGM', width: 1200, height: 800 },
  { url: '/media/gallery/2017-12/2.jpg', alt: 'IQM 36th AGM', width: 1200, height: 800 },
]

const ACTIVITIES_2017_IMAGES: StaticImage[] = [
  { url: '/media/gallery/2017-08/1.jpg', alt: 'IQM Activity 2017', width: 1200, height: 800 },
  { url: '/media/gallery/2017-08/2.jpg', alt: 'IQM Activity 2017', width: 1200, height: 800 },
  { url: '/media/gallery/2017-08/3.jpg', alt: 'IQM Activity 2017', width: 1200, height: 800 },
  { url: '/media/gallery/2017-08/4.jpg', alt: 'IQM Activity 2017', width: 1200, height: 800 },
  { url: '/media/gallery/2017-08/FoodTech170.jpg', alt: 'Food Technology', width: 1200, height: 800 },
  { url: '/media/gallery/2017-08/MedicalDevice170.jpg', alt: 'Medical Device', width: 1200, height: 800 },
  { url: '/media/gallery/2017-08/MedicalLaboratory170.jpg', alt: 'Medical Laboratory', width: 1200, height: 800 },
  { url: '/media/gallery/2017-08/Pharmaceutical-Laboratory170.jpg', alt: 'Pharmaceutical Laboratory', width: 1200, height: 800 },
  { url: '/media/gallery/2017-08/WaterQuality170.jpg', alt: 'Water Quality', width: 1200, height: 800 },
  { url: '/media/gallery/2017-08/power_plant170.jpg', alt: 'Power Plant', width: 1200, height: 800 },
]

export const STATIC_ALBUMS: StaticAlbum[] = [
  {
    id: 'agm-36',
    title: 'IQM 36th AGM',
    description: 'Annual General Meeting photographs',
    images: AGM_36_IMAGES,
  },
  {
    id: 'activities-2017',
    title: 'IQM Activities 2017',
    description: 'Quality sector activities and programmes',
    images: ACTIVITIES_2017_IMAGES,
  },
]

export function getStaticAlbum(id: string): StaticAlbum | undefined {
  return STATIC_ALBUMS.find((a) => a.id === id)
}
