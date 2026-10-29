import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { getNewsItem, getNewsSlugs } from '@/data/news'
import { getDictionary, locales } from '@/dictionaries/index'

const SITE_NAME = 'Тэнгэрийн Илгээмж'

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    getNewsSlugs().map((slug) => ({ lang, slug }))
  )
}

export async function generateMetadata({ params }) {
  const item = getNewsItem(params.slug, params.lang)
  if (!item) return {}

  return {
    // OG зургийн бүтэн хаягийг үүсгэхэд хэрэгтэй (Vercel дээр тухайн deploy-ийн домэйн)
    metadataBase: new URL(
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000'
    ),
    title: { absolute: `${item.title} | ${SITE_NAME}` },
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      images: [
        {
          url: item.image.src,
          width: item.image.width,
          height: item.image.height,
        },
      ],
    },
  }
}

export default async function NewsArticle({ params }) {
  const { lang, slug } = params
  const item = getNewsItem(slug, lang)
  if (!item) notFound()

  const dict = await getDictionary(lang)

  return (
    <Container as="article" className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <Link
          href={`/${lang}/blog`}
          className="inline-flex items-center gap-x-1.5 text-sm font-semibold text-neutral-950 transition hover:text-brand-blue"
        >
          <span aria-hidden="true">←</span>
          {dict.news.back}
        </Link>
      </FadeIn>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
        <FadeIn>
          {/* Постер бүтнээрээ: тайрахгүй */}
          <Image
            src={item.image}
            alt={item.title}
            priority
            sizes="(min-width: 1024px) 36rem, 100vw"
            className="h-auto w-full rounded-3xl bg-neutral-100 object-contain"
          />
        </FadeIn>

        <FadeIn>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="rounded-full bg-brand-yellow px-3 py-1 text-xs font-semibold text-neutral-950">
              {item.category}
            </span>
            <time
              dateTime={item.date}
              className="text-sm font-semibold tabular-nums text-neutral-500"
            >
              {item.dateLabel}
            </time>
          </div>
          <h1 className="mt-6 font-display text-4xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-5xl">
            {item.title}
          </h1>
          <div className="mt-8 space-y-5 text-base text-neutral-600 sm:text-lg">
            {item.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-x-1.5 text-sm font-semibold text-neutral-500 transition hover:text-neutral-950"
            >
              {dict.news.facebook}
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </FadeIn>
      </div>
    </Container>
  )
}
