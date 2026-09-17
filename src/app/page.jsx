import Image from 'next/image'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { HeroIntro } from '@/components/HeroIntro'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import logoEstel from '@/images/clients/estel/logo-light.png'
import logoSynergetic from '@/images/clients/synergetic/logo-light.png'
import logoConstantDelight from '@/images/clients/constant-delight/logo-light.png'

const brands = [
  ['ESTEL', logoEstel],
  ['SYNERGETIC', logoSynergetic],
  ['Constant Delight', logoConstantDelight],
]

const stats = [
  ['2013', 'Байгуулагдсан он'],
  ['70+', 'Ажилтан'],
  ['14', 'Салбар (УБ, Дархан, Эрдэнэт)'],
  ['4.5 Тэрбум ₮', '2026 оны борлуулалт'],
]

function Clients() {
  return (
    <div className="relative z-10 mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
            Бидний албан ёсны дистрибьютерээр олон улсын брэндүүд
          </h2>
          <div className="h-px flex-auto bg-neutral-800" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-1 items-center gap-x-8 gap-y-10 sm:grid-cols-3"
          >
            {brands.map(([client, logo]) => (
              <li key={client} className="flex justify-center">
                <FadeIn>
                  <Image
                    src={logo}
                    alt={client}
                    unoptimized
                    className="max-h-16 w-auto brightness-0 invert"
                  />
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}

function Stats() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeInStagger>
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4"
        >
          {stats.map(([value, label]) => (
            <li key={label}>
              <FadeIn>
                <p className="font-display text-4xl font-semibold text-neutral-950 sm:text-5xl">
                  {value}
                </p>
                <p className="mt-2 text-base text-neutral-600">{label}</p>
              </FadeIn>
            </li>
          ))}
        </ul>
      </FadeInStagger>
    </Container>
  )
}

const directions = [
  {
    title: 'Сургалтын Академи',
    description:
      'Мэргэжлийн үсчин, гоо засалчдад зориулсан тогтмол сургалт явуулдаг бөгөөд жил бүр дунджаар 500 гаруй үсчинд мэдлэг түгээдэг.',
  },
  {
    title: 'Салон худалдаа, үйлчилгээ',
    description:
      'Мэргэжлийн салонд чиглэсэн бүтээгдэхүүн нийлүүлж, хот, хөдөө орон нутагт 1000 гаруй салонтой байнгын гэрээтэй ажилладаг.',
  },
  {
    title: 'Нэрийн болон сүлжээ дэлгүүр',
    description:
      'Улаанбаатар, Дархан, Эрдэнэт хотуудад нийт 14 салбартай нэрийн болон сүлжээ дэлгүүрийн худалдаа эрхэлдэг.',
  },
  {
    title: 'Бөөний болон онлайн худалдаа',
    description:
      'Жижиглэн-бөөний болон онлайн худалдааны сувгаар бүтээгдэхүүнээ хэрэглэгчиддээ шууд хүргэдэг.',
  },
]

function Directions() {
  return (
    <>
      <SectionIntro
        eyebrow="Чиглэлүүд"
        title="Дараах чиглэлээр үйл ажиллагаагаа явуулж байна"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          2013 оноос хойш үс арчилгаа, гоо сайхны салбарт брэндийн албан ёсны
          дистрибьютерээр тогтвортой ажиллаж, чиглэлээ өргөжүүлсээр байна.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {directions.map((direction) => (
            <FadeIn key={direction.title} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 sm:p-8">
                <p className="font-display text-2xl font-semibold text-neutral-950">
                  {direction.title}
                </p>
                <p className="mt-4 text-base text-neutral-600">
                  {direction.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  )
}

function EcoPrinciples() {
  return (
    <>
      <SectionIntro
        eyebrow="Эко зарчим"
        title="Монгол улсын эко орчин, ногоон дэлхийг бүтээлцэх үйлст"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Компанийн нэг салшгүй хэсэг болгон ажиллах зарчим баримталдаг бөгөөд
          хамтран ажилладаг брэндүүд эко, байгальд ээлтэй бүтээгдэхүүн
          үйлдвэрлэдэг.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <List className="lg:w-2/3">
          <ListItem title="98.8% байгалийн гаралтай">
            SYNERGETIC брэндийн бүтээгдэхүүн 98.8%-ийн байгалийн гаралтай
            ургамлын орцтой, харшил үүсгэгчгүй, үнэртүүлэгч агуулаагүй.
          </ListItem>
          <ListItem title="Эрүүл, аюулгүй найрлага">
            SLS, SLES, парабен, силикон, эрдэс тос, будагч бодисгүй эко
            бүтээгдэхүүнийг гэр бүл, хүрээлэн буй орчинд ээлтэй байхаар
            сонгодог.
          </ListItem>
          <ListItem title="25 жилийн итгэлцэл">
            Дэлхийн шилдэг брэнд ESTEL 6 дахь жилдээ Монгол Улсад нутагшиж,
            25 жилийн түүхтэйгээр хэрэглэгчиддээ хүрч байна.
          </ListItem>
        </List>
      </Container>
    </>
  )
}

export const metadata = {
  description:
    'Тэнгэрийн Илгээмж ХХК — ESTEL, SYNERGETIC, Constant Delight брэндүүдийн албан ёсны дистрибьютер. 2013 оноос хойш Монголын үсчин, гоо сайхны салбарт ажиллаж байна.',
}

export default async function Home() {
  return (
    <>
      <div className="relative">
        {/* Текст агуулах гол контейнер */}
        <Container className="relative z-10 mt-24 sm:mt-32 md:mt-56">
          <HeroIntro />
        </Container>

        {/* Дэлгэцийн БАРУУН ТАЛД байрлах 4K лого */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-[37%] -translate-y-1/2 translate-x-[50%] z-0 select-none"
        >
          <div className="once-in">
            <Image
              src="/logomark.png"
              alt=""
              width={2053}
              height={2308}
              unoptimized
              priority
              className="w-[780px] h-auto max-w-none"
            />
          </div>
        </div>
      </div>

      <Clients />

      <Stats />

      <Directions />

      <EcoPrinciples />

      <ContactSection />
    </>
  )
}

