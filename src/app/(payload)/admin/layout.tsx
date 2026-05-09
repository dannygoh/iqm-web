import type { ReactNode } from 'react'
import type { ServerFunctionClient } from 'payload'
import { RootLayout } from '@payloadcms/next/layouts'
import { handleServerFunctions } from '@payloadcms/next/layouts'
import config from '@payload-config'
import { importMap } from './importMap.js'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={handleServerFunctions as unknown as ServerFunctionClient}
    >
      {children}
    </RootLayout>
  )
}
