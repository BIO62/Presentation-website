import { NextResponse } from 'next/server'

const locales = ['mn', 'ru', 'en']
const defaultLocale = 'mn'


// IP-г Улс руу орчуулах (Vercel/Cloudflare geo header ашиглана)
// Орос хэл хэрэглэдэг гол улсуудын ISO кодууд
const russianSpeakingCountries = new Set([
  'RU', // Орос
  'BY', // Беларусь
  'KZ', // Казахстан
  'KG', // Кыргызстан
  'TJ', // Тажикистан
  'UZ', // Узбекистан
  'TM', // Туркменистан
  'AM', // Армения
  'AZ', // Азербайжан
  'GE', // Гүрж
  'UA', // Украйн
  'MD', // Молдов
])

function getLocaleFromRequest(request) {
  // 1. Cookie шалгах (хэрэглэгч гараараа сонгосон тохиолдолд)
  const cookieLang = request.cookies.get('NEXT_LOCALE')?.value
  if (cookieLang && locales.includes(cookieLang)) {
    return cookieLang
  }

  // 2. Vercel Geo headers шалгах
  const country =
    request.headers.get('x-vercel-ip-country') || // Vercel
    request.headers.get('cf-ipcountry') || // Cloudflare
    request.headers.get('x-country') // Custom header

  if (country) {
    if (country === 'MN') return 'mn'
    if (russianSpeakingCountries.has(country)) return 'ru'
    return 'en'
  }

  // 3. Accept-Language header шалгах (fallback)
  const acceptLanguage = request.headers.get('accept-language') || ''
  const preferredLang = acceptLanguage.split(',')[0].split('-')[0].toLowerCase()
  if (preferredLang === 'mn') return 'mn'
  if (preferredLang === 'ru') return 'ru'
  if (preferredLang === 'en') return 'en'

  // 4. localhost / development - default mn
  return defaultLocale
}

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Static файлууд болон API routes-ийг алгасах
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    /\.(.*)$/.test(pathname) // зургууд, favicon, г.м.
  ) {
    return NextResponse.next()
  }

  // Аль хэдийн lang prefix-тэй бол хөндөхгүй
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Хэл тогтоож redirect хийх
  const locale = getLocaleFromRequest(request)
  const newUrl = request.nextUrl.clone()
  newUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`

  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: [
    // Бүх хуудсуудыг шалгах, зөвхөн Next.js internal болон static файлуудыг алгасах
    '/((?!_next/static|_next/image|favicon.ico|logomark|icon|apple-icon).*)',
  ],
}
