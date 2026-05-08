import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap.js'

type PageProps = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generateMetadata = (props: PageProps) => generatePageMetadata(props as any)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page(props: PageProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return RootPage({ ...(props as any), importMap })
}
