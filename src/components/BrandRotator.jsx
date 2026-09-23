'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import logoEstel from '@/images/clients/estel/logo-light.png'
import logoSynergetic from '@/images/clients/synergetic/logo-light.png'

const brands = [
  {
    id: 'estel',
    logo: logoEstel,
    accentColor: '#c8a96e',
    tagline: {
      mn: 'Мэргэжлийн үс арчилгаа',
      ru: 'Профессиональный уход за волосами',
      en: 'Professional Hair Care',
    },
    title: {
      mn: '1000+ мэргэжлийн салон, 1000+ үсчдийн сонголт',
      ru: '1000+ салонов-партнёров, 1000+ мастеров в год',
      en: '1000+ partner salons, 1000+ stylists trained annually',
    },
    description: {
      mn: '26 жилийн туршлагатай, дэлхийн 50 гаруй оронд үйл ажиллагаа явуулдаг тэргүүлэгч мэргэжлийн үс арчилгааны брэнд. Монгол Улсад 2019 оноос хойш ESTEL Академиар дамжуулан 1000+ үсчинд жил бүр мэдлэг, ур чадвар түгээдэг.',
      ru: 'Ведущий международный бренд профессионального ухода за волосами, основанный в 1999 году, представленный в более чем 50 странах. В Монголии официальный дистрибьютор с 2013 года.',
      en: 'Founded in 1999, ESTEL Professional is distributed across 50+ countries. Officially introduced to Mongolia in 2019, with the ESTEL Academy training over 1,000 stylists annually.',
    },
    stats: [
      { value: '50+', label: { mn: 'Улс орон', ru: 'Стран', en: 'Countries' } },
      { value: '1999', label: { mn: 'Байгуулагдсан', ru: 'Основан', en: 'Founded' } },
      { value: '1000+', label: { mn: 'Үсчин/жил', ru: 'Мастеров/год', en: 'Stylists/yr' } },
    ],
  },
  {
    id: 'synergetic',
    logo: logoSynergetic,
    accentColor: '#6eb87a',
    tagline: {
      mn: 'Эко цэвэрлэгээ, арчилгаа',
      ru: 'Экологичные средства ухода',
      en: 'Eco Cleaning & Care',
    },
    title: {
      mn: '98.8% байгалийн орц бүхий ЭКО гэр бүлийн брэнд',
      ru: '98,8% натуральных ингредиентов — эко-бренд для всей семьи',
      en: '98.8% natural ingredients — the eco brand for the whole family',
    },
    description: {
      mn: 'SLS, парабен, силикон агуулаагүй, гипоаллергены найрлагатай байгальд ээлтэй бүтээгдэхүүн. 2022 оноос Монгол дахь албан ёсны дистрибьютерээр ажиллаж, ногоон хэрэглээний соёлыг түгээж байна.',
      ru: 'Без SLS, парабенов и силиконов. Гипоаллергенный состав. Официальный дистрибьютор в Монголии с 2022 года — развиваем культуру осознанного потребления.',
      en: 'Free of SLS, parabens, and silicones. Hypoallergenic. Official distributor in Mongolia since 2022, championing conscious green consumption.',
    },
    stats: [
      { value: '98.8%', label: { mn: 'Байгалийн орц', ru: 'Натуральных', en: 'Natural' } },
      { value: '0', label: { mn: 'SLS/Парабен', ru: 'SLS/Парабен', en: 'SLS/Parabens' } },
      { value: '50+', label: { mn: 'Бүтээгдэхүүн', ru: 'Продуктов', en: 'Products' } },
    ],
  },
]

const fadeVariants = {
  enter: { opacity: 0, y: 24 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
}

export function BrandRotator({ lang = 'mn' }) {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const l = ['mn', 'ru', 'en'].includes(lang) ? lang : 'mn'
  const brand = brands[index]

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % brands.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isPaused])

  return (
    <div
      className="relative overflow-hidden bg-neutral-950 py-24 sm:py-32"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Animated accent glow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={brand.id + '-glow'}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="pointer-events-none absolute -top-32 right-[-20%] h-[600px] w-[600px] rounded-full blur-[120px]"
          style={{ backgroundColor: brand.accentColor }}
        />
      </AnimatePresence>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Tab switcher */}
        <div className="flex justify-center gap-2 mb-12">
          {brands.map((b, i) => (
            <button
              key={b.id}
              onClick={() => { setIndex(i); setIsPaused(true) }}
              className="relative px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-300"
              style={{
                color: i === index ? '#fff' : 'rgba(255,255,255,0.4)',
              }}
            >
              {i === index && (
                <motion.span
                  layoutId="brand-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: brand.accentColor, opacity: 0.25 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">{b.id.toUpperCase()}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={brand.id}
            variants={fadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <Image
                src={brand.logo}
                alt={brand.id.toUpperCase()}
                className="h-10 sm:h-14 w-auto brightness-0 invert opacity-90"
                unoptimized
              />
            </div>

            {/* Tagline */}
            <p
              className="text-center text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4"
              style={{ color: brand.accentColor }}
            >
              {brand.tagline[l]}
            </p>

            {/* Title */}
            <h2 className="text-center font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-white max-w-3xl mx-auto leading-snug mb-6">
              {brand.title[l]}
            </h2>

            {/* Description */}
            <p className="text-center text-neutral-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-12">
              {brand.description[l]}
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-x-12 gap-y-6 flex-wrap">
              {brand.stats.map((stat) => (
                <div key={stat.value} className="text-center">
                  <p
                    className="font-display text-3xl sm:text-4xl font-bold"
                    style={{ color: brand.accentColor }}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-neutral-500 uppercase tracking-wider">
                    {stat.label[l]}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-12">
          {brands.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIndex(i); setIsPaused(true) }}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: i === index ? '2rem' : '0.5rem',
                backgroundColor: i === index ? brand.accentColor : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
