import type { CollectionConfig } from 'payload'

export const Members: CollectionConfig = {
  slug: 'members',
  admin: {
    useAsTitle: 'name',
    group: 'Directory',
    defaultColumns: ['name', 'memberType', 'status'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'memberType',
      type: 'select',
      required: true,
      options: [
        { label: 'Fellow', value: 'Fellow' },
        { label: 'Member', value: 'Member' },
        { label: 'Associate', value: 'Associate' },
        { label: 'Affiliate', value: 'Affiliate' },
        { label: 'Student', value: 'Student' },
        { label: 'Company', value: 'Company' },
        { label: 'Life', value: 'Life' },
        { label: 'Honorary Fellow', value: 'Honorary Fellow' },
      ],
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
