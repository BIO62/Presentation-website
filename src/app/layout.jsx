import '@/styles/tailwind.css'
import { SiteShell } from '@/components/SiteShell'

export const metadata = {
  title: {
    template: '%s — Тэнгэрийн Илгээмж',
    default: 'Тэнгэрийн Илгээмж ХХК',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="mn" className="h-full bg-neutral-950 text-base antialiased">
      <body className="flex min-h-full flex-col font-sans bg-neutral-950 text-neutral-950">
        <SiteShell>
          {children}
        </SiteShell>
      </body>
    </html>
  )
}
