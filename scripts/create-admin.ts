#!/usr/bin/env tsx
/**
 * One-shot script: create the first Payload admin user.
 * Run via migration container:
 *   npx tsx scripts/create-admin.ts admin@iqm.org.my 'Password123!'
 */
import { getPayload } from 'payload'
import config from '../src/payload.config'

const [, , email = 'admin@iqm.org.my', password = 'ChangeMe123!'] = process.argv

const payload = await getPayload({ config })

// Check if any users exist
const existing = await payload.find({ collection: 'users', limit: 1 })
if (existing.totalDocs > 0) {
  console.log('Users already exist:', existing.docs.map((u) => u.email))
  process.exit(0)
}

const user = await payload.create({
  collection: 'users',
  data: { email, password, role: 'admin' },
  overrideAccess: true,
})

console.log('Created admin user:', user.email)
process.exit(0)
