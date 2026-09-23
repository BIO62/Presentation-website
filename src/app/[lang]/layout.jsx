import { RootLayout } from '@/components/RootLayout'
import { getDictionary, locales } from '@/dictionaries/index'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }) {
  const { lang } = params
  if (!locales.includes(lang)) return {}
  const dict = await getDictionary(lang)
  return {
    title: {
      template: `%s — ${dict.metadata.siteName}`,
      // absolute: эцэг layout-ын template-ийг давхар залгахгүй
      absolute: dict.metadata.siteTitle,
    },
    description: dict.metadata.siteDescription,
    icons: {
      icon: [
        { url: '/logomark-white.png?v=3', type: 'image/png' },
        { url: '/favicon.ico?v=3' },
      ],
      shortcut: '/logomark-white.png?v=3',
      apple: '/logomark-white.png?v=3',
    },
    other: {
      'html-lang': lang,
    },
  }
}

export default async function LangLayout({ children, params }) {
  const { lang } = params
  if (!locales.includes(lang)) {
    notFound()
  }

  const dict = await getDictionary(lang)

  return (
    <RootLayout lang={lang} dict={dict}>
      {children}
    </RootLayout>
  )
}

