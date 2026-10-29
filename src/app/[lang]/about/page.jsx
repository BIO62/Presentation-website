import Image from 'next/image'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { HomeStats } from '@/components/HomeStats'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { Timeline } from '@/components/Timeline'
import { getDictionary, locales } from '@/dictionaries/index'
import imageDirector from '@/images/site/about/director.jpg'

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
  const lines = mission.lines?.length ? mission.lines : [mission.text]

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-neutral-500">
          {mission.title}
        </h2>
      </FadeIn>
      <FadeInStagger
        faster
        className="mt-8 max-w-6xl font-display text-2xl font-medium leading-[1.4] tracking-tight text-neutral-950 sm:text-4xl sm:leading-[1.3]"
      >
        {lines.map((line) => (
          <FadeIn key={line} className="[text-wrap:balance]">
            {line}
          </FadeIn>
        ))}
      </FadeInStagger>
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
  return (
    <Container className="mt-16 sm:mt-20">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <FadeIn className="lg:col-span-5">
          <div className="lg:sticky lg:top-8">
            <Image
              src={imageDirector}
              alt={`${greeting.name}, ${greeting.role}`}
              priority
              sizes="(min-width: 1024px) 28rem, (min-width: 640px) 24rem, 100vw"
              className="w-full max-w-sm rounded-3xl bg-neutral-100 object-cover sm:max-w-md lg:max-w-none"
            />
            <p className="mt-6 font-display text-base font-semibold text-neutral-950">
              {greeting.name}
            </p>
            <p className="mt-1 text-sm text-neutral-600">{greeting.role}</p>
          </div>
        </FadeIn>
        <FadeIn className="lg:col-span-7">
          <p className="font-display text-xl font-semibold text-neutral-950 sm:text-2xl">
            {greeting.salutation}
          </p>
          <div className="mt-8 space-y-6 text-base text-neutral-600 sm:text-lg">
            {greeting.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-8 font-display text-lg font-semibold text-neutral-950 sm:text-xl">
            {greeting.closing}
          </p>
          <div className="mt-10 text-base text-neutral-600">
            <p>{greeting.regards}</p>
            <p className="mt-2 font-semibold text-neutral-950">
              {greeting.role} {greeting.name}
            </p>
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
