#!/usr/bin/env tsx
/**
 * Migration script: Drupal SQL dump → Payload CMS
 *
 * Run: npm run migrate
 * Requires: DATABASE_URI and PAYLOAD_SECRET env vars, and a running Postgres instance.
 *
 * Extracts iqm_member, mrca_auditor, mrca_consultant nodes from the Drupal dump
 * and creates them via the Payload local API.
 */
import fs from 'fs'
import path from 'path'
import zlib from 'zlib'
import { createInterface } from 'readline'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const DUMP_PATH = path.resolve(import.meta.dirname, '../db-export.sql.gz')

// ── Member type NID → label mapping ──────────────────────────────────────
const MEMBER_TYPE_MAP: Record<number, string> = {
  24: 'Honorary Fellow',
  25: 'Life',
  26: 'Student',
  27: 'Affiliate',
  28: 'Associate',
  29: 'Company',
  30: 'Fellow',
  31: 'Member',
}

// ── Read entire dump into lines ───────────────────────────────────────────
async function readLines(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const lines: string[] = []
    const stream = fs.createReadStream(DUMP_PATH).pipe(zlib.createGunzip())
    const rl = createInterface({ input: stream })
    rl.on('line', (line) => lines.push(line))
    rl.on('close', () => resolve(lines))
    rl.on('error', reject)
  })
}

interface RawNode { nid: string; title: string }
interface MemberRow { name: string; memberType: string; status: 'Active' | 'Inactive' }
interface AuditorRow { name: string; grade: string; registrationNumber: string; status: 'Active' | 'Inactive' }
interface ConsultantRow { name: string; registrationNumber: string; status: 'Active' | 'Inactive' }

function parseNodes(lines: string[]): Map<string, RawNode> {
  const nodes = new Map<string, RawNode>()
  let active = false
  for (const line of lines) {
    if (line.includes('INSERT INTO `node_field_data`')) { active = true; continue }
    if (!active) continue
    const m = line.match(/^\(\s*(\d+),\s*\d+,'([^']+)','[^']+',\d+,'(.*?)',/)
    if (m) nodes.set(m[1], { nid: m[1], title: m[3] })
    if (!line.trim() || (line.trim().startsWith('INSERT') && !line.includes('node_field_data'))) active = false
  }
  return nodes
}

