'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { useCurveNavigation } from '@/components/Curve'

function GlobeIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function MongoliaFlag({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 32 32" className={clsx('rounded-full shadow-sm flex-shrink-0', className)}>
      <rect width="10.67" height="32" fill="#DA2032" />
      <rect x="10.67" width="10.67" height="32" fill="#0057B7" />
      <rect x="21.33" width="10.67" height="32" fill="#DA2032" />
      <circle cx="5.33" cy="8" r="1.3" fill="#FFD100" />
      <path d="M4 11h2.66v10H4z" fill="#FFD100" />
      <circle cx="5.33" cy="14" r="1.5" fill="#FFD100" />
      <circle cx="5.33" cy="18" r="1.5" fill="#FFD100" />
      <path d="M3.5 12h3.66v1.2H3.5zm0 8.8h3.66V22H3.5z" fill="#FFD100" />
    </svg>
  )
}

function RussiaFlag({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 32 32" className={clsx('rounded-full shadow-sm flex-shrink-0 border border-neutral-200/50', className)}>
      <rect width="32" height="10.67" fill="#FFFFFF" />
      <rect y="10.67" width="32" height="10.67" fill="#0039A6" />
      <rect y="21.33" width="32" height="10.67" fill="#D52B1E" />
    </svg>
  )
}

function UKFlag({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 32 32" className={clsx('rounded-full shadow-sm flex-shrink-0', className)}>
      <clipPath id="uk-circle">
        <circle cx="16" cy="16" r="16" />
      </clipPath>
      <g clipPath="url(#uk-circle)">
        <rect width="32" height="32" fill="#012169" />
        <path d="M0 0l32 32M32 0L0 32" stroke="#FFFFFF" strokeWidth="5.5" />
        <path d="M0 0l32 32M32 0L0 32" stroke="#C8102E" strokeWidth="3" />
        <path d="M16 0v32M0 16h32" stroke="#FFFFFF" strokeWidth="8.5" />
        <path d="M16 0v32M0 16h32" stroke="#C8102E" strokeWidth="5" />
      </g>
    </svg>
  )
}

const languages = [
  { code: 'mn', label: 'MN', name: 'Монгол', Flag: MongoliaFlag },
  { code: 'ru', label: 'RU', name: 'Русский', Flag: RussiaFlag },
  { code: 'en', label: 'EN', name: 'English', Flag: UKFlag },
]

export function LanguageSwitcher({ invert = false, currentLang = 'mn' }) {
  const pathname = usePathname()
  const router = useRouter()
  const { navigateTo } = useCurveNavigation()
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef(null)
  const containerRef = useRef(null)

  const activeLang = languages.find((l) => l.code === currentLang) ?? languages[0]

  const getTargetPath = useCallback(
    (newLang) => {
      let newPath = `/${newLang}`
      if (/^\/(mn|ru|en)(\/|$)/.test(pathname)) {
        newPath = pathname.replace(/^\/(mn|ru|en)/, `/${newLang}`)
      } else if (pathname && pathname !== '/') {
        newPath = `/${newLang}${pathname}`
      }
      return newPath.replace(/\/+$/, '') || `/${newLang}`
    },
    [pathname]
  )

  function switchLanguage(newLang) {
    if (newLang === currentLang) {
      setIsOpen(false)
      return
    }

    // Cookie-д хадгалах (хэрэглэгчийн сонголт давамгайлна - 1 жил)
    document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000; SameSite=Lax`

    const newPath = getTargetPath(newLang)
    setIsOpen(false)

    // Хэл солиход 10-үгтэй урт мэндчилгээг алгасаж, зөвхөн шинэ хэлний гарчигтай хурдан curve шилжилт хийлгэнэ
    try {
      window.sessionStorage?.setItem('skip_home_intro', '1')
      router.prefetch(newPath)
    } catch {}

    if (navigateTo) {
      navigateTo(newPath)
    } else {
      window.location.href = newPath
    }
  }

  // Mouse hover events (with forgiving debounce)
  // Only trigger on pointer devices that support hover (not touchscreens)
  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(hover: hover)').matches) {
      return
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    if (typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(hover: hover)').matches) {
      return
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 180)
  }

  // Click outside to close (mobile touch & desktop click friendly)
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside, { passive: true })
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative z-30 inline-block text-left"
    >
      {/* Trigger Button - Sleek Circular Globe Icon Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`Хэл солих (${activeLang.name})`}
        title={`Хэл солих: ${activeLang.name}`}
        className={clsx(
          'group relative inline-flex items-center justify-center rounded-full h-9 w-9 text-sm font-semibold transition-all duration-200 select-none touch-manipulation border',
          invert
            ? 'border-neutral-700/80 bg-neutral-900/90 text-neutral-300 hover:border-neutral-400 hover:text-white hover:bg-neutral-800 active:scale-95'
            : 'border-neutral-200/90 bg-white/90 text-neutral-700 shadow-sm hover:border-neutral-400 hover:text-neutral-950 hover:bg-neutral-50 active:scale-95',
          isOpen && (
            invert
              ? 'border-neutral-400 bg-neutral-800 text-white ring-2 ring-white/10'
              : 'border-neutral-950 bg-neutral-50 text-neutral-950 ring-2 ring-neutral-950/5'
          )
        )}
      >
        <GlobeIcon className="w-[18px] h-[18px] transition-transform duration-500 ease-out group-hover:rotate-45 group-hover:scale-110 flex-shrink-0" />
      </button>

      {/* Floating Smooth Dropdown with Cascading Items */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 top-full mt-2.5 z-50">
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className={clsx(
                'w-44 origin-top rounded-2xl p-1.5 shadow-2xl border backdrop-blur-xl transition-colors',
                invert
                  ? 'border-neutral-800 bg-neutral-900/95 text-white shadow-black/50'
                  : 'border-neutral-200/80 bg-white/95 text-neutral-900 shadow-neutral-950/10'
              )}
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.04,
                    },
                  },
                }}
                className="flex flex-col gap-y-0.5"
              >
                {languages.map((lang) => {
                  const isActive = currentLang === lang.code
                  const Flag = lang.Flag
                  return (
                    <motion.button
                      key={lang.code}
                      variants={{
                        hidden: { opacity: 0, y: -4 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      onMouseEnter={() => {
                        try {
                          router.prefetch(getTargetPath(lang.code))
                        } catch {}
                      }}
                      onClick={() => switchLanguage(lang.code)}
                      className={clsx(
                        'flex items-center justify-between w-full rounded-xl px-3 py-2.5 sm:py-2 text-xs font-medium transition-all duration-150 text-left touch-manipulation',
                        isActive
                          ? invert
                            ? 'bg-neutral-800 text-white font-semibold'
                            : 'bg-neutral-100 text-neutral-950 font-semibold'
                          : invert
                            ? 'text-neutral-400 hover:bg-neutral-800/60 hover:text-white active:bg-neutral-800'
                            : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950 active:bg-neutral-100'
                      )}
                    >
                      <div className="flex items-center gap-x-2.5">
                        <Flag className="w-4 h-4" />
                        <span className="font-medium">{lang.name}</span>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <span className="text-[10px] tracking-wider font-semibold opacity-40 uppercase">
                          {lang.code}
                        </span>
                        {isActive && (
                          <svg
                            className="w-3.5 h-3.5 opacity-90 text-current"
                            viewBox="0 0 12 12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="2 6 4.5 9 10 3" />
                          </svg>
                        )}
                      </div>
                    </motion.button>
                  )
                })}
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

