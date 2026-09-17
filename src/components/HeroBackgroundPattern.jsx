'use client'

import React from 'react'

export function HeroBackgroundPattern() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-[900px] overflow-hidden select-none"
    >
      <div
        className="absolute -top-[10%] -right-[15%] w-[135%] h-[125%] opacity-70"
        style={{
          transform: 'rotate(-11deg) skewX(-5deg)',
          maskImage:
            'radial-gradient(ellipse 75% 65% at 65% 35%, black 20%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 75% 65% at 65% 35%, black 20%, transparent 80%)',
        }}
      >
        <div className="grid grid-cols-6 sm:grid-cols-8 gap-4 sm:gap-6 w-full">
          {Array.from({ length: 56 }).map((_, i) => (
            <div
              key={i}
              className="h-24 sm:h-36 rounded-2xl sm:rounded-3xl bg-neutral-900/[0.028] ring-1 ring-neutral-900/[0.035]"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
