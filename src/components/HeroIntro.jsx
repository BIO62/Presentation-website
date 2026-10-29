'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

import { useCurveNavigation } from '@/components/Curve'

const EASE = [0.22, 1, 0.36, 1]

export function HeroIntro({ dict }) {
  const title = dict?.hero?.title ?? 'АЛБАН ЁСНЫ ДИСТРИБЬЮТЕР'
  const description = dict?.hero?.description ?? 'Албан ёсны эрхтэйгээр брэнд бүтээгдэхүүн, үйлчилгээг Монголын зах зээлд хүргэн ажиллаж байна.'

  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const { isRevealed } = useCurveNavigation()
  // Scroll хийж энэ хэсэгт хүрэхэд (loading хөшиг нээгдсэний дараа) тоглоно
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const show = inView && isRevealed

  const words = title.split(' ')

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={show ? 'visible' : 'hidden'}
      transition={{ staggerChildren: 0.08 }}
      className="max-w-2xl xl:max-w-3xl"
    >
      <h1 className="font-philosopher font-bold text-[2.25rem] leading-[1.15] sm:text-5xl lg:text-7xl tracking-tight text-neutral-950 [text-wrap:balance]">
        {words.map((word, i) => (
          <span key={i}>
            {/* Үг бүр маскан дотроос доороос дээш гарна; дээд/доод padding нь "Ё", "Й"-г тайрахгүй */}
            <span className="-my-[0.15em] inline-block overflow-hidden py-[0.15em] align-bottom">
              <motion.span
                className="inline-block"
                variants={{
                  hidden: reduceMotion ? { opacity: 0 } : { y: '110%' },
                  visible: reduceMotion
                    ? { opacity: 1, transition: { duration: 0.4 } }
                    : { y: '0%', transition: { duration: 0.9, ease: EASE } },
                }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 && ' '}
          </span>
        ))}
      </h1>

      <motion.p
        variants={{
          hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.9, ease: EASE, delay: 0.25 },
          },
        }}
        className="mt-6 text-lg sm:text-xl text-neutral-600 leading-relaxed"
      >
        {description}
      </motion.p>
    </motion.div>
  )
}
