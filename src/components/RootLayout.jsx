'use client'

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { motion, MotionConfig, useReducedMotion } from 'framer-motion'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { useCurveNavigation } from '@/components/Curve'
import { Footer } from '@/components/Footer'
import { GridPattern } from '@/components/GridPattern'
import { Logo, Logomark } from '@/components/Logo'
import { Offices } from '@/components/Offices'
import { SocialMedia } from '@/components/SocialMedia'

const RootLayoutContext = createContext({})

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m5.636 4.223 14.142 14.142-1.414 1.414L4.222 5.637z" />
      <path d="M4.222 18.363 18.364 4.22l1.414 1.414L5.636 19.777z" />
    </svg>
  )
}

function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M2 6h20v2H2zM2 16h20v2H2z" />
    </svg>
  )
}

function Header({
  panelId,
  invert = false,
  icon: Icon,
  expanded,
  onToggle,
  toggleRef,
}) {
  let { logoHovered, setLogoHovered } = useContext(RootLayoutContext)
  const { navigateTo } = useCurveNavigation()

  return (
    <Container>
      <div className="flex items-center justify-between">
        {/* Logo — navigateTo ашиглана (transition-тай) */}
        <div className="once-in">
          <Link
            href="/"
            aria-label="Home"
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
            onClick={(e) => {
              e.preventDefault()
              navigateTo('/')
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
        <div className="flex items-center gap-x-8">
          {/* "Холбоо барих" товч — navigateTo ашиглана */}
          <div className="once-in">
            <Button
              href="/contact"
              invert={invert}
              onClick={(e) => {
                e.preventDefault()
                navigateTo('/contact')
              }}
            >
              Хүний нөөц
            </Button>
          </div>
          <div className="once-in">
            <button
              ref={toggleRef}
              type="button"
              onClick={onToggle}
              aria-expanded={expanded.toString()}
              aria-controls={panelId}
              className={clsx(
                'group -m-2.5 rounded-full p-2.5 transition',
                invert ? 'hover:bg-white/10' : 'hover:bg-neutral-950/10'
              )}
              aria-label="Toggle navigation"
            >
              <Icon
                className={clsx(
                  'h-6 w-6',
                  invert
                    ? 'fill-white group-hover:fill-neutral-200'
                    : 'fill-neutral-950 group-hover:fill-neutral-700'
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </Container>
  )
}

function NavigationRow({ children }) {
  return (
    <div className="even:mt-px sm:bg-neutral-950">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2">{children}</div>
      </Container>
    </div>
  )
}

function NavigationItem({ href, children }) {
  const { navigateTo } = useCurveNavigation()
  let { setExpanded } = useContext(RootLayoutContext)

  return (
    <Link
      href={href}
      onClick={(e) => {
        e.preventDefault()
        setExpanded(false)
        navigateTo(href)
      }}
      className="group relative isolate -mx-6 bg-neutral-950 px-6 py-10 even:mt-px sm:mx-0 sm:px-0 sm:py-16 sm:odd:pr-16 sm:even:mt-0 sm:even:border-l sm:even:border-neutral-800 sm:even:pl-16"
    >
      {children}
      <span className="absolute inset-y-0 -z-10 w-screen bg-neutral-900 opacity-0 transition group-odd:right-0 group-even:left-0 group-hover:opacity-100" />
    </Link>
  )
}

function Navigation() {
  return (
    <nav className="mt-px font-display text-5xl font-medium tracking-tight text-white">
      <NavigationRow>
        <NavigationItem href="/work">Брэндүүд</NavigationItem>
        <NavigationItem href="/about">Бидний тухай</NavigationItem>
      </NavigationRow>
      <NavigationRow>
        <NavigationItem href="/process">Үйл ажиллагаа</NavigationItem>
        <NavigationItem href="/blog">Мэдээ мэдээлэл</NavigationItem>
      </NavigationRow>
    </nav>
  )
}

function RootLayoutInner({ children }) {
  let panelId = useId()
  let { expanded, setExpanded } = useContext(RootLayoutContext)
  const { introComplete } = useCurveNavigation()
  let openRef = useRef()
  let closeRef = useRef()
  let navRef = useRef()
  let shouldReduceMotion = useReducedMotion()

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
            icon={MenuIcon}
            toggleRef={openRef}
            expanded={expanded}
            onToggle={() => {
              setExpanded((expanded) => !expanded)
              window.setTimeout(() =>
                closeRef.current?.focus({ preventScroll: true })
              )
            }}
          />
        </div>

        <motion.div
          id={panelId}
          initial={false}
          animate={{ height: expanded ? 'auto' : '0.5rem' }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="relative z-50 overflow-hidden bg-neutral-950 pt-2"
          aria-hidden={expanded ? undefined : 'true'}
          inert={expanded ? undefined : ''}
        >
          <div className="bg-neutral-800">
            <div ref={navRef} className="bg-neutral-950 pb-16 pt-14">
              <Header
                invert
                panelId={panelId}
                icon={XIcon}
                toggleRef={closeRef}
                expanded={expanded}
                onToggle={() => {
                  setExpanded((expanded) => !expanded)
                  window.setTimeout(() =>
                    openRef.current?.focus({ preventScroll: true })
                  )
                }}
              />
            </div>
            <Navigation />
            <div className="relative bg-neutral-950 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-neutral-800">
              <Container>
                <div className="grid grid-cols-1 gap-y-10 pb-16 pt-10 sm:grid-cols-2 sm:pt-16">
                  <div>
                    <h2 className="font-display text-base font-semibold text-white">
                      Оффис
                    </h2>
                    <Offices
                      invert
                      className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2"
                    />
                  </div>
                  <div className="sm:border-l sm:border-transparent sm:pl-16">
                    <h2 className="font-display text-base font-semibold text-white">
                      Бидэнтэй нэгд
                    </h2>
                    <SocialMedia className="mt-6" invert />
                  </div>
                </div>
              </Container>
            </div>
          </div>
        </motion.div>
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

          <Footer />
        </div>
      </div>
    </MotionConfig>
  )
}

export function RootLayout({ children }) {
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
      <RootLayoutInner>{children}</RootLayoutInner>
    </RootLayoutContext.Provider>
  )
}
