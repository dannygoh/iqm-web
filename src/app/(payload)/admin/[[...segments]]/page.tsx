import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import config from '@payload-config'
import { importMap } from '../importMap.js'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export const generateMetadata = ({ params, searchParams }: Args) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generatePageMetadata({ config, params, searchParams } as any)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page({ params, searchParams }: Args) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return RootPage({ config, importMap, params, searchParams } as any)
}
