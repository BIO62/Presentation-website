'use client'

export function HeroIntro({ dict }) {
  const title = dict?.hero?.title ?? 'ОЛОН УЛСЫН БРЭНДҮҮДИЙН АЛБАН ЁСНЫ ДИСТРИБЬЮТЕР'
  const description = dict?.hero?.description ?? 'Дэлхийн брэндүүдийг Монголын зах зээлд албан ёсны эрхтэйгээр импортлон, түгээн хөгжүүлж байна.'

  return (
    <div className="max-w-2xl xl:max-w-3xl">
      <div className="overflow-hidden">
        <div className="once-in">
          <h1 className="font-philosopher font-bold text-[2.25rem] leading-[1.15] sm:text-5xl lg:text-7xl tracking-tight text-neutral-950 [text-wrap:balance]">
            {title}
          </h1>
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="once-in">
          <p className="mt-6 text-lg sm:text-xl text-neutral-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
