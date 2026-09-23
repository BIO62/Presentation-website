'use client'

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { motion, MotionConfig, useReducedMotion } from 'framer-motion'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { useCurveNavigation } from '@/components/Curve'
import { Footer } from '@/components/Footer'
import { GridPattern } from '@/components/GridPattern'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Logo, Logomark } from '@/components/Logo'
import { Offices } from '@/components/Offices'
import { SocialMedia } from '@/components/SocialMedia'
import imageBrands from '@/app/[lang]/work/estel/hero.jpg'
import imageAbout from '@/images/logistics-team.jpg'
import imageProcess from '@/images/warehouse-loading.jpg'
import imageBlog from '@/images/global-partnership.jpg'
import imageContact from '@/images/hair-academy-training.jpg'

const RootLayoutContext = createContext({})

const EASE = [0.87, 0, 0.13, 1]

const MENU_LABELS = {
  mn: { open: 'Цэс', close: 'Хаах' },
  ru: { open: 'Меню', close: 'Закрыть' },
  en: { open: 'Menu', close: 'Close' },
}

function MenuToggle({ expanded, onToggle, toggleRef, panelId, invert, lang }) {
  const labels = MENU_LABELS[lang] ?? MENU_LABELS.mn
  const label = expanded ? labels.close : labels.open

  return (
    <button
      ref={toggleRef}
      type="button"
      onClick={onToggle}
      aria-expanded={expanded.toString()}
      aria-controls={panelId}
      aria-label={label}
      className={clsx(
        'group flex items-center overflow-hidden rounded-full text-sm font-semibold transition',
        invert
          ? 'bg-white/10 text-white ring-1 ring-white/20'
          : 'bg-neutral-100 text-neutral-950 ring-1 ring-neutral-950/10'
      )}
    >
      <span
        className={clsx(
          'relative flex h-8 w-8 items-center justify-center rounded-full',
          invert ? 'bg-brand-yellow' : 'bg-neutral-950'
        )}
      >
        <span
          className={clsx(
            'absolute h-0.5 w-3.5 rounded-full transition-transform duration-500',
            invert ? 'bg-neutral-950' : 'bg-brand-yellow',
            expanded
              ? 'rotate-45'
              : '-translate-y-[3px] group-hover:scale-x-50'
          )}
        />
        <span
          className={clsx(
            'absolute h-0.5 w-3.5 rounded-full transition-transform duration-500',
            invert ? 'bg-neutral-950' : 'bg-brand-yellow',
            expanded
              ? '-rotate-45'
              : 'translate-y-[3px] group-hover:scale-x-50'
          )}
        />
      </span>
      {/* Hover дээр текст дээш гулсаж солигдоно */}
      <span className="relative hidden h-5 overflow-hidden px-3 sm:block">
        <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(.2,1.33,.25,1)] group-hover:-translate-y-5">
          <span className="h-5 leading-5">{label}</span>
          <span className="h-5 leading-5" aria-hidden="true">
            {label}
          </span>
        </span>
      </span>
    </button>
  )
}

function Header({
  panelId,
  invert = false,
  expanded,
  onToggle,
  toggleRef,
  lang = 'mn',
  dict,
}) {
  let { logoHovered, setLogoHovered } = useContext(RootLayoutContext)
  const { navigateTo } = useCurveNavigation()
  const contactHref = `/${lang}/contact`
  const contactLabel = dict?.nav?.contact ?? 'Хүний нөөц'
  const homeHref = `/${lang}`

  return (
    <Container>
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="once-in">
          <Link
            href={homeHref}
            aria-label="Home"
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
            onClick={(e) => {
              e.preventDefault()
              navigateTo(homeHref)
            }}
          >
            <Logomark
              className="sm:hidden"
              invert={invert}
              filled={logoHovered}
            />
            <Logo
              className="hidden sm:block"
              invert={invert}
              filled={logoHovered}
            />
          </Link>
        </div>
        <div className="flex items-center gap-x-3 sm:gap-x-6">
          {/* Language Switcher */}
          <div className="once-in relative z-30">
            <LanguageSwitcher invert={invert} currentLang={lang} />
          </div>
          {/* Contact button */}
          <div className="once-in">
            <Button
              href={contactHref}
              invert={invert}
              onClick={(e) => {
                e.preventDefault()
                navigateTo(contactHref)
              }}
            >
              {contactLabel}
            </Button>
          </div>
          <div className="once-in">
            <MenuToggle
              expanded={expanded}
              onToggle={onToggle}
              toggleRef={toggleRef}
              panelId={panelId}
              invert={invert}
              lang={lang}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

function MenuTiles({ expanded }) {
  return (
    <div className="absolute inset-0 flex">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          initial={false}
          animate={
            expanded
              ? { y: '-1%', rotate: 0, scaleX: 1.02, scaleY: 1.05 }
              : { y: '100%', rotate: -6, scaleX: 1.2, scaleY: 1.05 }
          }
          transition={{
            duration: 0.8,
            ease: EASE,
            delay: expanded ? i * 0.025 : 0.3 + i * 0.025,
          }}
          style={{ transformOrigin: 'right top' }}
          className={clsx(
            'relative h-full w-full rounded-sm bg-neutral-950',
            i > 1 && 'hidden sm:block'
          )}
        />
      ))}
    </div>
  )
}

