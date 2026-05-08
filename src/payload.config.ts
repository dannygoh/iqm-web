import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { Users } from './collections/Users'
import { Pages } from './collections/Pages'
import { Announcements } from './collections/Announcements'
import { GalleryAlbums } from './collections/GalleryAlbums'
import { Documents } from './collections/Documents'
import { Events } from './collections/Events'
import { Members } from './collections/Members'
import { Auditors } from './collections/Auditors'
import { Consultants } from './collections/Consultants'
import { Media } from './collections/Media'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Pages,
    Announcements,
    GalleryAlbums,
    Documents,
    Events,
    Members,
    Auditors,
    Consultants,
    Media,
  ],
  globals: [SiteSettings],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    // push: true creates all tables from config on startup (idempotent).
    // Switch to false and use `payload migrate` once schema is stable.
    push: true,
  }),
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  upload: {
    limits: {
      fileSize: 20_000_000,
    },
  },
})
