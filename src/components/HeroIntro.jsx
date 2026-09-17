'use client'

import { Hero3DLogomark } from '@/components/Hero3DLogomark'
import { HeroBackgroundPattern } from '@/components/HeroBackgroundPattern'

export function HeroIntro() {
  return (
    <div className="relative">
      {/* Mockup дээрх налуу дөрвөлжин архитектур паттерн */}
      <HeroBackgroundPattern />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between min-h-[460px] lg:min-h-[540px]">
        {/* Зүүн тал: Үндсэн текстүүд */}
        <div className="max-w-2xl xl:max-w-3xl flex-1">
          <div className="overflow-hidden">
            <div className="once-in">
              <h1 className="font-display text-5xl font-bold tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
                МОНГОЛ УЛСЫН ЭКО ОРЧИН НОГООН ДЭЛХИЙГ БҮТЭЭНЭ
              </h1>
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="once-in">
              <p className="mt-6 text-xl text-neutral-600">
                Тэнгэрийн Илгээмж ХХК — ESTEL, SYNERGETIC, Constant Delight
                брэндүүдийн албан ёсны дистрибьютер. 2013 оноос хойш Монголын
                үсчин, гоо сайхны салбарт тогтвортой хөгжиж байна.
              </p>
            </div>
          </div>
        </div>

        {/* Баруун тал: Доороос гарч ирдэг 3D сүлд бэлгэдэл */}
        <div className="mt-10 lg:mt-0 flex justify-center lg:justify-end lg:absolute lg:-right-20 xl:-right-32 2xl:-right-44 lg:top-1/2 lg:-translate-y-1/2 pointer-events-auto">
          <Hero3DLogomark />
        </div>
      </div>
    </div>
  )
}