function MenuLink({ item, index, expanded, activeId, setHoveredId, onNavigate }) {
  const dimmed = activeId && activeId !== item.id

  return (
    <li className="overflow-hidden">
      <motion.div
        initial={false}
        animate={expanded ? { y: '0%', rotate: 0 } : { y: '110%', rotate: -6 }}
        transition={{
          duration: 0.8,
          ease: expanded ? [0.2, 1.33, 0.25, 1] : EASE,
          delay: expanded ? 0.6 + index * 0.05 : index * 0.05,
        }}
        style={{ transformOrigin: 'right top' }}
      >
        <Link
          href={item.href}
          onMouseEnter={() => setHoveredId(item.id)}
          onMouseLeave={() => setHoveredId(null)}
          onFocus={() => setHoveredId(item.id)}
          onBlur={() => setHoveredId(null)}
          onClick={(e) => {
            e.preventDefault()
            onNavigate(item.href)
          }}
          className={clsx(
            'group relative block whitespace-nowrap py-1 font-display font-semibold uppercase leading-none tracking-tight transition-colors duration-200',
            'text-[9vw] sm:text-6xl lg:text-[min(4.2vw,8.5vh)]',
            dimmed ? 'text-white/40' : 'text-white'
          )}
        >
          {item.label}
          <span className="absolute inset-x-0 bottom-0 h-0.5 origin-right scale-x-0 bg-brand-yellow transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
        </Link>
      </motion.div>
    </li>
  )
}

