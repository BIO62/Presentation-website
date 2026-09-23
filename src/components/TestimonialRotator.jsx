'use client'

import Image from 'next/image'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { Container } from '@/components/Container'
import { GridPattern } from '@/components/GridPattern'
import logoEstel from '@/images/clients/estel/logo-light.png'
import logoSynergetic from '@/images/clients/synergetic/logo-light.png'

const slides = {
  mn: [
    {
      logo: logoEstel,
      name: 'ESTEL',
      quote:
        'Бид дэлхийн жишигт нийцсэн чанартай бүтээгдэхүүн, мэргэжлийн сургалт, тогтвортой нийлүүлэлтээр Монголын үсчин, гоо сайхны салбарт найдвартай түнш болсоор ирсэн.',
    },
    {
      logo: logoSynergetic,
      name: 'SYNERGETIC',
      quote:
        'Бид байгаль орчинд ээлтэй, био задардаг, өдөр тутмын хэрэглээнд тохирсон чанартай бүтээгдэхүүнийг хэрэглэгчдэд хүргэж, эрүүл ахуй, тав тух, тогтвортой хэрэглээний зөв сонголтыг дэмжин ажилладаг.',
    },
  ],
  ru: [
    {
      logo: logoEstel,
      name: 'ESTEL',
      quote:
        'Мы стали надёжным партнёром монгольской индустрии красоты — предлагая продукцию мирового уровня, профессиональное обучение и стабильные поставки.',
    },
    {
      logo: logoSynergetic,
      name: 'SYNERGETIC',
      quote:
        'Каждая семья в Монголии заслуживает право пользоваться безопасными и натуральными средствами. SYNERGETIC даёт нам эту абсолютную уверенность.',
    },
  ],
  en: [
    {
      logo: logoEstel,
      name: 'ESTEL',
      quote:
        "We have become a trusted partner of Mongolia's hair and beauty industry — delivering world-class products, professional training, and reliable supply.",
    },
    {
      logo: logoSynergetic,
      name: 'SYNERGETIC',
      quote:
        'Mongolian consumers deserve access to authentically safe, plant-derived products. SYNERGETIC delivers that uncompromising peace of mind.',
    },
  ],
}

export function TestimonialRotator({ className, lang = 'mn' }) {
  const l = ['mn', 'ru', 'en'].includes(lang) ? lang : 'mn'
  const items = slides[l]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), 5000)
    return () => clearInterval(t)
  }, [items.length])

  const current = items[index]

  return (
    <div
      className={clsx(
        'relative isolate bg-neutral-50 py-12 sm:py-16',
        className,
      )}
    >
      <GridPattern
        className="absolute inset-0 -z-10 h-full w-full fill-neutral-100 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_50%,transparent_60%)]"
        yOffset={-256}
      />
      <Container>
        {/* Fixed-height shell — animated content is absolute so layout never shifts */}
        <div className="mx-auto max-w-4xl relative" style={{ height: '17rem' }}>
          <AnimatePresence mode="wait">
            <motion.figure
              key={current.name}
              initial={{ opacity: 0, filter: 'blur(12px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(12px)' }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center"
            >
              <blockquote className="mx-auto max-w-3xl font-philosopher italic text-2xl font-medium tracking-tight text-neutral-950 sm:text-3xl leading-relaxed text-center text-balance">
                &ldquo;{current.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8">
                <Image
                  src={current.logo}
                  alt={current.name}
                  unoptimized
                  className="h-12 w-auto object-contain"
                  style={{ filter: 'brightness(0)' }}
                />
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </Container>
    </div>
  )
}
