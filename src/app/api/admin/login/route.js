import { NextResponse } from 'next/server'

import {
  ADMIN_COOKIE,
  checkCredentials,
  createSessionToken,
  sessionCookieOptions,
} from '@/lib/adminAuth'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  let body = {}
  try {
    body = await request.json()
  } catch {}

  if (!(await checkCredentials(body.username, body.password))) {
    // Нууц үг таах оролдлогыг удаашруулна
    await new Promise((resolve) => setTimeout(resolve, 600))
    return NextResponse.json({ error: 'invalid' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_COOKIE, await createSessionToken(), sessionCookieOptions)
  return response
}
