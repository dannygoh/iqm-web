import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { getPayload } from 'payload'
import config from '@payload-config'
import { importMap } from '../importMap.js'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export const generateMetadata = ({ params, searchParams }: Args) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generatePageMetadata({ config, params, searchParams } as any)

export default async function Page({ params, searchParams }: Args) {
  // Prime the Payload React.cache singleton before RootPage's initReq runs,
  // preventing 'Cannot destructure config of undefined' in partialReqCache.get().
  await getPayload({ config })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return RootPage({ config, importMap, params, searchParams } as any)
}
