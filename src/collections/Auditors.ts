import type { CollectionConfig } from 'payload'

export const Auditors: CollectionConfig = {
  slug: 'auditors',
  admin: {
    useAsTitle: 'name',
    group: 'Directory',
    defaultColumns: ['name', 'grade', 'registrationNumber', 'status'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'grade',
      type: 'select',
      required: true,
      options: [
        { label: 'Principal Auditor', value: 'Principal Auditor' },
        { label: 'Lead Auditor', value: 'Lead Auditor' },
        { label: 'Senior Auditor', value: 'Senior Auditor' },
        { label: 'Auditor', value: 'Auditor' },
        { label: 'Provisional Auditor', value: 'Provisional Auditor' },
        { label: 'Internal Quality Auditor', value: 'Internal Quality Auditor' },
      ],
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
