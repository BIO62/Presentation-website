'use client'

import { useEffect } from 'react'

import { useCurveNavigation } from '@/components/Curve'

// Хуудас солих хөшиг scroll-ийг дээш нь тэглэдэг тул хөшиг нээгдсэний дараа
// хаягийн #хэсэг (жишээ нь /work/estel#academy) рүү гүйлгэнэ.
export function ScrollToHash() {
  const { isRevealed } = useCurveNavigation()

  useEffect(() => {
    if (!isRevealed) return
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 300)
    return () => clearTimeout(timer)
  }, [isRevealed])

  return null
}
