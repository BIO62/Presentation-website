import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

export default function NotFound() {
  return (
    <Container className="flex h-full items-center pt-24 sm:pt-32 lg:pt-40">
      <FadeIn className="flex max-w-xl flex-col items-center text-center">
        <p className="font-display text-4xl font-semibold text-neutral-950 sm:text-5xl">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-neutral-950">
          Хуудас олдсонгүй / Страница не найдена / Page not found
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          Таны хайсан хуудас олдсонгүй. / Запрашиваемая страница не найдена. / Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          Нүүр хуудас руу буцах
        </Link>
      </FadeIn>
    </Container>
  )
}
