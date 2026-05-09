import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import sharp from 'sharp'

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
  }),
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,
  // Payload email adapter — used for password resets and admin notifications.
  // Falls back silently (logs to console) if SMTP env vars are not set.
  ...(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
    ? {
        email: nodemailerAdapter({
          defaultFromAddress: process.env.SMTP_USER,
          defaultFromName: 'Institute of Quality Malaysia',
          transportOptions: {
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT ?? '465', 10),
            secure: process.env.SMTP_SECURE === 'true' || parseInt(process.env.SMTP_PORT ?? '465') === 465,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          },
        }),
      }
    : {}),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  upload: {
    limits: {
      fileSize: 20_000_000,
    },
  },
})
