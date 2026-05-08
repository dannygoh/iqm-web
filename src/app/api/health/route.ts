import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export async function GET() {
  const checks: Record<string, 'ok' | 'error'> = {}
  let httpStatus = 200

  // Database connectivity
  try {
    const payload = await getPayloadClient()
    await payload.find({ collection: 'users', limit: 1 })
    checks.database = 'ok'
  } catch {
    checks.database = 'error'
    httpStatus = 503
  }

  return NextResponse.json(
    {
      status: httpStatus === 200 ? 'healthy' : 'degraded',
      version: process.env.npm_package_version ?? 'unknown',
      timestamp: new Date().toISOString(),
      checks,
    },
    { status: httpStatus },
  )
}
