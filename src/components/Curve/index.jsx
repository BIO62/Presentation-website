'use client'

import React, { useEffect, useRef, useState, createContext, useContext, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import gsap from 'gsap'

const routes = {
  '/': 'Нүүр хуудас',
  '/about': 'Бидний тухай',
  '/work': 'Ажлын ажиллагаа',
  '/process': 'Үйл ажиллагаа',
  '/blog': 'Мэдээ мэдээлэл',
  '/contact': 'Хүний нөөц',
}

const CurveContext = createContext({
  navigateTo: () => {},
  introComplete: true,
})

export const useCurveNavigation = () => useContext(CurveContext)

export function CurveProvider({ children }) {
  const router = useRouter()
  const pathname = usePathname()

  const [currentWord, setCurrentWord] = useState('Home')

  const isTransitioningRef = useRef(false)
  const currentTlRef = useRef(null)

  const loadingScreenRef = useRef(null)
  const topRoundRef = useRef(null)
  const bottomRoundRef = useRef(null)
  const wordsRef = useRef(null)

  const initialMountedRef = useRef(false)

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
      y: -30,
      xPercent: -50,
      yPercent: -50,
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

    // 2. Dennis Snellenberg iconic smooth floating entrance (delay 0.25s)
    tl.to(words, {
      duration: 0.6,
      opacity: 1,
      y: 0,
      ease: 'power3.out',
      delay: 0.25,
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

    tl.to(
      bottomRound,
      {
        duration: 1.0,
        height: '0vh',
        ease: 'power4.inOut',
      },
      '=-0.8'
    )

    tl.to(
      words,
      {
        duration: 0.3,
        opacity: 0,
        ease: 'linear',
      },
      '=-0.8'
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
      '=-0.8'
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
  // Dennis Snellenberg Exact Page Transition (pageTransitionIn & Out)
  // Handles link clicks and Alt + Left / Right Arrow (popstate)
  // ─────────────────────────────────────────────────────────────
  const runTransition = useCallback(
    (targetHref, isPopState = false) => {
      if (currentTlRef.current) {
        currentTlRef.current.kill()
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
          gsap.set(bottomRound, { height: isMobile ? '5vh' : '10vh' })
          gsap.set(screen, { top: '100%' })
          gsap.set(words, { opacity: 0 })
          gsap.set('header .once-in, main .once-in', { clearProps: 'all' })
          isTransitioningRef.current = false
          currentTlRef.current = null
        },
      })
      currentTlRef.current = tl

      // Initial state
      tl.set(screen, { top: '100%' })
      tl.set(words, { opacity: 0, y: 0 })
      tl.set('.loading-words .home-active, .loading-words .home-active-last', {
        display: 'none',
      })
      tl.set('.loading-words .active', {
        display: 'block',
        opacity: 1,
      })
      tl.set(bottomRound, { height: isMobile ? '5vh' : '10vh' })
      tl.set(topRound, { height: '0vh' })

      // 1. Screen slides in from bottom (0.5s Power4.easeIn)
      tl.to(screen, {
        duration: 0.5,
        top: '0%',
        ease: 'power4.in',
      })

      // 2. Top curve grows (0.4s Power4.easeIn, starts at same time)
      tl.to(
        topRound,
        {
          duration: 0.4,
          height: isMobile ? '5vh' : '10vh',
          ease: 'power4.in',
        },
        '=-0.5'
      )

      // 3. Word slides up into center (0.8s Power4.easeOut)
      tl.to(words, {
        duration: 0.8,
        opacity: 1,
        y: -50,
        ease: 'power4.out',
        delay: 0.05,
      })

      tl.set(topRound, { height: '0vh' })

      // At 0.5s: Screen has reached 0% and is 100% black.
      // Switch route and scroll to top!
      tl.call(() => {
        if (!isPopState) {
          router.push(targetHref)
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        gsap.set('header .once-in, main .once-in', {
          y: isMobile ? '20vh' : '50vh',
          opacity: 0,
        })
      })

      // 4. Screen slides away to top (0.8s Power3.easeInOut, begins 0.2s before word finishes)
      tl.to(
        screen,
        {
          duration: 0.8,
          top: '-100%',
          ease: 'power3.inOut',
        },
        '=-0.2'
      )

      tl.to(
        words,
        {
          duration: 0.6,
          opacity: 0,
          ease: 'linear',
        },
        '=-0.8'
      )

      tl.to(
        bottomRound,
        {
          duration: 0.85,
          height: '0vh',
          ease: 'power3.inOut',
        },
        '=-0.6'
      )

      // Hero text & header float up on the new page!
      tl.to(
        'header .once-in, main .once-in',
        {
          duration: 1.2,
          y: '0vh',
          opacity: 1,
          stagger: 0.05,
          ease: 'expo.out',
          clearProps: 'all',
        },
        '=-0.8'
      )
    },
    [router]
  )

  const navigateTo = useCallback(
    (href) => {
      if (href === pathname || isTransitioningRef.current) return
      runTransition(href, false)
    },
    [pathname, runTransition]
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
      // Alt + Left/Right эсвэл Browser Back/Forward дээр:
      // Өмнөх timeline-г шууд kill хийж, Next.js хуудсыг хөшгөөр даруй хаан Dennis transition тоглуулна
      runTransition(targetPath, true)
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
  }, [navigateTo, runTransition])

  return (
    <CurveContext.Provider value={{ navigateTo, introComplete: true }}>
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
