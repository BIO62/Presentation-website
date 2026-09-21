import '@/styles/tailwind.css'
import { CurveProvider } from '@/components/Curve'

export const metadata = {
  title: {
    template: '%s - Studio',
    default: 'Тэнгэрийн Илгээмж ХХК',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="mn" className="h-full bg-neutral-950 text-base antialiased">
      <body className="flex min-h-full flex-col font-sans bg-neutral-950 text-neutral-950">
        <CurveProvider>
          {children}
        </CurveProvider>
      </body>
    </html>
  )
}