function parseField(lines: string[], table: string): Map<string, string> {
  const map = new Map<string, string>()
  let active = false
  for (const line of lines) {
    if (line.includes(`INSERT INTO \`${table}\``)) { active = true; continue }
    if (!active) continue
    // Format: ('bundle',deleted,entity_id,rev_id,'lang',delta,value)
    const m = line.match(/^\('[^']+',\d+,(\d+),\d+,'[^']+',\d+,(.+)\),?$/)
    if (m) {
      const nid = m[1]
      const raw = m[2].replace(/^'|'$/g, '').replace(/\\'/g, "'")
      if (!map.has(nid)) map.set(nid, raw)
    }
    if (!line.trim() || (line.trim().startsWith('INSERT') && !line.includes(table))) active = false
  }
  return map
}

async function extract(lines: string[]) {
  const nodes = parseNodes(lines)
  const memberTypes = parseField(lines, 'node__field_member_type')
  const grades      = parseField(lines, 'node__field_grade_type')
  const certNos     = parseField(lines, 'node__field_certificate_no')
  const actives     = parseField(lines, 'node__field_active')

  const members: MemberRow[] = []
  const auditors: AuditorRow[] = []
  const consultants: ConsultantRow[] = []

  for (const [nid, node] of nodes) {
    const name = node.title.trim()
    if (!name || name === 'z') continue

    const active = actives.get(nid) !== '0' // default active if field missing

    // Determine type by inspecting related fields
    if (grades.has(nid)) {
      // mrca_auditor
      auditors.push({
        name,
        grade: grades.get(nid) ?? 'Auditor',
        registrationNumber: certNos.get(nid) ?? '',
        status: (active ? 'Active' : 'Inactive') as 'Active' | 'Inactive',
      })
    } else if (memberTypes.has(nid) && !grades.has(nid) && !certNos.has(nid)) {
      // mrca_consultant (has certNo but no grade) OR iqm_member
      // Check if they have certNo without grade → consultant
      if (certNos.has(nid)) {
        consultants.push({
          name,
          registrationNumber: certNos.get(nid) ?? '',
          status: (active ? 'Active' : 'Inactive') as 'Active' | 'Inactive',
        })
      } else {
        const typeId = parseInt(memberTypes.get(nid) ?? '0', 10)
        const memberType = MEMBER_TYPE_MAP[typeId] ?? 'Member'
        members.push({
          name,
          memberType,
          status: (active ? 'Active' : 'Inactive') as 'Active' | 'Inactive',
        })
      }
    } else if (certNos.has(nid) && !grades.has(nid)) {
      // consultant (cert number but no grade)
      consultants.push({
        name,
        registrationNumber: certNos.get(nid) ?? '',
        status: (active ? 'Active' : 'Inactive') as 'Active' | 'Inactive',
      })
    } else if (memberTypes.has(nid)) {
      const typeId = parseInt(memberTypes.get(nid) ?? '0', 10)
      const memberType = MEMBER_TYPE_MAP[typeId] ?? 'Member'
      members.push({
        name,
        memberType,
        status: (active ? 'Active' : 'Inactive') as 'Active' | 'Inactive',
      })
    }
  }

  return { members, auditors, consultants }
}

async function seed(
  payload: Awaited<ReturnType<typeof getPayload>>,
  data: { members: MemberRow[]; auditors: AuditorRow[]; consultants: ConsultantRow[] }
) {
  console.log(`\nSeeding ${data.members.length} members…`)
  let ok = 0
  for (const row of data.members) {
    try {
      await payload.create({ collection: 'members', data: row })
      ok++
    } catch { /* skip dupes */ }
  }
  console.log(`  ✓ ${ok} members created`)

  console.log(`Seeding ${data.auditors.length} auditors…`)
  ok = 0
  for (const row of data.auditors) {
    try {
      await payload.create({ collection: 'auditors', data: row })
      ok++
    } catch { /* skip dupes */ }
  }
  console.log(`  ✓ ${ok} auditors created`)

  console.log(`Seeding ${data.consultants.length} consultants…`)
  ok = 0
  for (const row of data.consultants) {
    try {
      await payload.create({ collection: 'consultants', data: row })
      ok++
    } catch { /* skip dupes */ }
  }
  console.log(`  ✓ ${ok} consultants created`)
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')

  console.log('Reading SQL dump…')
  const lines = await readLines()
  console.log(`  ${lines.length.toLocaleString()} lines read`)

  console.log('Extracting records…')
  const data = await extract(lines)
  console.log(`  Members:     ${data.members.length}`)
  console.log(`  Auditors:    ${data.auditors.length}`)
  console.log(`  Consultants: ${data.consultants.length}`)

  // Always write JSON output for reference
  const outDir = path.resolve(import.meta.dirname, '../.migration-data')
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'members.json'), JSON.stringify(data.members, null, 2))
  fs.writeFileSync(path.join(outDir, 'auditors.json'), JSON.stringify(data.auditors, null, 2))
  fs.writeFileSync(path.join(outDir, 'consultants.json'), JSON.stringify(data.consultants, null, 2))
  console.log(`  JSON written to .migration-data/`)

  if (dryRun) {
    console.log('\nDry run — skipping database seed.')
    console.log('Sample members:', data.members.slice(0, 3))
    console.log('Sample auditors:', data.auditors.slice(0, 3))
    console.log('Sample consultants:', data.consultants.slice(0, 3))
    return
  }

  console.log('\nConnecting to Payload…')
  const payload = await getPayload({ config })
  await seed(payload, data)
  console.log('\nMigration complete.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
