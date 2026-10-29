'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useReducedMotion } from 'framer-motion'

function ArrowIcon({ direction }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        d={direction === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowButton({ direction, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={clsx(
        'absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-neutral-950 shadow-lg shadow-neutral-950/10 backdrop-blur transition hover:bg-white',
        direction === 'prev' ? 'left-3' : 'right-3'
      )}
    >
      <ArrowIcon direction={direction} />
    </button>
  )
}

export function ImageSlider({
  images,
  alt = '',
  sizes = '(min-width: 1024px) 36rem, 100vw',
  labels = { prev: 'Өмнөх зураг', next: 'Дараагийн зураг', goTo: 'Зураг' },
  className,
}) {
  const hasMany = images.length > 1
  const shouldReduceMotion = useReducedMotion()
  const plugins = useMemo(
    () =>
      hasMany && !shouldReduceMotion
        ? [
            Autoplay({
              delay: 5000,
              stopOnMouseEnter: true,
              stopOnInteraction: false,
            }),
          ]
        : [],
    [hasMany, shouldReduceMotion]
  )
  const [viewportRef, embla] = useEmblaCarousel(
    { loop: hasMany, active: hasMany },
    plugins
  )
  const [selected, setSelected] = useState(0)

  const onSelect = useCallback((api) => {
    setSelected(api.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!embla) return
    onSelect(embla)
    embla.on('select', onSelect).on('reInit', onSelect)
    return () => {
      embla.off('select', onSelect).off('reInit', onSelect)
    }
  }, [embla, onSelect])

  // Зураг байхгүй бол юу ч харуулахгүй
  if (images.length === 0) return null

  return (
    <div className={className}>
      <div className="relative">
        <div ref={viewportRef} className="overflow-hidden rounded-3xl">
          <div className="flex touch-pan-y">
            {images.map((image, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] min-w-0 flex-[0_0_100%] bg-neutral-100"
              >
                <Image
                  src={image}
                  alt={alt}
                  fill
                  sizes={sizes}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {hasMany && (
          <>
            <ArrowButton
              direction="prev"
              label={labels.prev}
              onClick={() => embla?.scrollPrev()}
            />
            <ArrowButton
              direction="next"
              label={labels.next}
              onClick={() => embla?.scrollNext()}
            />
          </>
        )}
      </div>

      {hasMany && (
        <div className="mt-4 flex justify-center gap-x-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => embla?.scrollTo(i)}
              aria-label={`${labels.goTo} ${i + 1}`}
              aria-current={i === selected}
              className={clsx(
                'h-2 rounded-full transition-all duration-300',
                i === selected
                  ? 'w-6 bg-neutral-950'
                  : 'w-2 bg-neutral-300 hover:bg-neutral-400'
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
