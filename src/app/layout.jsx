import { RootLayout } from '@/components/RootLayout'
import { CurveProvider } from '@/components/Curve'

import '@/styles/tailwind.css'

export const metadata = {
  title: {
    template: '%s - Studio',
    default: 'Тэнгэрийн Илгээмж ХХК',
  },
  icons: {
    icon: [
      { url: '/logomark-white.png?v=3', type: 'image/png' },
      { url: '/favicon.ico?v=3' },
    ],
    shortcut: '/logomark-white.png?v=3',
    apple: '/logomark-white.png?v=3',
  },
}

export default function Layout({ children }) {
  return (
    <html
      lang="mn"
      className="h-full bg-neutral-950 text-base antialiased"
    >
      <body className="flex min-h-full flex-col font-sans bg-neutral-950 text-neutral-950">
        {/*
          CurveProvider:
          - SVG transition overlay-г (AnimatePresence mode='wait' + key=displayPathname) агуулна
          - navigateTo() context-г хуваалцана
          - RootLayout болон хуудасны контентыг хүүхэд болгоно
        */}
        <CurveProvider>
          <RootLayout>{children}</RootLayout>
        </CurveProvider>
      </body>
    </html>
  )
}
