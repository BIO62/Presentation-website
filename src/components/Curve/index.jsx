'use client'

import React, { useEffect, useRef, useState, createContext, useContext, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import gsap from 'gsap'

const routes = {
  '/': 'Нүүр хуудас',
  '/about': 'Бидний тухай',
  '/work': 'Брэндүүд',
  '/process': 'Үйл ажиллагаа',
  '/blog': 'Мэдээ мэдээлэл',
  '/contact': 'Хүний нөөц',
}

const CurveContext = createContext({
  navigateTo: () => {},
  introComplete: true,
  isRevealed: true,
})

export const useCurveNavigation = () => useContext(CurveContext)

export function CurveProvider({ children }) {
  const router = useRouter()
  const pathname = usePathname()

  const [currentWord, setCurrentWord] = useState(routes[pathname] || 'Нүүр хуудас')
  const [isRevealed, setIsRevealed] = useState(pathname !== '/')

  const isTransitioningRef = useRef(false)
  const currentTlRef = useRef(null)

  const loadingScreenRef = useRef(null)
  const topRoundRef = useRef(null)
  const bottomRoundRef = useRef(null)
  const wordsRef = useRef(null)

  const initialMountedRef = useRef(false)
  const fallbackTimerRef = useRef(null)
  const prevPathnameRef = useRef(pathname)

  // ─────────────────────────────────────────────────────────────
  // Dennis Snellenberg Exact initLoaderHome()
  // Runs ONLY ONCE on initial page load / refresh of home page ('/')
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

    if (window.location.pathname !== '/') {
      // Home биш хуудсан дээр бол хөшгийг доор бэлэн байдалд тавина
      gsap.set(screen, { top: '100%' })
      gsap.set(topRound, { height: '0vh' })
      gsap.set(bottomRound, { height: isMobile ? '5vh' : '10vh' })
      gsap.set(words, { opacity: 0 })
      return
    }

    // Home хуудсан дээр refresh хийх эсвэл анх ороход Dennis Snellenberg initLoaderHome ажиллана
    isTransitioningRef.current = true

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(bottomRound, { height: isMobile ? '5vh' : '10vh' })
        gsap.set(screen, { top: '100%' })
        gsap.set(words, { opacity: 0 })
        isTransitioningRef.current = false
        currentTlRef.current = null
      },
    })
    currentTlRef.current = tl

    // 1. Initial State (Dennis exact setup)
    tl.set(screen, { top: '0%' })
    tl.set(topRound, { height: '0vh' })
    tl.set(bottomRound, { height: isMobile ? '5vh' : '10vh' })

    tl.set('header .once-in, main .once-in', {
      y: isMobile ? '20vh' : '50vh',
      opacity: 0,
    })

    tl.set(words, {
      opacity: 0,
      xPercent: -50,
      yPercent: -50,
      y: 0,
    })

    tl.set('.loading-words .active', {
      display: 'none',
    })

    const wordEls = words.querySelectorAll('.home-word')

    // Initial word states: only the first word ("Сайн байна уу") is active
    wordEls.forEach((el, i) => {
      tl.set(el, {
        display: i === 0 ? 'inline-flex' : 'none',
        opacity: i === 0 ? 1 : 0,
        alignItems: 'center',
      })
    })

    // 2. Dennis Snellenberg iconic smooth floating entrance (delay 0.15s)
    tl.to(words, {
      duration: 0.5,
      opacity: 1,
      xPercent: -50,
      yPercent: -50,
      y: -30,
      ease: 'power3.out',
      delay: 0.15,
    })

    // 3. Sequentially switch words according to each word's data-duration
    wordEls.forEach((el, index) => {
      const ms = parseInt(el.getAttribute('data-duration') || '150', 10)
      const sec = Math.max(0.04, ms / 1000)

      if (index < wordEls.length - 1) {
        const nextEl = wordEls[index + 1]
        // Hold current word for `sec` duration, then switch instantly to next word
        tl.set(el, { display: 'none', opacity: 0 }, `+=${sec}`)
        tl.set(nextEl, { display: 'inline-flex', opacity: 1, alignItems: 'center' }, '<')
      } else {
        // Hold last word for its duration
        tl.to({}, { duration: sec })
      }
    })

    // 4. Loading screen sweeps up to -100%
    tl.to(screen, {
      duration: 0.8,
      top: '-100%',
      ease: 'power4.inOut',
      delay: 0.05,
    })
    tl.call(() => {
      setIsRevealed(true)
    }, null, '<0.1')

    tl.to(
      bottomRound,
      {
        duration: 1.0,
        height: '0vh',
        ease: 'power4.inOut',
      },
      '-=0.8'
    )

    tl.to(
      words,
      {
        duration: 0.3,
        opacity: 0,
        ease: 'linear',
      },
      '-=0.8'
    )

    tl.set(screen, {
      top: '-100%',
    })

    tl.set(bottomRound, {
      height: '0vh',
    })

    // 5. Dennis signature: Header and Hero text float up smoothly with curtain retracting!
    tl.to(
      'header .once-in, main .once-in',
      {
        duration: 1.5,
        y: '0vh',
        opacity: 1,
        stagger: 0.08,
        ease: 'expo.out',
        clearProps: 'all',
      },
      '-=0.8'
    )

    // Safety timeout: If anything interrupts, screen is never stuck
    const safety = setTimeout(() => {
      if (isTransitioningRef.current) {
        gsap.set(screen, { top: '100%' })
        gsap.set('header .once-in, main .once-in', { clearProps: 'all' })
        isTransitioningRef.current = false
      }
    }, 8000)

    return () => clearTimeout(safety)
  }, [])

  // ─────────────────────────────────────────────────────────────
  // Phase 2: Reveal New Page (Out)
  // Runs ONLY after Next.js has mounted the new route!
  // ─────────────────────────────────────────────────────────────
  const pageTransitionOut = useCallback(() => {
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current)
      fallbackTimerRef.current = null
    }

    const screen = loadingScreenRef.current
    const bottomRound = bottomRoundRef.current
    const words = wordsRef.current
    if (!screen || !bottomRound || !words) {
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
      y: isMobile ? '20vh' : '50vh',
      opacity: 0,
    })

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(bottomRound, { height: isMobile ? '5vh' : '10vh' })
        gsap.set(screen, { top: '100%' })
        gsap.set(words, { opacity: 0 })
        gsap.set('header .once-in, main .once-in', { clearProps: 'all' })
        isTransitioningRef.current = false
        currentTlRef.current = null
      },
    })
    currentTlRef.current = tl

    // Screen is at 0% (solid black covering the whole screen)
    tl.set(screen, { top: '0%' })

    // 1. Screen slides away to top (-100%) revealing the already-loaded new page!
    tl.to(screen, {
      duration: 0.8,
      top: '-100%',
      ease: 'power3.inOut',
    })

    // Агуулгын урсдаг анимацийг хөшиг дээшээ нээгдэх яг тэр агшинд эхлүүлнэ
    tl.call(() => {
      setIsRevealed(true)
    }, null, '<0.08')

    // 2. Word fades out smoothly
    tl.to(
      words,
      {
        duration: 0.35,
        opacity: 0,
        ease: 'power2.out',
      },
      '<0.05'
    )

    // 3. Bottom curve shrinks to 0vh
    tl.to(
      bottomRound,
      {
        duration: 0.8,
        height: '0vh',
        ease: 'power3.inOut',
      },
      '<0.05'
    )

    // 4. Hero text and once-in elements float up smoothly through overflow mask!
    tl.to(
      'main .once-in',
      {
        duration: 1.4,
        y: '0vh',
        opacity: 1,
        stagger: 0.08,
        ease: 'expo.out',
        clearProps: 'all',
      },
      '-=0.65'
    )
  }, [])

  // ─────────────────────────────────────────────────────────────
  // Phase 1: Cover Screen (In)
  // Covers screen in black, displays destination title, and calls router.push()
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

      const label =
        routes[targetHref] ??
        (targetHref.slice(1).charAt(0).toUpperCase() + targetHref.slice(2))
      setCurrentWord(label)

      const screen = loadingScreenRef.current
      const topRound = topRoundRef.current
      const bottomRound = bottomRoundRef.current
      const words = wordsRef.current
      const isMobile = window.innerWidth <= 540

      const tl = gsap.timeline({
        onComplete: () => {
          // Screen has reached 0% and is 100% black covering the old page!
          // Only now reset revealed state behind the black screen:
          setIsRevealed(false)

          // NOW change route behind the black screen:
          if (!isPopState) {
            router.push(targetHref)
          }

          // Safety fallback: if router takes unusually long (>2.5s), auto-reveal so it never hangs
          fallbackTimerRef.current = setTimeout(() => {
            if (isTransitioningRef.current) {
              pageTransitionOut()
            }
          }, 2500)
        },
      })
      currentTlRef.current = tl

      // Initial state
      tl.set(screen, { top: '100%' })
      tl.set(words, { opacity: 0, xPercent: -50, yPercent: -50, y: 0 })
      tl.set('.loading-words .home-word', {
        display: 'none',
        opacity: 0,
      })
      tl.set('.loading-words .active', {
        display: 'inline-flex',
        alignItems: 'center',
        opacity: 1,
      })
      tl.set(bottomRound, { height: isMobile ? '5vh' : '10vh' })
      tl.set(topRound, { height: '0vh' })

      // 1. Screen slides in from bottom to 0% (covers viewport)
      tl.to(screen, {
        duration: 0.5,
        top: '0%',
        ease: 'power4.in',
      })

      // 2. Top curve grows concurrently with the screen rising
      tl.to(
        topRound,
        {
          duration: 0.4,
          height: isMobile ? '5vh' : '10vh',
          ease: 'power4.in',
        },
        '<'
      )

      // 3. Word slides up into center
      tl.to(
        words,
        {
          duration: 0.6,
          opacity: 1,
          xPercent: -50,
          yPercent: -50,
          y: -30,
          ease: 'power3.out',
        },
        '<0.1'
      )

      tl.set(topRound, { height: '0vh' })
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
        if (href !== window.location.pathname) {
          e.preventDefault()
          navigateTo(href)
        }
      }
    }

    window.addEventListener('popstate', handlePopState)
    document.addEventListener('click', handleGlobalClick)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      document.removeEventListener('click', handleGlobalClick)
    }
  }, [navigateTo, pageTransitionIn])

  return (
    <CurveContext.Provider value={{ navigateTo, introComplete: true, isRevealed }}>
      {/* 
        Dennis Snellenberg Official HTML Structure (dennissnellenberg.com):
        .loading-container
          .loading-screen (style={{ top: pathname === '/' ? 0 : '100%' }})
            .rounded-div-wrap.top -> .rounded-div
            .loading-words -> home-active words + active word
            .rounded-div-wrap.bottom -> .rounded-div
      */}
      <div className="loading-container">
        <div
          ref={loadingScreenRef}
          className="loading-screen"
          style={{ top: pathname === '/' ? '0%' : '100%' }}
        >
          <div ref={topRoundRef} className="rounded-div-wrap top">
            <div className="rounded-div" />
          </div>

          <div ref={wordsRef} className="loading-words">
            <h2 className="home-word" data-duration="600">
              <div className="dot" />
              Сайн байна уу
            </h2>
            <h2 className="home-word" data-duration="500">
              <div className="dot" />
              Привет
            </h2>
            <h2 className="home-word" data-duration="150">
              <div className="dot" />
              Hello
            </h2>
            <h2 className="home-word" data-duration="150">
              <div className="dot" />
              Bonjour
            </h2>
            <h2 className="home-word" data-duration="150">
              <div className="dot" />
              Ciao
            </h2>
            <h2 className="home-word" data-duration="150">
              <div className="dot" />
              Olá
            </h2>
            <h2 className="home-word" data-duration="150">
              <div className="dot" />
              おい
            </h2>
            <h2 className="home-word" data-duration="150">
              <div className="dot" />
              Hallå
            </h2>
            <h2 className="home-word" data-duration="150">
              <div className="dot" />
              Guten tag
            </h2>
            <h2 className="home-word" data-duration="200">
              <div className="dot" />
              Hallo
            </h2>

            <h2 className="active">
              <div className="dot" />
              {currentWord}
            </h2>
          </div>

          <div ref={bottomRoundRef} className="rounded-div-wrap bottom">
            <div className="rounded-div" />
          </div>
        </div>
      </div>

      <div className="w-full flex-auto flex flex-col">
        {children}
      </div>
    </CurveContext.Provider>
  )
}
