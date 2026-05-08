import type { CollectionConfig } from 'payload'

export const Announcements: CollectionConfig = {
  slug: 'announcements',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'date', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'attachments',
      type: 'array',
      label: 'Attachments',
      fields: [
        {
          name: 'file',
          type: 'upload',
          relationTo: 'documents',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
        },
      ],
    },
  ],
}
