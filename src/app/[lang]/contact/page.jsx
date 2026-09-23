import Link from 'next/link'

import { Border } from '@/components/Border'
import { ContactForm } from '@/components/ContactForm'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'
import { PageIntro } from '@/components/PageIntro'
import { SocialMedia } from '@/components/SocialMedia'
import { getDictionary, locales } from '@/dictionaries/index'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }) {
  const dict = await getDictionary(params.lang)
  return {
    title: dict.contact.pageEyebrow,
    description: dict.metadata.contact,
  }
}

function ContactDetails({ dict }) {
  const c = dict.contact
  return (
    <FadeIn>
      <h2 className="font-display text-base font-semibold text-neutral-950">
        {c.officeTitle}
      </h2>
      <p className="mt-6 text-base text-neutral-600">
        {c.officeDescription}
      </p>

      <Offices dict={dict} className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2" />

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          {c.phoneTitle}
        </h2>
        <dl className="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
          {[[c.phoneTitle, '+976 7707-2207']].map(([label, phone]) => (
            <div key={phone}>
              <dt className="font-semibold text-neutral-950">{label}</dt>
              <dd>
                <Link
                  href={`tel:${phone.replace(/\s|-/g, '')}`}
                  className="text-neutral-600 hover:text-neutral-950"
                >
                  {phone}
                </Link>
              </dd>
            </div>
          ))}
        </dl>
      </Border>

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          {c.followTitle}
        </h2>
        <SocialMedia className="mt-6" />
      </Border>
    </FadeIn>
  )
}

export default async function Contact({ params }) {
  const { lang } = params
  const dict = await getDictionary(lang)

  return (
    <>
      <PageIntro eyebrow={dict.contact.pageEyebrow} title={dict.contact.pageTitle}>
        <p>{dict.contact.pageDescription}</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <ContactForm dict={dict} lang={lang} />
          <ContactDetails dict={dict} />
        </div>
      </Container>
    </>
  )
}
