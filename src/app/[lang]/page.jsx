import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { HeroIntro } from '@/components/HeroIntro'
import { HeroSlider } from '@/components/HeroSlider'
import { HomeStats } from '@/components/HomeStats'
import { ImageSlider } from '@/components/ImageSlider'
import { TestimonialRotator } from '@/components/TestimonialRotator'
import { getHeroSlides } from '@/data/heroSlides'
import { serviceGalleries } from '@/data/serviceGalleries'
import { getDictionary, locales } from '@/dictionaries/index'
import logoEstel from '@/images/clients/estel/logo-light.png'
import logoSynergetic from '@/images/clients/synergetic/logo-light.png'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }) {
  const dict = await getDictionary(params.lang)
  return {
    description: dict.metadata.siteDescription,
  }
}

function Stats({ dict }) {
  return <HomeStats stats={dict.stats} className="mt-24 sm:mt-32 lg:mt-40" />
}

function CaseStudies({ dict, lang }) {
  const caseStudies = [
    {
      client: 'ESTEL',
      href: `/${lang}/work/estel`,
      logo: logoEstel,
      year: '2019',
      tag: dict.caseStudies.estel.tag,
      title: dict.caseStudies.estel.title,
      description: dict.caseStudies.estel.description,
    },
    {
      client: 'SYNERGETIC',
      href: `/${lang}/work/synergetic`,
      logo: logoSynergetic,
      year: '2022',
      tag: dict.caseStudies.synergetic.tag,
      title: dict.caseStudies.synergetic.title,
      description: dict.caseStudies.synergetic.description,
    },
  ]

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {caseStudies.map((caseStudy) => (
          <FadeIn key={caseStudy.client} className="flex">
            <article className="group relative flex w-full flex-col rounded-3xl bg-white p-6 ring-1 ring-neutral-950/5 transition duration-300 focus-within:ring-2 focus-within:ring-brand-blue hover:-translate-y-1 hover:shadow-xl hover:shadow-neutral-950/10 active:scale-[0.99] sm:p-8">
              <h3>
                <Link href={caseStudy.href} className="outline-none">
                  <span className="absolute inset-0 z-10 rounded-3xl" />
                  <Image
                    src={caseStudy.logo}
                    alt={caseStudy.client}
                    className="h-12 w-auto object-contain"
                  />
                </Link>
              </h3>
              <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                <span className="font-semibold">{caseStudy.year}</span>
                <span className="text-neutral-300" aria-hidden="true">/</span>
                <span>{caseStudy.tag}</span>
              </p>
              <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                {caseStudy.title}
              </p>
              <p className="mt-4 line-clamp-3 text-base text-neutral-600 lg:line-clamp-2">
                {caseStudy.description}
              </p>
              <div className="mt-auto flex justify-end pt-8">
                <span
                  aria-hidden="true"
                  className="inline-flex items-center gap-x-1.5 rounded-full border border-neutral-300 px-4 py-1.5 text-sm font-semibold text-neutral-950 transition duration-300 group-hover:border-brand-blue group-hover:bg-brand-blue group-hover:text-white"
                >
                  {dict.caseStudies.more}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </article>
          </FadeIn>
        ))}
      </FadeInStagger>
    </Container>
  )
}

const SERVICE_KEYS = ['academy', 'salon', 'retail', 'online']

const ONLINE_SHOPS = [
  {
    brand: 'ESTEL',
    href: 'https://estelpro.mn',
    site: 'estelpro.mn',
    phone: '7707-2207',
  },
  {
    brand: 'SYNERGETIC',
    href: 'https://synergetic.mn',
    site: 'synergetic.mn',
    phone: '8900-6848',
  },
]

function withHighlight(text, highlight) {
  let at = highlight ? text.indexOf(highlight) : -1
  if (at === -1) return text

  return (
    <>
      {text.slice(0, at)}
      <strong className="font-semibold text-neutral-950">{highlight}</strong>
      {text.slice(at + highlight.length)}
    </>
  )
}

function OnlineShops({ phoneLabel }) {
  return (
    <ul role="list" className="mt-8 grid gap-4 sm:grid-cols-2">
      {ONLINE_SHOPS.map((shop) => (
        <li
          key={shop.brand}
          className="rounded-2xl p-5 ring-1 ring-neutral-950/10"
        >
          <p className="font-display text-sm font-semibold tracking-wider text-neutral-950">
            {shop.brand}
          </p>
          <a
            href={shop.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-base font-semibold text-brand-blue transition hover:text-neutral-950"
          >
            {shop.site} →
          </a>
          <p className="mt-2 text-sm text-neutral-600">
            {phoneLabel}:{' '}
            <a
              href={`tel:${shop.phone.replace(/\D/g, '')}`}
              className="font-semibold text-neutral-950 hover:text-brand-blue"
            >
              {shop.phone}
            </a>
          </p>
        </li>
      ))}
    </ul>
  )
}

function Services({ dict }) {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="space-y-20 sm:space-y-24 lg:space-y-32">
        {SERVICE_KEYS.map((key, i) => {
          let service = dict.services[key]

          return (
            <FadeIn key={key}>
              <article>
                <p className="font-display text-sm font-semibold text-neutral-400">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <div className="mt-6 grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
                  <ImageSlider
                    images={serviceGalleries[key]}
                    alt={service.title}
                    labels={dict.services.slider}
                    placeholder={String(i + 1).padStart(2, '0')}
                    className={clsx('min-w-0', i % 2 === 1 && 'lg:order-2')}
                  />
                  <div className="min-w-0">
                    <h3 className="font-display text-2xl font-semibold text-neutral-950 sm:text-3xl">
                      {service.title}
                    </h3>
                    <p className="mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
                      {withHighlight(service.description, service.highlight)}
                    </p>
                    {key === 'online' && (
                      <OnlineShops phoneLabel={service.orderPhone} />
                    )}
                  </div>
                </div>
              </article>
            </FadeIn>
          )
        })}
      </div>
    </Container>
  )
}

export default async function Home({ params }) {
  const { lang } = params
  const dict = await getDictionary(lang)

  return (
    <>
      <HeroSlider
        slides={getHeroSlides(lang)}
        labels={dict.hero.slider}
        className="relative z-20 mt-6 sm:mt-8"
      />

      <div className="relative overflow-x-clip overflow-y-visible">
        <Container className="relative z-10 mt-16 sm:mt-24">
          <HeroIntro dict={dict} />
        </Container>

        {/* Desktop logo watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 translate-x-[50%] z-0 select-none hidden lg:block"
        >
          <FadeIn>
            <Image
              src="/logomark-color.png"
              alt=""
              width={2033}
              height={2288}
              sizes="780px"
              className="w-[780px] h-auto max-w-none"
            />
          </FadeIn>
        </div>

        {/* Mobile logo watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 translate-x-[50%] z-0 select-none opacity-20 lg:hidden"
        >
          <FadeIn>
            <Image
              src="/logomark-color.png"
              alt=""
              width={2033}
              height={2288}
              sizes="460px"
              className="w-[360px] sm:w-[460px] h-auto max-w-none"
            />
          </FadeIn>
        </div>
      </div>

      <Stats dict={dict} />

      <CaseStudies dict={dict} lang={lang} />

      <TestimonialRotator
        className="mt-24 sm:mt-32 lg:mt-40"
        lang={lang}
      />

      <Services dict={dict} />

      <ContactSection dict={dict} lang={lang} />
    </>
  )
}
