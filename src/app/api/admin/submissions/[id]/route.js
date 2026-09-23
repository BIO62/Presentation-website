import { NextResponse } from 'next/server'

import { isAdminRequest } from '@/lib/adminAuth'
import { deleteSubmission, updateSubmission } from '@/lib/submissions'

export const dynamic = 'force-dynamic'

export async function PATCH(request, { params }) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  let body = {}
  try {
    body = await request.json()
  } catch {}

  const updated = await updateSubmission(params.id, body)
  if (!updated) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }
  return NextResponse.json({ submission: updated })
}

export async function DELETE(request, { params }) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  await deleteSubmission(params.id)
  return NextResponse.json({ ok: true })
}
