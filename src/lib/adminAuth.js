// Админ нэвтрэлтийн session token — Web Crypto ашигладаг тул middleware (edge)
// болон API route (node) хоёуланд ажиллана.

export const ADMIN_COOKIE = 'ti_admin'
const SESSION_SECONDS = 60 * 60 * 12 // 12 цаг

const isDev = process.env.NODE_ENV !== 'production'

export function getAdminCredentials() {
  const username = process.env.ADMIN_USERNAME || (isDev ? 'admin' : '')
  const password = process.env.ADMIN_PASSWORD || (isDev ? 'admin' : '')
  return { username, password }
}

function getSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    (isDev ? 'dev-only-secret' : '')
  )
}

function toBase64Url(buffer) {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function hmac(value) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value))
  return toBase64Url(signature)
}

// Урт нь ижил эсэхээс үл хамааран тогтмол хугацаанд харьцуулна
async function safeEqual(a, b) {
  const [ha, hb] = await Promise.all([hmac(`cmp:${a}`), hmac(`cmp:${b}`)])
  let diff = 0
  for (let i = 0; i < ha.length; i++) diff |= ha.charCodeAt(i) ^ hb.charCodeAt(i)
  return diff === 0
}

export async function checkCredentials(username, password) {
  const creds = getAdminCredentials()
  if (!creds.username || !creds.password || !getSecret()) return false
  const [userOk, passOk] = await Promise.all([
    safeEqual(String(username ?? ''), creds.username),
    safeEqual(String(password ?? ''), creds.password),
  ])
  return userOk && passOk
}

export async function createSessionToken() {
  const exp = Math.floor(Date.now() / 1000) + SESSION_SECONDS
  return `${exp}.${await hmac(`admin:${exp}`)}`
}

export async function verifySessionToken(token) {
  if (!token || !getSecret()) return false
  const [expRaw, signature] = token.split('.')
  const exp = Number(expRaw)
  if (!exp || !signature || exp < Math.floor(Date.now() / 1000)) return false
  return safeEqual(signature, await hmac(`admin:${exp}`))
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: !isDev,
  sameSite: 'strict',
  path: '/',
  maxAge: SESSION_SECONDS,
}

export async function isAdminRequest(request) {
  return verifySessionToken(request.cookies.get(ADMIN_COOKIE)?.value)
}
