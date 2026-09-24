import Image from 'next/image'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { HeroIntro } from '@/components/HeroIntro'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { TestimonialRotator } from '@/components/TestimonialRotator'
import { getDictionary, locales } from '@/dictionaries/index'
import logoEstel from '@/images/clients/estel/logo-light.png'
import logoSynergetic from '@/images/clients/synergetic/logo-light.png'
import imageLogistics from '@/images/global-partnership.jpg'

const brands = [
  ['ESTEL', logoEstel],
  ['SYNERGETIC', logoSynergetic],
]

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }) {
  const dict = await getDictionary(params.lang)
  return {
    description: dict.metadata.siteDescription,
  }
}

function Clients({ dict }) {
  return (
    <div className="mt-24 rounded-4xl bg-gradient-to-br from-neutral-950 via-brand-blue to-brand-blue-light py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <div className="overflow-hidden">
          <div className="once-in flex items-center gap-x-8">
            <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
              {dict.clients.heading}
            </h2>
            <div className="h-px flex-auto bg-white/20" />
          </div>
        </div>
        <ul
          role="list"
          className="mt-10 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:gap-x-16"
        >
          {brands.map(([client, logo]) => (
            <li key={client} className="flex justify-center overflow-hidden">
              <div className="once-in">
                <Image
                  src={logo}
                  alt={client}
                  className="max-h-12 sm:max-h-16 w-auto brightness-0 invert"
                />
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  )
}

function Stats({ dict }) {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeInStagger>
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4"
        >
          {dict.stats.map(([value, label]) => (
            <li key={label}>
              <FadeIn>
                <p className="font-display text-4xl font-semibold text-neutral-950 sm:text-5xl">
                  {value}
                </p>
                <p className="mt-2 text-base text-neutral-600">{label}</p>
              </FadeIn>
            </li>
          ))}
        </ul>
      </FadeInStagger>
    </Container>
  )
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
    <>
      <SectionIntro
        title={dict.caseStudies.sectionTitle}
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>{dict.caseStudies.sectionDescription}</p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {caseStudies.map((caseStudy) => (
            <FadeIn key={caseStudy.client} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <h3>
                  <Link href={caseStudy.href}>
                    <span className="absolute inset-0 rounded-3xl" />
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
                <p className="mt-4 text-base text-neutral-600">
                  {caseStudy.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  )
}

function Services({ dict }) {
  return (
    <>
      <SectionIntro
        eyebrow={dict.services.eyebrow}
        title={dict.services.title}
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>{dict.services.description}</p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-full max-w-[33.75rem] flex-none lg:w-[45rem]">
              <StylizedImage
                src={imageLogistics}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItem title={dict.services.academy.title}>
              {dict.services.academy.description}
            </ListItem>
            <ListItem title={dict.services.salon.title}>
              {dict.services.salon.description}
            </ListItem>
            <ListItem title={dict.services.retail.title}>
              {dict.services.retail.description}
            </ListItem>
            <ListItem title={dict.services.online.title}>
              {dict.services.online.description}
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  )
}

export default async function Home({ params }) {
  const { lang } = params
  const dict = await getDictionary(lang)

  return (
    <>
      <div className="relative overflow-x-clip overflow-y-visible">
        <Container className="relative z-10 mt-24 sm:mt-32 md:mt-56">
          <HeroIntro dict={dict} />
        </Container>

        {/* Desktop logo watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-[37%] -translate-y-1/2 translate-x-[50%] z-0 select-none hidden lg:block"
        >
          <div className="once-in">
            <Image
              src="/logomark-color.png"
              alt=""
              width={2033}
              height={2288}
              sizes="780px"
              className="w-[780px] h-auto max-w-none"
            />
          </div>
        </div>

        {/* Mobile logo watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-[42%] -translate-y-1/2 translate-x-[50%] z-0 select-none opacity-20 lg:hidden"
        >
          <div className="once-in">
            <Image
              src="/logomark-color.png"
              alt=""
              width={2033}
              height={2288}
              sizes="460px"
              className="w-[360px] sm:w-[460px] h-auto max-w-none"
            />
          </div>
        </div>
      </div>

      <Clients dict={dict} />

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
