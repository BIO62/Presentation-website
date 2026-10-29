import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { InitialsAvatar } from '@/components/InitialsAvatar'
import { NewsCard } from '@/components/NewsCard'
import { PageIntro } from '@/components/PageIntro'
import { getNews } from '@/data/news'
import { getDictionary, locales } from '@/dictionaries/index'
import { formatDate } from '@/lib/formatDate'
import { loadMDXMetadata } from '@/lib/loadMDXMetadata'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }) {
  const dict = await getDictionary(params.lang)
  return {
    title: dict.blog.eyebrow,
    description: dict.blog.description,
  }
}

export default async function Blog({ params }) {
  const { lang } = params
  const dict = await getDictionary(lang)
  const articles = await loadMDXMetadata('blog', lang)
  const news = getNews(lang)

  const readMoreLabel =
    lang === 'ru' ? 'Читать далее' : lang === 'en' ? 'Read more' : 'Цааш унших'

  return (
    <>
      <PageIntro eyebrow={dict.blog.eyebrow} title={dict.blog.title}>
        <p>{dict.blog.description}</p>
      </PageIntro>

      {/* Шинэ мэдээ (src/data/news.js): шинэ нь эхэндээ */}
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeInStagger className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <FadeIn key={item.slug}>
              <NewsCard item={item} moreLabel={dict.news.more} />
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>

      {/* Өмнөх MDX нийтлэлүүд */}
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <Border className="pt-16">
            <h2 className="font-display text-2xl font-semibold text-neutral-950">
              {dict.blog.archive}
            </h2>
          </Border>
        </FadeIn>
        <div className="mt-16 space-y-24 lg:space-y-32">
          {articles.map((article) => (
            <FadeIn key={article.href}>
              <article>
                <Border className="pt-16">
                  <div className="relative lg:-mx-4 lg:flex lg:justify-end">
                    <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                      <h2 className="font-display text-2xl font-semibold text-neutral-950">
                        <Link href={article.href}>{article.title}</Link>
                      </h2>
                      <dl className="lg:absolute lg:left-0 lg:top-0 lg:w-1/3 lg:px-4">
                        <dt className="sr-only">Published</dt>
                        <dd className="absolute left-0 top-0 text-sm text-neutral-950 lg:static">
                          <time dateTime={article.date}>
                            {formatDate(article.date, lang)}
                          </time>
                        </dd>
                        <dt className="sr-only">Author</dt>
                        <dd className="mt-6 flex gap-x-4">
                          <InitialsAvatar
                            name={article.author.name}
                            image={article.author.image}
                            className="h-12 w-12"
                            textClassName="text-sm"
                          />
                          <div className="text-sm text-neutral-950">
                            <div className="font-semibold">
                              {article.author.name}
                            </div>
                            <div>{article.author.role}</div>
                          </div>
                        </dd>
                      </dl>
                      <p className="mt-6 max-w-2xl text-base text-neutral-600">
                        {article.description}
                      </p>
                      <Button
                        href={article.href}
                        aria-label={`${readMoreLabel}: ${article.title}`}
                        className="mt-8"
                      >
                        {readMoreLabel}
                      </Button>
                    </div>
                  </div>
                </Border>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>

      <ContactSection dict={dict} lang={lang} />
    </>
  )
}
