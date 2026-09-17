import clsx from 'clsx'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'

export function PageIntro({ eyebrow, title, children, centered = false }) {
  return (
    <Container
      className={clsx('mt-12 sm:mt-24 lg:mt-40', centered && 'text-center')}
    >
      <FadeInStagger faster>
        <h1>
          <FadeIn>
            <span className="block font-display text-base font-semibold text-neutral-950">
              {eyebrow}
            </span>
          </FadeIn>
          <span className="sr-only"> - </span>
          <FadeIn>
            <span
              className={clsx(
                'mt-6 block max-w-5xl font-display text-3xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-5xl lg:text-6xl',
                centered && 'mx-auto'
              )}
            >
              {title}
            </span>
          </FadeIn>
        </h1>
        <FadeIn>
          <div
            className={clsx(
              'mt-6 max-w-3xl text-base sm:text-xl text-neutral-600',
              centered && 'mx-auto'
            )}
          >
            {children}
          </div>
        </FadeIn>
      </FadeInStagger>
    </Container>
  )
}
