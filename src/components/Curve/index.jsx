'use client'

import React, { useEffect, useRef, useState, createContext, useContext, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import gsap from 'gsap'

const routeLabels = {
  mn: {
    '/': 'Нүүр хуудас',
    '/about': 'Бидний тухай',
    '/work': 'Брэндүүд',
    '/work/estel': 'ESTEL Professional',
    '/work/synergetic': 'SYNERGETIC',
    '/process': 'Үйл ажиллагаа',
    '/blog': 'Мэдээ мэдээлэл',
    '/contact': 'Хүний нөөц',
  },
  ru: {
    '/': 'Главная',
    '/about': 'О компании',
    '/work': 'Бренды',
    '/work/estel': 'ESTEL Professional',
    '/work/synergetic': 'SYNERGETIC',
    '/process': 'Деятельность',
    '/blog': 'Новости',
    '/contact': 'Контакты',
  },
  en: {
    '/': 'Home',
    '/about': 'About Us',
    '/work': 'Brands',
    '/work/estel': 'ESTEL Professional',
    '/work/synergetic': 'SYNERGETIC',
    '/process': 'Our Business',
    '/blog': 'News',
    '/contact': 'Contact',
  },
}

function getRouteLabel(href) {
  if (!href) return '...'
  const langMatch = href.match(/^\/(mn|ru|en)(\/|$)/)
  const lang = langMatch ? langMatch[1] : 'mn'
  const pure = href.replace(/^\/(mn|ru|en)/, '') || '/'
  return (
    routeLabels[lang]?.[pure] ??
    routeLabels.mn[pure] ??
    (pure.slice(1).charAt(0).toUpperCase() + pure.slice(2))
  )
}

function isHomeRoute(path) {
  if (!path || path === '/') return true
  return /^\/(mn|ru|en)\/?$/.test(path)
}

function getActiveLang(path) {
  if (!path) return 'mn'
  const match = path.match(/^\/(mn|ru|en)(\/|$)/)
  return match ? match[1] : 'mn'
}

const baseGreetings = [
  { code: 'mn', text: 'Сайн байна уу', duration: 340 },
  { code: 'en', text: 'Hello', duration: 160 },
  { code: 'ru', text: 'Привет', duration: 160 },
  { code: 'fr', text: 'Bonjour', duration: 160 },
  { code: 'it', text: 'Ciao', duration: 160 },
  { code: 'pt', text: 'Olá', duration: 160 },
  { code: 'ja', text: 'おい', duration: 160 },
  { code: 'sv', text: 'Hallå', duration: 160 },
  { code: 'de', text: 'Guten tag', duration: 160 },
  { code: 'nl', text: 'Hallo', duration: 300 },
]

function getGreetingsForLocale(locale) {
  const primary = baseGreetings.find((g) => g.code === locale)
  if (!primary) return baseGreetings

  const others = baseGreetings.filter((g) => g.code !== locale)
  return [
    { ...primary, duration: 340 },
    ...others.slice(0, -1).map((g) => ({ ...g, duration: 160 })),
    { ...others[others.length - 1], duration: 300 },
  ]
}

const CurveContext = createContext({
  navigateTo: () => { },
  introComplete: true,
  isRevealed: true,
})

export const useCurveNavigation = () => useContext(CurveContext)

export function CurveProvider({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const currentLang = getActiveLang(pathname)
  const greetings = getGreetingsForLocale(currentLang)

  const [currentWord, setCurrentWord] = useState(() => getRouteLabel(pathname))
  const [isRevealed, setIsRevealed] = useState(true)

  const isTransitioningRef = useRef(false)
  const currentTlRef = useRef(null)

  const loadingScreenRef = useRef(null)
  const topRoundRef = useRef(null)
  const bottomRoundRef = useRef(null)
  const wordsRef = useRef(null)
  const activeWordTextRef = useRef(null)

  const initialMountedRef = useRef(false)
  const fallbackTimerRef = useRef(null)
  const prevPathnameRef = useRef(pathname)

  // ─────────────────────────────────────────────────────────────
  // Dennis Snellenberg Exact initLoaderHome()
  // Runs ONLY on initial page load / refresh of home page
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (initialMountedRef.current) return
    initialMountedRef.current = true

    const screen = loadingScreenRef.current
    const bottomRound = bottomRoundRef.current
    const topRound = topRoundRef.current
    const words = wordsRef.current
    if (!screen || !bottomRound || !words || !topRound) return

    const isMobile = window.innerWidth <= 540
    const isHome = isHomeRoute(window.location.pathname)

    // Хэрэв Home биш хуудсан дээр анх орсон бол хөшгийг гөлгөр нээж харуулна (цагаан тасалдал үүсгэхгүй)
    if (!isHome) {
      gsap.set(words, { opacity: 0 })
      gsap.set(screen, { top: '0%' })
      gsap.set(topRound, { height: '0vh' })
      gsap.set(bottomRound, { height: isMobile ? '5vh' : '10vh' })

      gsap.to(screen, {
        duration: 0.6,
        top: '-100%',
        ease: 'power4.inOut',
        delay: 0.05,
        onComplete: () => {
          gsap.set(screen, { top: '100%' })
          gsap.set(bottomRound, { height: '0vh' })
          gsap.set('header .once-in, main .once-in', { clearProps: 'all' })
          setIsRevealed(true)
        },
      })
      gsap.to(bottomRound, {
        duration: 0.6,
        height: '0vh',
        ease: 'power4.inOut',
        delay: 0.05,
      })
      return
    }

    isTransitioningRef.current = true

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(bottomRound, { height: isMobile ? '5vh' : '10vh' })
          gsap.set(screen, { top: '100%' })
          gsap.set(words, { opacity: 0 })
          gsap.set('header .once-in, main .once-in', { clearProps: 'all' })
          isTransitioningRef.current = false
          currentTlRef.current = null
          setIsRevealed(true)
        },
      })
      currentTlRef.current = tl

      // 1. Initial State
      tl.set(screen, { top: '0%' })
      tl.set(topRound, { height: '0vh' })
      tl.set(bottomRound, { height: isMobile ? '5vh' : '10vh' })

      tl.set('header .once-in, main .once-in', {
        y: isMobile ? '20vh' : '40vh',
        opacity: 0,
      })

      // Word container is visible in center of screen
      tl.set(words, {
        opacity: 1,
        y: 0,
      })

      tl.set('.loading-words .active', {
        display: 'none',
      })

      const wordEls = words.querySelectorAll('.home-word')
      wordEls.forEach((el, i) => {
        tl.set(el, {
          display: i === 0 ? 'inline-flex' : 'none',
          opacity: i === 0 ? 1 : 0,
        })
      })

      // 2. Sequential rapid word switch (ms timings)
      wordEls.forEach((el, index) => {
        const ms = parseInt(el.getAttribute('data-duration') || '160', 10)
        const sec = ms / 1000

        if (index < wordEls.length - 1) {
          const nextEl = wordEls[index + 1]
          tl.set(el, { display: 'none', opacity: 0 }, `+=${sec}`)
          tl.set(nextEl, { display: 'inline-flex', opacity: 1 }, '<')
        } else {
          tl.to({}, { duration: sec })
        }
      })

      // 3. Word gently fades and glides up slightly
      tl.to(words, {
        duration: 0.24,
        y: -24,
        opacity: 0,
        ease: 'power2.in',
      })

      // 4. Loading screen sweeps up to -100%
      tl.to(
        screen,
        {
          duration: 0.8,
          top: '-100%',
          ease: 'power4.inOut',
        },
        '-=0.1'
      )
      tl.call(() => {
        setIsRevealed(true)
      }, null, '<0.1')

      tl.to(
        bottomRound,
        {
          duration: 0.8,
          height: '0vh',
          ease: 'power4.inOut',
        },
        '<'
      )

      // 5. Header and Hero float up
      tl.to(
        'header .once-in, main .once-in',
        {
          duration: 1.05,
          y: '0vh',
          opacity: 1,
          stagger: 0.05,
          ease: 'expo.out',
          clearProps: 'all',
        },
        '-=0.6'
      )
    })

    // Safety timeout: If anything hangs, force reveal so screen is never black
    const safety = setTimeout(() => {
      setIsRevealed(true)
      gsap.set(screen, { top: '100%' })
      gsap.set(topRound, { height: '0vh' })
      gsap.set(bottomRound, { height: '0vh' })
      gsap.set('header .once-in, main .once-in', { clearProps: 'all' })
      isTransitioningRef.current = false
    }, 3500)

    return () => {
      clearTimeout(safety)
      ctx.revert()
    }
  }, [])

  // ─────────────────────────────────────────────────────────────
  // Phase 2: Reveal New Page (Out)
  // Runs ONLY after Next.js has mounted the new route!
  // Dennis Snellenberg Out physics:
  // Curtain pulls up (-100%). Bottom curve starts at 10vh bulging
  // downwards, and smoothly flattens to 0vh as curtain exits screen.
  // ─────────────────────────────────────────────────────────────
  const pageTransitionOut = useCallback(() => {
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current)
      fallbackTimerRef.current = null
    }

    const screen = loadingScreenRef.current
    const bottomRound = bottomRoundRef.current
    const topRound = topRoundRef.current
    const words = wordsRef.current
    if (!screen || !bottomRound || !words || !topRound) {
      isTransitioningRef.current = false
      return
    }

    const isMobile = window.innerWidth <= 540

    // Ensure scroll is at the very top for the new page
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    window.dispatchEvent(new Event('scroll'))
    window.dispatchEvent(new Event('resize'))

    if (currentTlRef.current) {
      currentTlRef.current.kill()
    }

    // Set new page's once-in elements ready to float up smoothly
    gsap.set('main .once-in', {
      y: isMobile ? '16vh' : '36vh',
      opacity: 0,
    })

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(screen, { top: '100%' })
        gsap.set(topRound, { height: '0vh' })
        gsap.set(bottomRound, { height: '0vh' })
        gsap.set(words, { opacity: 0, y: 0 })
        gsap.set('header .once-in, main .once-in', { clearProps: 'all' })
        isTransitioningRef.current = false
        currentTlRef.current = null
      },
    })
    currentTlRef.current = tl

    // Start state for reveal:
    // Screen covers viewport (top: 0%)
    // Top arch is 0vh
    // Bottom round starts with 10vh curve protruding downwards
    tl.set(screen, { top: '0%' })
    tl.set(topRound, { height: '0vh' })
    tl.set(bottomRound, { height: isMobile ? '5vh' : '10vh' })

    // 1. Active word gently exits upward
    tl.to(words, {
      duration: 0.22,
      y: -18,
      opacity: 0,
      ease: 'power2.in',
    })

    // 2. Screen slides away to top (0% -> -100%)
    tl.to(
      screen,
      {
        duration: 0.55,
        top: '-100%',
        ease: 'power4.inOut',
      },
      '-=0.08'
    )

    tl.call(() => {
      setIsRevealed(true)
    }, null, '<0.05')

    // 3. Bottom curve smoothly flattens (10vh -> 0vh) as screen sweeps out
    tl.to(
      bottomRound,
      {
        duration: 0.55,
        height: '0vh',
        ease: 'power4.inOut',
      },
      '<'
    )

    // 4. Hero text and once-in elements float up smoothly through overflow mask!
    tl.to(
      'main .once-in',
      {
        duration: 0.75,
        y: '0vh',
        opacity: 1,
        stagger: 0.05,
        ease: 'expo.out',
        clearProps: 'all',
      },
      '-=0.42'
    )
  }, [])

  // ─────────────────────────────────────────────────────────────
  // Phase 1: Cover Screen (In)
  // Dennis Snellenberg In physics:
  // Curtain rises (100% -> 0%). Top arch starts at 10vh protruding
  // upwards, and smoothly flattens to 0vh as screen seals at 0%.
  // ─────────────────────────────────────────────────────────────
  const pageTransitionIn = useCallback(
    (targetHref, isPopState = false) => {
      if (currentTlRef.current) {
        currentTlRef.current.kill()
      }
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current)
        fallbackTimerRef.current = null
      }

      isTransitioningRef.current = true

      // Prefetch the target route right away so there is zero waiting time in black
      try {
        router.prefetch(targetHref)
      } catch {}

      const label = getRouteLabel(targetHref)
      setCurrentWord(label)
      if (activeWordTextRef.current) {
        activeWordTextRef.current.textContent = label
      }

      const screen = loadingScreenRef.current
      const topRound = topRoundRef.current
      const bottomRound = bottomRoundRef.current
      const words = wordsRef.current
      const isMobile = window.innerWidth <= 540

      const tl = gsap.timeline({
        onComplete: () => {
          // Screen has reached 0% and is 100% black covering the old page!
          setIsRevealed(false)

          // NOW change route behind the black screen:
          if (!isPopState) {
            router.push(targetHref)
          }

          // Safety fallback: if router takes unusually long (>1.4s), auto-reveal so it never hangs
          fallbackTimerRef.current = setTimeout(() => {
            if (isTransitioningRef.current) {
              pageTransitionOut()
            }
          }, 1400)
        },
      })
      currentTlRef.current = tl

      // Initial state before sliding in:
      // Screen is at bottom (100%)
      // Top round arch starts at 10vh leading the motion
      // Bottom round is 0vh
      tl.set(screen, { top: '100%' })
      tl.set(topRound, { height: isMobile ? '5vh' : '10vh' })
      tl.set(bottomRound, { height: '0vh' })

      // Words stay centered, subtle offset only, NOT bottom of screen:
      tl.set(words, { opacity: 0, y: 16 })
      tl.set('.loading-words .home-word', {
        display: 'none',
        opacity: 0,
      })
      tl.set('.loading-words .active', {
        display: 'inline-flex',
        alignItems: 'center',
        opacity: 1,
      })

      // 1. Screen slides in from bottom (100% -> 0%)
      tl.to(screen, {
        duration: 0.38,
        top: '0%',
        ease: 'power3.inOut',
      })

      // 2. Top curve smoothly flattens (10vh -> 0vh) synchronously with screen reaching 0%
      tl.to(
        topRound,
        {
          duration: 0.38,
          height: '0vh',
          ease: 'power3.inOut',
        },
        '<'
      )

      // 3. Target label fades in right in the CENTER as curtain covers screen
      tl.to(
        words,
        {
          duration: 0.28,
          opacity: 1,
          y: 0,
          ease: 'power2.out',
        },
        '-=0.2'
      )
    },
    [router, pageTransitionOut]
  )

  // ─────────────────────────────────────────────────────────────
  // Listen for Route Mounting:
  // When Next.js renders the new page, pathname changes!
  // At this exact moment, we reveal the new page smoothly.
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    // Only handle route transitions, NEVER on initial mount:
    if (prevPathnameRef.current === pathname) return
    prevPathnameRef.current = pathname

    if (isTransitioningRef.current) {
      // Let React finish DOM commit, then slide the curtain away
      const frameId = requestAnimationFrame(() => {
        pageTransitionOut()
      })
      return () => cancelAnimationFrame(frameId)
    }
  }, [pathname, pageTransitionOut])

  const navigateTo = useCallback(
    (href) => {
      if (href === pathname || isTransitioningRef.current) return
      pageTransitionIn(href, false)
    },
    [pathname, pageTransitionIn]
  )

  // ─────────────────────────────────────────────────────────────
  // Browser History Navigation (Alt + Left / Right Arrow / Back / Forward)
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    function handlePopState() {
      const targetPath = window.location.pathname
      pageTransitionIn(targetPath, true)
    }

    function handleGlobalClick(e) {
      const anchor = e.target.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return

      if (
        href.startsWith('/') &&
        !href.startsWith('//') &&
        !anchor.hasAttribute('download') &&
        anchor.getAttribute('target') !== '_blank'
      ) {
        const currentPure = window.location.pathname.replace(/\/+$/, '') || '/'
        const targetPure = href.replace(/\/+$/, '') || '/'
        if (targetPure !== currentPure) {
          e.preventDefault()
          e.stopPropagation()
          navigateTo(href)
        }
      }
    }

    window.addEventListener('popstate', handlePopState)
    // Capture phase intercepts before any React / Next.js internal router handles it
    document.addEventListener('click', handleGlobalClick, { capture: true })

    return () => {
      window.removeEventListener('popstate', handlePopState)
      document.removeEventListener('click', handleGlobalClick, { capture: true })
    }
  }, [navigateTo, pageTransitionIn])

  return (
    <CurveContext.Provider value={{ navigateTo, introComplete: true, isRevealed }}>
      {/* 
        Dennis Snellenberg Official HTML Structure (dennissnellenberg.com):
        .loading-container
          .loading-screen (curtain with top and bottom curves)
            .rounded-div-wrap.top -> .rounded-div
            .rounded-div-wrap.bottom -> .rounded-div
          .loading-words (centered text, independent of moving screen)
      */}
      <div className="loading-container">
        <div
          ref={loadingScreenRef}
          className="loading-screen"
        >
          <div ref={topRoundRef} className="rounded-div-wrap top">
            <div className="rounded-div" />
          </div>

          <div ref={bottomRoundRef} className="rounded-div-wrap bottom">
            <div className="rounded-div" />
          </div>
        </div>

        <div ref={wordsRef} className="loading-words">
          {greetings.map((g) => (
            <h2 key={g.text} className="home-word" data-duration={g.duration}>
              <div className="dot" />
              <span>{g.text}</span>
            </h2>
          ))}

          <h2 className="active">
            <div className="dot" />
            <span ref={activeWordTextRef}>{currentWord}</span>
          </h2>
        </div>
      </div>

      <div className="w-full flex-auto flex flex-col">
        {children}
      </div>
    </CurveContext.Provider>
  )
}

