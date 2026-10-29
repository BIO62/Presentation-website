import Image from 'next/image'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { HomeStats } from '@/components/HomeStats'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { Timeline } from '@/components/Timeline'
import { getDictionary, locales } from '@/dictionaries/index'
import imageDirector from '@/images/site/about/director.png'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }) {
  const dict = await getDictionary(params.lang)
  return {
    title: dict.about.eyebrow,
    description: dict.metadata.about,
  }
}

function Mission({ mission }) {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="relative isolate overflow-hidden rounded-4xl bg-brand-blue px-6 py-12 sm:px-12 sm:py-16 lg:px-20 lg:py-24">
          {/* Ард нь логоны бүдэг тэмдэг */}
          <Image
            src="/logomark-white.png"
            alt=""
            aria-hidden="true"
            width={512}
            height={512}
            className="pointer-events-none absolute -bottom-24 -right-24 -z-10 w-72 opacity-[0.06] sm:w-96 lg:-bottom-32 lg:-right-20 lg:w-[30rem]"
          />
          <h2 className="flex items-center gap-x-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-yellow sm:text-sm">
            <span aria-hidden="true" className="h-px w-8 bg-brand-yellow" />
            {mission.title}
          </h2>
          {/* Нэг урсгал догол мөр, мөрүүд жигд хуваагдана */}
          <p className="mt-6 max-w-4xl font-display text-xl font-medium leading-[1.45] tracking-tight text-white [text-wrap:balance] sm:mt-8 sm:text-3xl sm:leading-[1.35] lg:text-4xl">
            {mission.text}
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}

function History({ timeline }) {
  return (
    <>
      <SectionIntro
        title={timeline.title}
        className="mt-24 sm:mt-32 lg:mt-40"
      />
      <Container className="mt-16">
        <Timeline items={timeline.items} />
      </Container>
    </>
  )
}

function Culture({ dict }) {
  const values = dict.about.culture.valuesList || []
  return (
    <div className="mt-24 rounded-4xl bg-gradient-to-br from-neutral-950 via-brand-blue to-brand-blue-light py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow={dict.about.culture.eyebrow}
        title={dict.about.culture.title}
        invert
      />
      <Container className="mt-16">
        <FadeInStagger faster>
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {values.map((value, i) => (
              <li key={value.title} className="flex">
                <FadeIn className="flex w-full">
                  <div className="group w-full rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 transition duration-300 hover:bg-white/10 hover:ring-white/25">
                    <p className="font-display text-sm font-semibold text-neutral-400 transition-colors duration-300 group-hover:text-brand-yellow">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-6 font-display text-lg font-semibold text-white">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-base text-neutral-300">
                      {value.text}
                    </p>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}

// Захирлын мэндчилгээ: desktop-д зураг зүүн, захидал баруун; утсан дээр зураг дээр
function DirectorGreeting({ greeting }) {
  const [lead, ...rest] = greeting.paragraphs

  return (
    <Container className="mt-16 sm:mt-24">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
        {/* Зураг: ард нь брэнд цэнхэр блок, доор нь нэрийн карт */}
        <FadeIn className="lg:col-span-5">
          <div className="lg:sticky lg:top-12">
            <div className="relative mx-auto max-w-sm pb-10 pr-4 sm:max-w-md lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute bottom-4 left-8 right-0 top-8 rounded-4xl bg-brand-blue"
              />
              <Image
                src={imageDirector}
                quality={90}
                alt={`${greeting.name}, ${greeting.role}`}
                priority
                sizes="(min-width: 1024px) 28rem, (min-width: 640px) 24rem, 100vw"
                className="relative w-full rounded-4xl bg-neutral-100 object-cover shadow-xl shadow-neutral-950/10"
              />
              <div className="absolute bottom-0 left-5 right-10 rounded-2xl bg-white px-5 py-4 shadow-lg shadow-neutral-950/10 ring-1 ring-neutral-950/5 sm:left-6">
                <p className="font-display text-base font-semibold text-neutral-950">
                  {greeting.name}
                </p>
                <p className="mt-0.5 text-sm text-neutral-600">
                  {greeting.role}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Захидал */}
        <FadeIn className="lg:col-span-7">
          <span
            aria-hidden="true"
            className="sm:text-8xl block font-display text-7xl font-semibold leading-none text-brand-yellow"
          >
            “
          </span>
          <p className="-mt-4 max-w-2xl font-display text-2xl font-semibold leading-snug tracking-tight text-neutral-950 [text-wrap:balance] sm:-mt-6 sm:text-3xl">
            {greeting.salutation}
          </p>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-800 sm:text-xl">
            {lead}
          </p>
          <div className="mt-6 max-w-2xl space-y-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            {rest.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <blockquote className="mt-10 max-w-2xl border-l-4 border-brand-yellow pl-6">
            <p className="font-display text-xl font-semibold leading-snug text-brand-blue [text-wrap:balance] sm:text-2xl">
              {greeting.closing}
            </p>
          </blockquote>
          <div className="mt-12">
            <span
              aria-hidden="true"
              className="block h-px w-12 bg-brand-yellow"
            />
            <p className="mt-5 text-sm text-neutral-500">{greeting.regards}</p>
            <p className="mt-2 font-display text-2xl font-semibold text-neutral-950">
              {greeting.name}
            </p>
            <p className="mt-1 text-sm text-neutral-600">{greeting.role}</p>
          </div>
        </FadeIn>
      </div>
    </Container>
  )
}

export default async function About({ params }) {
  const { lang } = params
  const dict = await getDictionary(lang)

  return (
    <>
      <PageIntro
        eyebrow={dict.about.eyebrow}
        title={dict.about.greeting.title}
      />

      <DirectorGreeting greeting={dict.about.greeting} />

      <HomeStats
        stats={[
          ['15', dict.about.stats.branches],
          ['21', dict.about.stats.provinces],
        ]}
        className="mt-16"
      />

      {dict.about.mission && <Mission mission={dict.about.mission} />}

      <History timeline={dict.about.timeline} />

      <Culture dict={dict} />

      <ContactSection dict={dict} lang={lang} />
    </>
  )
}
