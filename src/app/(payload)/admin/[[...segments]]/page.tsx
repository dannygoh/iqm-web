import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import config from '@payload-config'
import { importMap } from '../importMap.js'

type PageProps = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export const generateMetadata = (props: PageProps) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generatePageMetadata({ config, params: props.params } as any)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (props: PageProps) => RootPage({ ...props, config, importMap } as any)
