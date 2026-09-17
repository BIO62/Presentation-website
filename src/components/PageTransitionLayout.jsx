'use client'

import { AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

/**
 * App Router equivalent of Dennis Snellenberg's:
 *   <AnimatePresence mode='wait'>
 *     <Component key={router.route} {...pageProps} />
 *   </AnimatePresence>
 *
 * Wrap this around {children} in the root layout.
 * Each page must wrap its content in <Curve> to get the SVG transition.
 */
export function PageTransitionLayout({ children }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      {/* The key change forces AnimatePresence to unmount the old page
          (playing its exit animations) before mounting the new page */}
      <div key={pathname} style={{ width: '100%' }}>
        {children}
      </div>
    </AnimatePresence>
  )
}
