'use client'

import React from 'react'
import Image from 'next/image'
import { HeroBackgroundPattern } from '@/components/HeroBackgroundPattern'

export function HeroIntro() {
  return (
    <div className="relative isolate min-h-[460px] sm:min-h-[520px] lg:min-h-[600px] flex items-center">
      {/* Арын налуу сараалжин архитектур паттерн */}
      <HeroBackgroundPattern />

      {/* Зүүн тал: Үндсэн гарчиг болон тайлбар */}
      <div className="max-w-2xl xl:max-w-3xl z-10 py-8 lg:py-16">
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

      {/* Баруун тал: Зураг дээрх шиг яг тал нь дэлгэцийн захаар орсон цэвэр 2D лого */}
      <div className="pointer-events-none absolute -right-[220px] sm:-right-[290px] lg:-right-[370px] xl:-right-[430px] 2xl:-right-[480px] top-1/2 -translate-y-1/2 z-0 select-none">
        <div className="once-in">
          <Image
            src="/logomark.png"
            alt="Тэнгэрийн Илгээмж"
            width={960}
            height={960}
            priority
            className="w-[520px] sm:w-[700px] lg:w-[860px] xl:w-[980px] 2xl:w-[1050px] h-auto max-w-none"
          />
        </div>
      </div>
    </div>
  )
}
