import Image from 'next/image'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { getDictionary, locales } from '@/dictionaries/index'
import logoEstel from '@/images/clients/estel/logo-light.png'
import logoSynergetic from '@/images/clients/synergetic/logo-light.png'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }) {
  const dict = await getDictionary(params.lang)
  return {
    title: dict.work.eyebrow,
    description: dict.metadata.work,
  }
}

export default async function Work({ params }) {
  const { lang } = params
  const dict = await getDictionary(lang)

  const brands = [
    {
      name: 'ESTEL Professional',
      href: `/${lang}/work/estel`,
      logo: logoEstel,
      year: '2013',
      tag: dict.work.estel.tag,
      title: dict.work.estel.title,
      description: dict.work.estel.description,
    },
    {
      name: 'SYNERGETIC',
      href: `/${lang}/work/synergetic`,
      logo: logoSynergetic,
      year: '2018',
      tag: dict.work.synergetic.tag,
      title: dict.work.synergetic.title,
      description: dict.work.synergetic.description,
    },
  ]

  return (
    <>
      <PageIntro
        eyebrow={dict.work.eyebrow}
        title={dict.work.title}
      >
        <p>{dict.work.description}</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {brands.map((brand) => (
            <FadeIn key={brand.name} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <h3>
                  <Link href={brand.href}>
                    <span className="absolute inset-0 rounded-3xl" />
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      className="h-12 w-auto object-contain"
                      style={{ filter: 'brightness(0)' }}
                      unoptimized
                    />
                  </Link>
                </h3>
                <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                  <span className="font-semibold">{brand.year}</span>
                  <span className="text-neutral-300" aria-hidden="true">/</span>
                  <span>{brand.tag}</span>
                </p>
                <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                  {brand.title}
                </p>
                <p className="mt-4 text-base text-neutral-600 leading-relaxed">
                  {brand.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>

      <ContactSection dict={dict} lang={lang} />
    </>
  )
}
