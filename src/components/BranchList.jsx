'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'

function BranchCard({ branch, labels }) {
  return (
    <div
      className={clsx(
        'h-full overflow-hidden rounded-3xl ring-1 ring-neutral-950/5',
        !branch.image && 'p-6'
      )}
    >
      {branch.image && (
        <div className="relative aspect-[4/3]">
          <Image
            src={branch.image}
            alt={branch.name}
            fill
            sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className={clsx(branch.image && 'p-6')}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h4 className="font-display text-lg font-semibold text-neutral-950">
            {branch.name}
          </h4>
          {branch.isNew && (
            <span className="rounded-full bg-brand-yellow px-2.5 py-0.5 text-xs font-semibold text-neutral-950">
              {labels.new}
            </span>
          )}
        </div>
        <div className="mt-3 space-y-1 text-sm text-neutral-600">
          {branch.location && <p>{branch.location}</p>}
          {branch.phone && (
            <p>
              <a
                href={`tel:${branch.phone.replace(/\D/g, '')}`}
                className="hover:text-neutral-950"
              >
                {branch.phone}
              </a>
            </p>
          )}
          {branch.hours && <p>{branch.hours}</p>}
        </div>
        <a
          href={branch.mapHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-x-1.5 text-sm font-semibold text-brand-blue transition hover:text-neutral-950"
        >
          {labels.map}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  )
}

// /[lang]/contact: хотоор бүлэглэсэн салбар дэлгүүрүүд
export function BranchList({ groups, labels, className }) {
  // Нүүр хуудасны "Бүх салбар харах →" (/[lang]/contact#branches) холбоосоор ирэхэд энэ хэсэг рүү гүйлгэнэ:
  // хуудас хооронд шилжихэд Next.js #hash-ийг өөрөө гүйлгэдэггүй
  useEffect(() => {
    if (window.location.hash !== '#branches') return
    const timer = setTimeout(() => {
      document.getElementById('branches')?.scrollIntoView({ block: 'start' })
    }, 150)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="branches"
      aria-labelledby="branches-title"
      className={clsx('scroll-mt-24', className)}
    >
      <Container>
        <FadeIn>
          <h2
            id="branches-title"
            className="font-display text-4xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-5xl"
          >
            {labels.title}
          </h2>
        </FadeIn>
        <div className="mt-16 space-y-16">
          {groups.map((group) => (
            <div key={group.city}>
              <FadeIn>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  {group.city}
                </h3>
              </FadeIn>
              <FadeInStagger className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((branch) => (
                  <FadeIn key={branch.id}>
                    <BranchCard branch={branch} labels={labels} />
                  </FadeIn>
                ))}
              </FadeInStagger>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
