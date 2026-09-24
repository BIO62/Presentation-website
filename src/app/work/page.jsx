import Image from 'next/image'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import logoEstel from '@/images/clients/estel/logo-light.png'
import logoSynergetic from '@/images/clients/synergetic/logo-light.png'

const brands = [
  {
    name: 'ESTEL Professional',
    href: '/work/estel',
    logo: logoEstel,
    year: '2019',
    tag: 'Мэргэжлийн үс арчилгаа',
    title: 'Монголын 1000+ мэргэжлийн салон, 1000+ үсчдийн итгэлт брэнд',
    description:
      '26 жилийн туршлагатай мэргэжлийн үс арчилгааны дэлхийн шилдэг брэнд. Өөрийн 3 томоохон үйлдвэр, шинжлэх ухааны бие даасан лабораторитой бөгөөд 2019 оноос Монгол Улсад албан ёсны дистрибьютерийн эрхтэйгээр ажиллаж байна.',
  },
  {
    name: 'SYNERGETIC',
    href: '/work/synergetic',
    logo: logoSynergetic,
    year: '2022',
    tag: 'Эко цэвэрлэгээ, арчилгаа',
    title: 'Харшлын эсрэг 95% дээш байгалийн орц найрлагатай ЭКО гэр бүлийн брэнд',
    description:
      '2013 онд ОХУ-д үүсгэн байгуулагдсан, 95%-аас дээш байгалийн орцтой эко бүтээгдэхүүн. 2022 оноос Монгол Улс дахь албан ёсны дистрибьютер эрхтэйгээр ногоон хэрэглээний соёлыг түгээж байна.',
  },
]

function Brands() {
  return (
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
  )
}

export const metadata = {
  title: 'Манай брэндүүд',
  description:
    'Тэнгэрийн Илгээмж ХХК нь ESTEL, SYNERGETIC брэндүүдийн Монгол Улс дахь албан ёсны дистрибьютер юм.',
}

export default async function Work() {
  return (
    <>
      <PageIntro
        eyebrow="Манай брэндүүд"
        title="Дэлхийн шилдэг брэндүүдийн албан ёсны төлөөлөгч"
      >
        <p>
          2013 оноос хойш ESTEL, SYNERGETIC брэндүүдийг
          Монголын үсчин, гоо сайхны салбарт албан ёсны эрхтэйгээр
          нийлүүлж байна.
        </p>
      </PageIntro>

      <Brands />

      <ContactSection />
    </>
  )
}
