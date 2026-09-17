'use client'

import { createContext, useContext } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useCurveNavigation } from '@/components/Curve'

const FadeInStaggerContext = createContext(false)

const viewport = { once: true, margin: '0px', amount: 'some' }

export function FadeIn(props) {
  let shouldReduceMotion = useReducedMotion()
  let isInStaggerGroup = useContext(FadeInStaggerContext)
  let { isRevealed = true } = useCurveNavigation()

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: shouldReduceMotion ? 0 : 36,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.85,
            ease: [0.25, 1, 0.5, 1], // Dennis Snellenberg cubic bezier
          },
        },
      }}
      {...(isInStaggerGroup
        ? {}
        : {
            initial: 'hidden',
            whileInView: isRevealed ? 'visible' : undefined,
            animate: isRevealed ? undefined : 'hidden',
            viewport,
          })}
      {...props}
    />
  )
}

export function FadeInStagger({ faster = false, ...props }) {
  let { isRevealed = true } = useCurveNavigation()

  return (
    <FadeInStaggerContext.Provider value={true}>
      <motion.div
        initial="hidden"
        whileInView={isRevealed ? 'visible' : undefined}
        animate={isRevealed ? undefined : 'hidden'}
        viewport={viewport}
        transition={{
          staggerChildren: faster ? 0.12 : 0.2,
          delayChildren: 0.05,
        }}
        {...props}
      />
    </FadeInStaggerContext.Provider>
  )
}


