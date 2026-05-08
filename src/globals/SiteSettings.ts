import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Admin',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'orgName',
      type: 'text',
      defaultValue: 'Institute of Quality Malaysia',
    },
    {
      name: 'tagline',
      type: 'text',
    },
    {
      name: 'address',
      type: 'textarea',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'fax',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
    },
  ],
}
