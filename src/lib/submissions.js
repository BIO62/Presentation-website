// Холбоо барих формын хүсэлтүүдийг хадгалах давхарга.
// Production: Upstash Redis (Vercel Marketplace-ээс холбоход env нь автоматаар орно).
// Local dev: .data/submissions.json файл.

import { randomUUID } from 'crypto'
import { promises as fs } from 'fs'
import path from 'path'

const INDEX_KEY = 'ti:submissions'
const itemKey = (id) => `ti:submission:${id}`
const MAX_ITEMS = 2000

export const STATUSES = ['new', 'read', 'done']
export const INQUIRY_TYPES = ['dealer', 'wholesale', 'academy', 'hr', 'other']

function redisConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  return url && token ? { url, token } : null
}

export function storageAvailable() {
  return Boolean(redisConfig()) || process.env.NODE_ENV !== 'production'
}

async function redis(commands) {
  const { url, token } = redisConfig()
  const res = await fetch(`${url}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Redis error ${res.status}`)
  const results = await res.json()
  const failed = results.find((r) => r.error)
  if (failed) throw new Error(failed.error)
  return results.map((r) => r.result)
}

// --- Local файл (зөвхөн development) ---
const FILE = path.join(process.cwd(), '.data', 'submissions.json')

async function readFile() {
  try {
    return JSON.parse(await fs.readFile(FILE, 'utf8'))
  } catch {
    return []
  }
}

async function writeFile(items) {
  await fs.mkdir(path.dirname(FILE), { recursive: true })
  await fs.writeFile(FILE, JSON.stringify(items, null, 2))
}

// --- Нийтийн API ---
export async function createSubmission(data) {
  const submission = {
    id: randomUUID(),
    createdAt: Date.now(),
    status: 'new',
    starred: false,
    ...data,
  }

  if (redisConfig()) {
    await redis([
      ['SET', itemKey(submission.id), JSON.stringify(submission)],
      ['ZADD', INDEX_KEY, submission.createdAt, submission.id],
    ])
  } else {
    const items = await readFile()
    await writeFile([submission, ...items].slice(0, MAX_ITEMS))
  }
  return submission
}

export async function listSubmissions() {
  if (redisConfig()) {
    const [ids] = await redis([['ZRANGE', INDEX_KEY, 0, MAX_ITEMS - 1, 'REV']])
    if (!ids?.length) return []
    const [values] = await redis([['MGET', ...ids.map(itemKey)]])
    return values.filter(Boolean).map((v) => JSON.parse(v))
  }
  return readFile()
}

export async function updateSubmission(id, patch) {
  const allowed = {}
  if (STATUSES.includes(patch.status)) allowed.status = patch.status
  if (typeof patch.starred === 'boolean') allowed.starred = patch.starred

  if (redisConfig()) {
    const [raw] = await redis([['GET', itemKey(id)]])
    if (!raw) return null
    const updated = { ...JSON.parse(raw), ...allowed }
    await redis([['SET', itemKey(id), JSON.stringify(updated)]])
    return updated
  }

  const items = await readFile()
  const index = items.findIndex((item) => item.id === id)
  if (index === -1) return null
  items[index] = { ...items[index], ...allowed }
  await writeFile(items)
  return items[index]
}

export async function deleteSubmission(id) {
  if (redisConfig()) {
    await redis([
      ['DEL', itemKey(id)],
      ['ZREM', INDEX_KEY, id],
    ])
    return true
  }
  const items = await readFile()
  await writeFile(items.filter((item) => item.id !== id))
  return true
}
