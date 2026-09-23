import Link from 'next/link'

import { Container } from '@/components/Container'
import { useCurveNavigation } from '@/components/Curve'
import { FadeIn } from '@/components/FadeIn'
import { Logo } from '@/components/Logo'

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 16 6" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3 10 .5v2H0v1h10v2L16 3Z"
      />
    </svg>
  )
}

// Брэнд бүрийн албан ёсны сошиал хуудас
const brandSocialLinks = [
  { heading: 'ESTEL' },
  { title: 'Facebook', href: 'https://www.facebook.com/ESTELMongolia' },
  { title: 'Instagram', href: 'https://www.instagram.com/estelmongolia/' },
  { heading: 'SYNERGETIC' },
  { title: 'Facebook', href: 'https://www.facebook.com/SynergeticMongolia' },
  { title: 'Instagram', href: 'https://www.instagram.com/synergetic_mongolia/' },
]

function FooterNavigation({ lang, dict }) {
  const { navigateTo } = useCurveNavigation()

  const navigation = [
    {
      title: dict?.footer?.brands ?? 'Брэндүүд',
      links: [
        { title: 'ESTEL', href: `/${lang}/work/estel` },
        { title: 'SYNERGETIC', href: `/${lang}/work/synergetic` },
        {
          title: (
            <>
              {dict?.footer?.more ?? 'Дэлгэрэнгүй'}{' '}
              <span aria-hidden="true">&rarr;</span>
            </>
          ),
          href: `/${lang}/work`,
        },
      ],
    },
    {
      title: dict?.footer?.company ?? 'Компани',
      links: [
        { title: dict?.footer?.about ?? 'Бидний тухай', href: `/${lang}/about` },
        { title: dict?.footer?.process ?? 'Үйл ажиллагаа', href: `/${lang}/process` },
        { title: dict?.footer?.blog ?? 'Мэдээ мэдээлэл', href: `/${lang}/blog` },
        { title: dict?.footer?.contactLink ?? 'Холбоо барих', href: `/${lang}/contact` },
      ],
    },
    {
      title: dict?.footer?.links ?? 'Холбоос',
      links: brandSocialLinks,
    },
  ]

  return (
    <nav>
      <ul role="list" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
        {navigation.map((section) => (
          <li key={section.title}>
            <div className="font-display text-sm font-semibold tracking-wider text-neutral-950">
              {section.title}
            </div>
            <ul role="list" className="mt-4 text-sm text-neutral-700">
              {section.links.map((link, idx) => {
                if (link.heading) {
                  return (
                    <li
                      key={link.heading}
                      className="mt-6 text-xs font-semibold tracking-wider text-neutral-950 first:mt-4"
                    >
                      {link.heading}
                    </li>
                  )
                }
                const isInternal = typeof link.href === 'string' && link.href.startsWith('/')
                return (
                  <li key={idx} className={link.href?.startsWith('http') ? 'mt-2' : 'mt-4'}>
                    {isInternal ? (
                      <Link
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault()
                          navigateTo(link.href)
                        }}
                        className="transition hover:text-neutral-950"
                      >
                        {link.title}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition hover:text-neutral-950"
                      >
                        {link.title} <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </li>
                )
              })}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function NewsletterForm({ dict }) {
  const newsletter = dict?.footer?.newsletter ?? {}
  return (
    <form className="max-w-sm">
      <h2 className="font-display text-sm font-semibold tracking-wider text-neutral-950">
        {newsletter.title ?? 'Шинэ мэдээлэл хүлээн авах'}
      </h2>
      <p className="mt-4 text-sm text-neutral-700">
        {newsletter.description ?? 'Бидний шинэ төсөл, сонирхолтой нийтлэл болон салбарын шинэ содон мэдээллүүдийг цаг алдалгүй аваарай.'}
      </p>
      <div className="relative mt-6">
        <input
          type="email"
          placeholder={newsletter.placeholder ?? 'И-мэйл хаягаа оруулна уу...'}
          autoComplete="email"
          aria-label="Email address"
          className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
        />
        <div className="absolute inset-y-1 right-1 flex justify-end">
          <button
            type="submit"
            aria-label="Submit"
            className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
          >
            <ArrowIcon className="w-4" />
          </button>
        </div>
      </div>
    </form>
  )
}

export function Footer({ lang = 'mn', dict = {} }) {
  const { navigateTo } = useCurveNavigation()
  const homeHref = `/${lang}`

  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <FooterNavigation lang={lang} dict={dict} />
          <div className="flex lg:justify-end">
            <NewsletterForm dict={dict} />
          </div>
        </div>
        <div className="mb-28 mt-16 flex flex-col items-center gap-y-5 border-t border-neutral-950/10 pt-10 text-center sm:mt-24 sm:flex-row sm:flex-wrap sm:justify-between sm:gap-x-6 sm:pt-12 sm:text-left">
          <Link
            href={homeHref}
            aria-label="Home"
            className="flex items-center"
            onClick={(e) => {
              e.preventDefault()
              navigateTo(homeHref)
            }}
          >
            <Logo fillOnHover />
          </Link>
          <p className="text-sm leading-relaxed text-neutral-700 sm:leading-none">
            © {new Date().getFullYear()} {dict?.metadata?.siteName ?? 'Тэнгэрийн Илгээмж'}.{' '}
            {dict?.footer?.copyright ?? 'Бүх эрх хуулиар хамгаалагдсан'}
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}
