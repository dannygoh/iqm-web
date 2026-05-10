import type { ReactNode } from 'react'
import { RootLayout } from '@payloadcms/next/layouts'
import config from '@payload-config'
import { importMap } from './importMap.js'
import { serverFn } from './serverFunctions'
import '@payloadcms/next/css'
import './admin.css'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <RootLayout config={config} importMap={importMap} serverFunction={serverFn as any}>
      {children}
    </RootLayout>
  )
}