function Navigation({ lang = 'mn', dict, expanded, pathname }) {
  const { navigateTo } = useCurveNavigation()
  let { setExpanded } = useContext(RootLayoutContext)
  const [hoveredId, setHoveredId] = useState(null)

  const items = [
    { id: 'brands', href: `/${lang}/work`, label: dict?.nav?.brands ?? 'Брэндүүд', image: imageBrands },
    { id: 'about', href: `/${lang}/about`, label: dict?.nav?.about ?? 'Бидний тухай', image: imageAbout },
    { id: 'process', href: `/${lang}/process`, label: dict?.nav?.process ?? 'Үйл ажиллагаа', image: imageProcess },
    { id: 'blog', href: `/${lang}/blog`, label: dict?.nav?.blog ?? 'Мэдээ мэдээлэл', image: imageBlog },
    { id: 'contact', href: `/${lang}/contact`, label: dict?.nav?.contact ?? 'Хүний нөөц', image: imageContact },
  ]

  const currentId = items.find((item) => pathname?.startsWith(item.href))?.id
  const imageId = hoveredId ?? currentId ?? items[0].id

  function onNavigate(href) {
    setExpanded(false)
    navigateTo(href)
  }

  return (
    <>
      {/* Төвийн зураг — hover хийсэн цэсийн зураг гарч ирнэ */}
      <div className="pointer-events-none absolute left-1/2 top-[80%] w-[30vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl opacity-60 sm:w-[22vw] lg:top-1/2 lg:w-[min(18vw,40vh)]">
        <motion.div
          initial={false}
          animate={expanded ? { y: '0%', rotate: 0 } : { y: '100%', rotate: -6 }}
          transition={{
            duration: 0.8,
            ease: expanded ? [0.25, 1, 0.1, 1] : EASE,
            delay: expanded ? 0.4 : 0,
          }}
          style={{ transformOrigin: 'right top' }}
          className="relative aspect-[3/4] overflow-hidden rounded-2xl"
        >
          {items.map((item) => (
            <Image
              key={item.id}
              src={item.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 15vw, 38vw"
              className={clsx(
                'object-cover transition duration-700',
                imageId === item.id ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
              )}
            />
          ))}
        </motion.div>
      </div>

      <nav className="absolute inset-x-0 top-[42%] -translate-y-1/2 px-6 lg:top-1/2">
        <ul
          role="list"
          className="relative z-10 flex flex-col items-center gap-y-2 lg:gap-y-1"
        >
          {items.map((item, index) => (
            <MenuLink
              key={item.id}
              item={item}
              index={index}
              expanded={expanded}
              activeId={hoveredId}
              setHoveredId={setHoveredId}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      </nav>

      {/* Доод мэдээлэл */}
      <motion.div
        initial={false}
        animate={expanded ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{
          duration: 0.8,
          ease: expanded ? [0.2, 1.33, 0.25, 1] : EASE,
          delay: expanded ? 0.7 : 0,
        }}
        className="absolute inset-x-0 bottom-0 hidden pb-12 sm:block"
      >
        <Container>
          <div className="flex items-end justify-between gap-8">
            <div>
              <h2 className="font-display text-sm font-semibold text-brand-yellow">
                {dict?.navPanel?.office ?? 'Оффис'}
              </h2>
              <Offices dict={dict} invert className="mt-3" />
            </div>
            <div className="text-right">
              <h2 className="font-display text-sm font-semibold text-brand-yellow">
                {dict?.navPanel?.followUs ?? 'Бидэнтэй нэгд'}
              </h2>
              <SocialMedia className="mt-3 justify-end" invert />
            </div>
          </div>
        </Container>
      </motion.div>
    </>
  )
}

function RootLayoutInner({ children, lang, dict }) {
  let panelId = useId()
  let { expanded, setExpanded } = useContext(RootLayoutContext)
  let pathname = usePathname()
  let openRef = useRef()
  let closeRef = useRef()
  let shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (lang) {
      document.documentElement.lang = lang
    }
  }, [lang])

  useEffect(() => {
    function onClick(event) {
      if (event.target.closest('a')?.href === window.location.href) {
        setExpanded(false)
      }
    }

    window.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('click', onClick)
    }
  }, [])

  // Цэс нээлттэй үед хуудас гүйлгэхгүй, Esc дарахад хаагдана
  useEffect(() => {
    if (!expanded) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setExpanded(false)
        openRef.current?.focus({ preventScroll: true })
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [expanded])

  return (
    <MotionConfig transition={shouldReduceMotion ? { duration: 0 } : undefined}>
      <header>
        <div
          className="absolute left-0 right-0 top-2 z-40 pt-14"
          aria-hidden={expanded ? 'true' : undefined}
          inert={expanded ? '' : undefined}
        >
          <Header
            panelId={panelId}
            toggleRef={openRef}
            expanded={false}
            lang={lang}
            dict={dict}
            onToggle={() => {
              setExpanded(true)
              window.setTimeout(() =>
                closeRef.current?.focus({ preventScroll: true })
              )
            }}
          />
        </div>

        <div
          id={panelId}
          className={clsx(
            'fixed inset-0 z-50 overflow-hidden',
            !expanded && 'pointer-events-none'
          )}
          aria-hidden={expanded ? undefined : 'true'}
          inert={expanded ? undefined : ''}
        >
          <MenuTiles expanded={expanded} />

          <motion.div
            initial={false}
            animate={{ opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.3, delay: expanded ? 0.5 : 0 }}
            className="relative z-10 pt-16"
          >
            <Header
              invert
              panelId={panelId}
              toggleRef={closeRef}
              expanded={expanded}
              lang={lang}
              dict={dict}
              onToggle={() => {
                setExpanded(false)
                window.setTimeout(() =>
                  openRef.current?.focus({ preventScroll: true })
                )
              }}
            />
          </motion.div>

          <Navigation
            lang={lang}
            dict={dict}
            expanded={expanded}
            pathname={pathname}
          />
        </div>
      </header>

      <div
        style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        className="relative flex flex-auto overflow-hidden bg-white pt-14"
      >
        <div
          className="relative isolate flex w-full flex-col pt-9"
        >
          <GridPattern
            className="absolute inset-x-0 -top-14 -z-10 h-[1000px] w-full fill-neutral-50 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
            yOffset={-96}
            interactive
          />

          <main className="w-full flex-auto">{children}</main>

          <Footer lang={lang} dict={dict} />
        </div>
      </div>
    </MotionConfig>
  )
}

export function RootLayout({ children, lang = 'mn', dict = {} }) {
  let [logoHovered, setLogoHovered] = useState(false)
  let [expanded, setExpanded] = useState(false)
  let pathname = usePathname()

  // Хуудас солигдох бүрт цэс автоматаар хаагдаж, дэлгэц хамгийн дээшээ (0, 0) очино
  useEffect(() => {
    setExpanded(false)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    // Анимаци болон IntersectionObserver-ийг шинэ хуудасны (0,0) байрлалаар сэрээнэ
    window.dispatchEvent(new Event('scroll'))
    window.dispatchEvent(new Event('resize'))
  }, [pathname])

  return (
    <RootLayoutContext.Provider value={{ logoHovered, setLogoHovered, expanded, setExpanded }}>
      <RootLayoutInner lang={lang} dict={dict}>{children}</RootLayoutInner>
    </RootLayoutContext.Provider>
  )
}
