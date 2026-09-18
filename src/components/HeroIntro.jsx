'use client'

export function HeroIntro() {
  return (
    <div className="max-w-2xl xl:max-w-3xl">
      <div className="overflow-hidden">
        <div className="once-in">
          <h1 className="font-philosopher font-bold text-[2.25rem] leading-[1.15] sm:text-5xl lg:text-7xl tracking-tight text-neutral-950 [text-wrap:balance]">
            МОНГОЛ УЛСЫН ЭКО ОРЧИН НОГООН ДЭЛХИЙГ БҮТЭЭНЭ
          </h1>
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="once-in">
          <p className="mt-6 text-lg sm:text-xl text-neutral-600 leading-relaxed">
            Тэнгэрийн Илгээмж ХХК — ESTEL, SYNERGETIC
            брэндүүдийн албан ёсны дистрибьютер. 2013 оноос хойш Монголын
            үсчин, гоо сайхны салбарт тогтвортой хөгжиж байна.
          </p>
        </div>
      </div>
    </div>
  )
}
