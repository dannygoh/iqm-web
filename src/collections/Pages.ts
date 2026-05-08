import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL path, e.g. "about" or "types-membership"',
      },
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      admin: {
        description: 'Used for SEO meta description (150–160 chars)',
      },
    },
  ],
}
