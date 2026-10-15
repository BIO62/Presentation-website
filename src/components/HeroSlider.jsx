'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import { Container } from '@/components/Container'
import { useCurveNavigation } from '@/components/Curve'

const DELAY = 6000
const EASE = [0.22, 1, 0.36, 1]

const pad = (n) => String(n).padStart(2, '0')

// Зургийн доод хэсэгт: жижиг шошго + гарчиг. href байвал тайлбар бүхэлдээ линк
function Caption({ slide, moreLabel, reduceMotion }) {
  const Wrapper = slide.href ? Link : 'div'
  const linkProps = slide.href ? { href: slide.href } : {}

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      transition={{ duration: 0.7, ease: EASE }}
      className="max-w-2xl lg:max-w-3xl"
    >
      <Wrapper
        {...linkProps}
        className="group block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-yellow sm:text-xs">
          {slide.tag}
        </p>
        <p className="mt-2 line-clamp-3 font-display text-xl font-semibold leading-snug text-white [text-wrap:balance] sm:mt-3 sm:line-clamp-2 sm:text-2xl lg:text-[1.875rem] lg:leading-tight">
          {slide.title}
        </p>
        {slide.href && (
          <span className="mt-4 hidden items-center gap-x-1.5 text-sm font-medium text-white/75 transition group-hover:text-white sm:inline-flex">
            {moreLabel}
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        )}
      </Wrapper>
    </motion.div>
  )
}

export function HeroSlider({ slides, labels, className }) {
  const reduceMotion = useReducedMotion()
  const { isRevealed } = useCurveNavigation()
  const hasMany = slides.length > 1
  const animate = !reduceMotion && hasMany

  const plugins = useMemo(
    () =>
      animate
        ? [
            Autoplay({
              delay: DELAY,
              playOnInit: false,
              stopOnMouseEnter: true,
              stopOnInteraction: false,
            }),
          ]
        : [],
    [animate]
  )
  const [viewportRef, embla] = useEmblaCarousel(
    { loop: hasMany, active: hasMany },
    plugins
  )
  const [selected, setSelected] = useState(0)
  const progressRef = useRef(null)

  // Loading хөшиг нээгдэж дууссаны дараа л autoplay эхэлнэ
  const started = isRevealed && animate

  useEffect(() => {
    if (!embla) return
    const onSelect = () => setSelected(embla.selectedScrollSnap())
    onSelect()
    embla.on('select', onSelect).on('reInit', onSelect)
    return () => {
      embla.off('select', onSelect).off('reInit', onSelect)
    }
  }, [embla])

  useEffect(() => {
    const autoplay = embla?.plugins()?.autoplay
    if (!autoplay || !started) return
    autoplay.play()
    return () => autoplay.stop()
  }, [embla, started])

  // Идэвхтэй зураасны дүүргэлт: autoplay-ийн үлдсэн хугацаанаас тооцно (хулгана тавихад зогсоно)
  useEffect(() => {
    const autoplay = embla?.plugins()?.autoplay
    if (!autoplay || !started) return
    let frame
    const tick = () => {
      const left = autoplay.timeUntilNext()
      if (left !== null && progressRef.current) {
        const ratio = Math.min(1, Math.max(0, 1 - left / DELAY))
        progressRef.current.style.transform = `scaleX(${ratio})`
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [embla, started, selected])

  const go = useCallback(
    (action) => {
      if (!embla) return
      action(embla)
      // Хэрэглэгч зураас дарахад autoplay-ийн хугацаа шинээр эхэлнэ
      const autoplay = embla.plugins()?.autoplay
      if (autoplay && started) autoplay.reset()
    },
    [embla, started]
  )

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      go((api) => api.scrollPrev())
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      go((api) => api.scrollNext())
    }
  }

  const current = slides[selected] ?? slides[0]
  const slideLabel = (i) =>
    labels.slideOf
      .replace('{index}', String(i + 1))
      .replace('{total}', String(slides.length))

  return (
    <section
      aria-roledescription="carousel"
      aria-label={labels.label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={clsx(
        'relative outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-yellow',
        className
      )}
    >
      {/* Зураг: ирмэгээс ирмэг хүртэл */}
      <div
        ref={viewportRef}
        className="relative h-[72vh] max-h-[680px] min-h-[460px] overflow-hidden bg-neutral-950 lg:h-[78vh] lg:max-h-[760px] lg:min-h-[520px]"
      >
        <div className="flex h-full touch-pan-y">
          {slides.map((slide, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={slideLabel(i)}
              className="relative h-full min-w-0 flex-[0_0_100%] overflow-hidden"
            >
              <div
                className={clsx(
                  'absolute inset-0',
                  started && i === selected
                    ? 'scale-[1.06] transition-transform duration-[6000ms] ease-linear'
                    : 'scale-100 transition-transform delay-700 duration-0'
                )}
              >
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Текст уншигдах харанхуй уусгалт: доороос, desktop-д зүүн талаас ч */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent to-[65%]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-black/60 via-black/25 to-transparent to-[70%] sm:block"
        />
      </div>

      {/* Тайлбар + явцын зураас (зургийн дотор, Container-ийн хэмжээгээр) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 pb-6 sm:pb-10">
        <Container>
          <div className="pointer-events-auto">
            <AnimatePresence mode="wait" initial={false}>
              <Caption
                key={selected}
                slide={current}
                moreLabel={labels.more}
                reduceMotion={reduceMotion}
              />
            </AnimatePresence>
          </div>

          {hasMany && (
            <div className="pointer-events-auto mt-6 flex items-center gap-x-4 sm:mt-8">
              <span className="font-display text-sm font-semibold tabular-nums text-white">
                {pad(selected + 1)}
              </span>
              <div className="flex flex-1 gap-x-2 sm:max-w-md">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => go((api) => api.scrollTo(i))}
                    aria-label={slideLabel(i)}
                    aria-current={i === selected}
                    className="group/seg relative flex-1 py-3"
                  >
                    <span className="block h-[2px] overflow-hidden rounded-full bg-white/30 transition-colors group-hover/seg:bg-white/50">
                      {i === selected ? (
                        <span
                          key={selected}
                          ref={progressRef}
                          aria-hidden="true"
                          className="block h-full origin-left bg-white"
                          style={{
                            transform: animate ? 'scaleX(0)' : 'scaleX(1)',
                          }}
                        />
                      ) : (
                        i < selected && (
                          <span
                            aria-hidden="true"
                            className="block h-full bg-white/70"
                          />
                        )
                      )}
                    </span>
                  </button>
                ))}
              </div>
              <span className="font-display text-sm font-semibold tabular-nums text-white/50">
                {pad(slides.length)}
              </span>
            </div>
          )}
        </Container>
      </div>
    </section>
  )
}
