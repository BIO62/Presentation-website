import Image from 'next/image'
import Link from 'next/link'

// Карт бүхэлдээ дотоод хуудас (/[lang]/news/[slug]) руу холбогдоно
export function NewsCard({ item, moreLabel }) {
  return (
    <article className="h-full">
      <Link href={item.href} className="group flex h-full flex-col">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-neutral-100">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 88vw"
            className="object-cover"
          />
          <span className="absolute left-4 top-4 rounded-full bg-brand-yellow px-3 py-1 text-xs font-semibold text-neutral-950">
            {item.category}
          </span>
        </div>
        <time
          dateTime={item.date}
          className="mt-5 text-sm font-semibold tabular-nums text-neutral-500"
        >
          {item.dateLabel}
        </time>
        <h3 className="mt-2 line-clamp-2 font-display text-lg font-semibold text-neutral-950">
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-neutral-600">
          {item.excerpt}
        </p>
        <span className="mt-4 inline-flex w-fit items-center gap-x-1.5 text-sm font-semibold text-brand-blue transition group-hover:text-neutral-950">
          {moreLabel}
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </Link>
    </article>
  )
}
