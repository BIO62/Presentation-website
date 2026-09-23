import { NextResponse } from 'next/server'

import { createSubmission, INQUIRY_TYPES, storageAvailable } from '@/lib/submissions'

export const dynamic = 'force-dynamic'

const LIMITS = { name: 120, email: 200, company: 200, phone: 40, message: 5000 }

function clean(value, max) {
  return String(value ?? '').trim().slice(0, max)
}

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }

  // Honeypot: бот энэ нуусан талбарыг бөглөдөг — амжилттай мэт хариулаад хаяна
  if (body.website) {
    return NextResponse.json({ ok: true })
  }

  const data = {
    name: clean(body.name, LIMITS.name),
    email: clean(body.email, LIMITS.email),
    company: clean(body.company, LIMITS.company),
    phone: clean(body.phone, LIMITS.phone),
    message: clean(body.message, LIMITS.message),
    inquiry: INQUIRY_TYPES.includes(body.inquiry) ? body.inquiry : 'other',
    lang: ['mn', 'ru', 'en'].includes(body.lang) ? body.lang : 'mn',
  }

  if (!data.name || (!data.email && !data.phone)) {
    return NextResponse.json({ error: 'required' }, { status: 422 })
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return NextResponse.json({ error: 'email' }, { status: 422 })
  }
  if (!storageAvailable()) {
    return NextResponse.json({ error: 'storage' }, { status: 503 })
  }

  try {
    await createSubmission(data)
  } catch (error) {
    console.error('Contact submission failed', error)
    return NextResponse.json({ error: 'server' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
