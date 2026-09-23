import { NextResponse } from 'next/server'

import { isAdminRequest } from '@/lib/adminAuth'
import { listSubmissions, storageAvailable } from '@/lib/submissions'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  if (!storageAvailable()) {
    return NextResponse.json({ error: 'storage' }, { status: 503 })
  }
  return NextResponse.json({ submissions: await listSubmissions() })
}
