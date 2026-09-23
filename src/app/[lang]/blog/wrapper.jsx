import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { MDXComponents } from '@/components/MDXComponents'
import { PageLinks } from '@/components/PageLinks'
import { formatDate } from '@/lib/formatDate'
import { getDictionary } from '@/dictionaries/index'
import { loadMDXMetadata } from '@/lib/loadMDXMetadata'

export default async function BlogArticleWrapper({ children, _segments, params }) {
  const lang = params?.lang ?? _segments?.find((s) => /^(mn|ru|en)$/.test(s)) ?? 'mn'
  const id = _segments?.at(-2)
  const dict = await getDictionary(lang)

  const allArticles = await loadMDXMetadata('blog', lang)
  const article = allArticles.find((a) => a.id === id) ?? {
    title: 'News Article',
    date: '2023-01-01',
    author: { name: 'Admin', role: 'Author' },
    description: '',
  }
  const moreArticles = allArticles
    .filter((a) => a.id !== id)
    .slice(0, 2)

  const moreArticlesLabel =
    lang === 'ru'
      ? 'Другие статьи'
      : lang === 'en'
      ? 'More articles'
      : 'Бусад нийтлэлүүд'

  const byLabel = lang === 'ru' ? 'Автор:' : lang === 'en' ? 'by' : 'Нийтэлсэн:'
  const readMoreLabel = lang === 'ru' ? 'Читать далее' : lang === 'en' ? 'Read more' : 'Дэлгэрэнгүй'

  return (
    <>
      <Container as="article" className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <header className="mx-auto flex max-w-5xl flex-col text-center">
            <h1 className="mt-6 font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl">
              {article.title}
            </h1>
            <time
              dateTime={article.date}
              className="order-first text-sm text-neutral-950"
            >
              {formatDate(article.date)}
            </time>
            <p className="mt-6 text-sm font-semibold text-neutral-950">
              {byLabel} {article.author.name}, {article.author.role}
            </p>
          </header>
        </FadeIn>

        <FadeIn>
          <MDXComponents.wrapper className="mt-24 sm:mt-32 lg:mt-40">
            {children}
          </MDXComponents.wrapper>
        </FadeIn>
      </Container>

      {moreArticles.length > 0 && (
        <PageLinks
          className="mt-24 sm:mt-32 lg:mt-40"
          title={moreArticlesLabel}
          pages={moreArticles}
          readMoreLabel={readMoreLabel}
        />
      )}

      <ContactSection dict={dict} lang={lang} />
    </>
  )
}
