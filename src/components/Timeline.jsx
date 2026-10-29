'use client'

import { useRef } from 'react'
import clsx from 'clsx'
import { motion, useInView, useReducedMotion, useScroll } from 'framer-motion'

// Шугамын үзүүр үргэлж дэлгэцийн 60%-ийн өндөрт байна: шугам эндээс доош зурагдана.
const TIP = '60%'

function TimelineItem({ item, reduceMotion }) {
  const dotRef = useRef(null)
  // Цэг 60%-ийн шугамаас дээш гарсан үед (шугамын үзүүр хүрсэн) гэрэлтэнэ.
  // Дээд талын их margin нь дэлгэцээс дээш гарсан цэгийг ч гэрэлтэй хэвээр үлдээнэ.
  const reached = useInView(dotRef, { margin: '100000px 0px -40% 0px' })
  const lit = reduceMotion || reached

  return (
    <li className="relative grid grid-cols-1 gap-y-2 pl-10 lg:grid-cols-[12rem_1fr] lg:gap-x-12 lg:pl-0">
      <span
        ref={dotRef}
        aria-hidden="true"
        className={clsx(
          'absolute left-0 top-[11px] h-[15px] w-[15px] rounded-full ring-2 transition duration-500 lg:left-[calc(13.5rem-7px)]',
          lit
            ? 'scale-110 bg-brand-blue-light shadow-[0_0_0_6px_rgba(53,99,201,0.18),0_0_18px_rgba(53,99,201,0.55)] ring-brand-blue-light'
            : 'bg-white ring-neutral-300'
        )}
      />
      <p className="whitespace-nowrap font-display text-3xl font-semibold text-neutral-950 lg:text-right">
        {item.year}
      </p>
      <div className="lg:pt-1">
        {item.title && (
          <h3 className="font-display text-lg font-semibold text-neutral-950 sm:text-xl">
            {item.title}
          </h3>
        )}
        <p
          className={clsx(
            'text-neutral-600',
            item.title ? 'mt-2 text-base sm:text-lg' : 'text-lg sm:text-xl'
          )}
        >
          {item.text}
        </p>
      </div>
    </li>
  )
}

export function Timeline({ items }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${TIP}`, `end ${TIP}`],
  })

  return (
    <div ref={ref} className="relative">
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-[7px] top-[18px] w-px bg-neutral-200 lg:left-[13.5rem]"
      />
      <motion.div
        aria-hidden="true"
        style={{ scaleY: reduceMotion ? 1 : scrollYProgress }}
        className="absolute bottom-0 left-[7px] top-[18px] w-px origin-top bg-brand-blue-light lg:left-[13.5rem]"
      />
      <ol role="list" className="space-y-12 sm:space-y-16">
        {items.map((item) => (
          <TimelineItem
            key={item.year}
            item={item}
            reduceMotion={reduceMotion}
          />
        ))}
      </ol>
    </div>
  )
}
