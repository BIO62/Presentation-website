import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { ImageSlider } from '@/components/ImageSlider'
import { ScrollToHash } from '@/components/ScrollToHash'
import { estelGalleries, getEstelPage } from '@/data/estelPage'

const prose = 'mx-auto max-w-3xl'
const wide = 'mx-auto max-w-5xl'
const paragraph = 'text-base leading-relaxed text-neutral-600 sm:text-lg'

function Heading({ title, subtitle }) {
  return (
    <header>
      <h2 className="font-display text-2xl font-semibold tracking-tight text-neutral-950 [text-wrap:balance] sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 font-display text-base font-medium text-brand-blue sm:text-lg">
          {subtitle}
        </p>
      )}
    </header>
  )
}

function Paragraphs({ items, className }) {
  return (
    <div className={className}>
      {items.map((text, i) => (
        <p key={i} className={`${paragraph} ${i > 0 ? 'mt-6' : ''}`}>
          {text}
        </p>
      ))}
    </div>
  )
}

function Closing({ children }) {
  return (
    <blockquote className="mt-10 border-l-4 border-brand-yellow pl-6">
      <p className="font-display text-lg font-semibold leading-snug text-brand-blue [text-wrap:balance] sm:text-xl">
        {children}
      </p>
    </blockquote>
  )
}

export function EstelContent({ lang, sliderLabels }) {
  const { professional, mongolia, impact, academy, journey } = getEstelPage(lang)

  return (
    <div className="space-y-24 sm:space-y-32">
      <ScrollToHash />
      {/* 1. ESTEL PROFESSIONAL: гарчиг нь хуудасны дээд хэсэгт */}
      <FadeIn>
        <section className={prose}>
          <Paragraphs items={professional.paragraphs} />
          <Closing>{professional.closing}</Closing>
        </section>
      </FadeIn>

      {/* 2. ESTEL MONGOLIA */}
      <FadeIn>
        <section className={prose}>
          <Heading title={mongolia.title} subtitle={mongolia.subtitle} />
          <Paragraphs items={mongolia.paragraphs} className="mt-8" />
          <Closing>{mongolia.closing}</Closing>
        </section>
      </FadeIn>

      {/* 3. Хамтын ажиллагааны үр дүн */}
      <section className={wide}>
        <FadeIn>
          <div className="max-w-3xl">
            <Heading title={impact.title} subtitle={impact.subtitle} />
            <p className={`mt-8 ${paragraph}`}>{impact.intro}</p>
          </div>
        </FadeIn>
        <FadeInStagger faster>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 rounded-3xl bg-white p-6 ring-1 ring-neutral-950/10 sm:gap-x-10 sm:p-10 lg:grid-cols-3">
            {impact.stats.map((stat) => (
              <FadeIn key={stat.label} className="flex flex-col-reverse justify-end">
                <dt>
                  <span className="mt-2 block font-display text-base font-semibold leading-snug text-neutral-950 sm:text-lg">
                    {stat.label}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-neutral-600">
                    {stat.text}
                  </span>
                </dt>
                <dd className="font-display text-3xl font-semibold tracking-tight text-brand-blue sm:text-5xl">
                  {stat.value}
                </dd>
              </FadeIn>
            ))}
          </dl>
        </FadeInStagger>
      </section>

      {/* 4. ESTEL Academy Mongolia */}
      <section id="academy" className={`${wide} scroll-mt-24`}>
        <FadeIn>
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="min-w-0">
              <Heading title={academy.title} subtitle={academy.subtitle} />
              <Paragraphs items={academy.paragraphs} className="mt-8" />
            </div>
            <ImageSlider
              images={estelGalleries.academy}
              alt={academy.title}
              labels={sliderLabels}
              className="min-w-0"
            />
          </div>
        </FadeIn>

        <FadeIn>
          <h3 className="mt-16 font-display text-xl font-semibold text-neutral-950">
            {academy.featuresTitle}
          </h3>
        </FadeIn>
        <FadeInStagger faster>
          <ul role="list" className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {academy.features.map((feature, i) => (
              <li key={feature.title} className="flex">
                <FadeIn className="flex w-full">
                  <div className="w-full rounded-3xl bg-white p-6 ring-1 ring-neutral-950/10 sm:p-8">
                    <p className="font-display text-sm font-semibold text-neutral-400">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-neutral-600">
                      <strong className="font-semibold text-neutral-950">
                        {feature.title}
                      </strong>{' '}
                      — {feature.text}
                    </p>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>

        <FadeIn>
          <div className="mt-10 rounded-3xl bg-brand-blue p-6 sm:p-10">
            <h3 className="flex items-center gap-x-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-yellow sm:text-sm">
              <span aria-hidden="true" className="h-px w-8 bg-brand-yellow" />
              {academy.goalTitle}
            </h3>
            <p className="mt-5 text-base leading-relaxed text-white sm:text-lg">
              {academy.goal}
            </p>
          </div>
        </FadeIn>
      </section>

      {/* 5. Хамтын амжилт – түүхэн аялал */}
      <FadeIn>
        <section id="journey" className={`${wide} scroll-mt-24`}>
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <ImageSlider
              images={estelGalleries.journey}
              alt={journey.title}
              labels={sliderLabels}
              className="min-w-0"
            />
            <div className="min-w-0">
              <Heading title={journey.title} subtitle={journey.subtitle} />
              <Paragraphs items={journey.paragraphs} className="mt-8" />
            </div>
          </div>
          <div className="max-w-3xl">
            <Closing>{journey.closing}</Closing>
          </div>
        </section>
      </FadeIn>
    </div>
  )
}
