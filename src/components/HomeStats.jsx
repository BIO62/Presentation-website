'use client'

import { useEffect, useRef } from 'react'
import clsx from 'clsx'
import { animate, motion, useInView, useReducedMotion } from 'framer-motion'

import { Container } from '@/components/Container'
import { useCurveNavigation } from '@/components/Curve'

// Удаан төгсдөг (expo-out маягийн) easing — тоо эхэндээ хурдан, сүүлдээ зөөлөн зогсоно
const EASE = [0.16, 1, 0.3, 1]

// "2013", "60+", "15", "10,000+" → { to, suffix, grouped, isYear }
function parseStat(raw) {
  const match = String(raw).match(/^([\d,]+)(.*)$/)
  if (!match) return null
  const to = Number(match[1].replace(/,/g, ''))
  if (!Number.isFinite(to)) return null
  const grouped = match[1].includes(',')
  const isYear = !grouped && to >= 1900 && to <= 2100
  return { to, suffix: match[2], grouped, isYear }
}

function formatNumber(value, stat) {
  const rounded = Math.round(value)
  return (stat.grouped ? rounded.toLocaleString('en-US') : String(rounded)) + stat.suffix
}

function CountUp({ raw, start, delay }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const stat = parseStat(raw)
  // Он бол 2000 → 2013 гэж богинохон, бусад нь 0-ээс
  const from = stat ? (stat.isYear ? Math.floor(stat.to / 100) * 100 : 0) : 0

  useEffect(() => {
    if (!start || !stat || !ref.current) return
    if (reduceMotion) {
      ref.current.textContent = raw
      return
    }
    const duration = stat.isYear ? 1.4 : stat.to >= 1000 ? 2.2 : 1.8
    const controls = animate(from, stat.to, {
      duration,
      delay,
      ease: EASE,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = formatNumber(v, stat)
      },
      onComplete: () => {
        if (ref.current) ref.current.textContent = raw
      },
    })
    return () => controls.stop()
  }, [start]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!stat) return raw

  return (
    <>
      {/* Хайлтын систем, screen reader бодит утгыг уншина */}
      <span className="sr-only">{raw}</span>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {formatNumber(from, stat)}
      </span>
    </>
  )
}

export function HomeStats({ stats, className }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const { isRevealed } = useCurveNavigation()

  // Loading хөшиг нээгдэж дуусаад, хэсэг дэлгэцэнд харагдаж байх үед л эхэлнэ
  const start = inView && isRevealed

  const baseDelay = 0.3
  const stagger = 0.12

  return (
    <Container className={className}>
      <motion.ul
        ref={ref}
        role="list"
        initial="hidden"
        animate={start ? 'visible' : 'hidden'}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: stagger, delayChildren: baseDelay },
          },
        }}
        className={clsx(
          'grid gap-x-4 gap-y-12 sm:gap-x-8',
          stats.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
        )}
      >
        {stats.map(([value, label], index) => (
          <motion.li
            key={label}
            variants={{
              hidden: { opacity: 0, y: reduceMotion ? 0 : 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.9, ease: EASE },
              },
            }}
          >
            <motion.div
              aria-hidden="true"
              className="mb-6 h-px origin-left bg-neutral-950/10"
              variants={{
                hidden: { scaleX: 0 },
                visible: {
                  scaleX: 1,
                  transition: { duration: 1.2, ease: EASE },
                },
              }}
            />
            <p className="whitespace-nowrap font-display text-[1.375rem] font-semibold text-neutral-950 sm:text-4xl lg:text-5xl">
              <CountUp
                raw={value}
                start={start}
                delay={baseDelay + index * stagger + 0.1}
              />
            </p>
            <p className="mt-2 text-xs leading-snug text-neutral-600 sm:text-base">{label}</p>
          </motion.li>
        ))}
      </motion.ul>
    </Container>
  )
}
