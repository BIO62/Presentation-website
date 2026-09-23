'use client'

import { usePathname } from 'next/navigation'

import { CurveProvider } from '@/components/Curve'

// Админ хэсэгт сайтын curve шилжилт, intro хэрэггүй
export function SiteShell({ children }) {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) {
    return children
  }
  return <CurveProvider>{children}</CurveProvider>
}
