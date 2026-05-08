import type { CollectionConfig } from 'payload'

export const Documents: CollectionConfig = {
  slug: 'documents',
  admin: {
    useAsTitle: 'name',
    group: 'Content',
    defaultColumns: ['name', 'category', 'updatedAt'],
  },
  upload: {
    staticDir: '../public/files',
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Membership Forms', value: 'Membership Forms' },
        { label: 'MRCA Documents', value: 'MRCA Documents' },
        { label: 'Circulars', value: 'Circulars' },
        { label: 'Programmes', value: 'Programmes' },
        { label: 'Announcements', value: 'Announcements' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
}
