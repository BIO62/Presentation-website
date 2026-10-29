'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import useEmblaCarousel from 'embla-carousel-react'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { NewsCard } from '@/components/NewsCard'

function ArrowButton({ direction, label, disabled, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-950 transition hover:border-neutral-950 hover:bg-neutral-950 hover:text-white disabled:pointer-events-none disabled:opacity-30"
    >
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
    </button>
  )
}

// Нүүр хуудасны "Мэдээ": desktop-д 3 карт, үлдсэнийг гүйлгэнэ; утсан дээр 1 карт + swipe
// "Бүх мэдээ →": /[lang]/blog руу
function AllNewsLink({ href, className, children }) {
  return (
    <Link
      href={href}
      className={clsx(
        'group inline-flex items-center gap-x-1.5 text-sm font-semibold text-brand-blue transition hover:text-neutral-950',
        className
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  )
}

export function NewsSection({ items, labels, allHref, className }) {
  const [viewportRef, embla] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
  })
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const update = useCallback((api) => {
    setCanPrev(api.canScrollPrev())
    setCanNext(api.canScrollNext())
  }, [])

  useEffect(() => {
    if (!embla) return
    update(embla)
    embla.on('select', update).on('reInit', update)
    return () => {
      embla.off('select', update).off('reInit', update)
    }
  }, [embla, update])

  // "← Бүх мэдээ" (/[lang]#news) холбоосоор ирэхэд энэ хэсэг рүү гүйлгэнэ:
  // хуудас хооронд шилжихэд Next.js #hash-ийг өөрөө гүйлгэдэггүй
  useEffect(() => {
    if (window.location.hash !== '#news') return
    const timer = setTimeout(() => {
      document.getElementById('news')?.scrollIntoView({ block: 'start' })
    }, 150)
    return () => clearTimeout(timer)
  }, [])

  if (!items.length) return null

  return (
    <section
      id="news"
      aria-labelledby="news-title"
      className={clsx('scroll-mt-8', className)}
    >
      <Container>
        <FadeIn className="flex items-end justify-between gap-x-6">
          <div>
            <h2
              id="news-title"
              className="font-display text-4xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-5xl"
            >
              {labels.title}
            </h2>
            {allHref && (
              <AllNewsLink href={allHref} className="mt-3 sm:hidden">
                {labels.back}
              </AllNewsLink>
            )}
          </div>
          <div className="hidden flex-none items-center gap-x-6 sm:flex">
            {allHref && <AllNewsLink href={allHref}>{labels.back}</AllNewsLink>}
            {(canPrev || canNext) && (
              <div className="flex gap-x-3">
                <ArrowButton
                  direction="prev"
                  label={labels.prev}
                  disabled={!canPrev}
                  onClick={() => embla?.scrollPrev()}
                />
                <ArrowButton
                  direction="next"
                  label={labels.next}
                  disabled={!canNext}
                  onClick={() => embla?.scrollNext()}
                />
              </div>
            )}
          </div>
        </FadeIn>

        <FadeIn className="mt-10 sm:mt-12">
          <div ref={viewportRef} className="overflow-hidden">
            <div className="-ml-6 flex touch-pan-y">
              {items.map((item) => (
                <div
                  key={item.slug}
                  className={clsx(
                    'min-w-0 flex-[0_0_88%] pl-6',
                    'sm:flex-[0_0_50%] lg:flex-[0_0_33.3333%]'
                  )}
                >
                  <NewsCard item={item} moreLabel={labels.more} />
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
