import type { CollectionConfig } from 'payload'

export const Consultants: CollectionConfig = {
  slug: 'consultants',
  admin: {
    useAsTitle: 'name',
    group: 'Directory',
    defaultColumns: ['name', 'registrationNumber', 'status'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'registrationNumber',
      type: 'text',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'Active',
      options: [
        { label: 'Active', value: 'Active' },
        { label: 'Inactive', value: 'Inactive' },
      ],
    },
  ],
}
