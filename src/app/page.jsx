import Image from 'next/image'
import Link from 'next/link'


import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { HeroIntro } from '@/components/HeroIntro'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { Testimonial } from '@/components/Testimonial'
import logoEstel from '@/images/clients/estel/logo-light.png'
import logoSynergetic from '@/images/clients/synergetic/logo-light.png'
import imageLaptop from '@/images/laptop.jpg'

const brands = [
  ['ESTEL', logoEstel],
  ['SYNERGETIC', logoSynergetic],
]

const stats = [
  ['2013', 'Байгуулагдсан он'],
  ['70+', 'Ажилтан'],
  ['14', 'Салбар (УБ, Дархан, Эрдэнэт)'],
  ['4.5 Тэрбум ₮', '2026 оны борлуулалт'],
]

const caseStudies = [
  {
    client: 'ESTEL',
    href: '/work/estel',
    logo: logoEstel,
    year: '2013',
    tag: 'Мэргэжлийн үс арчилгаа',
    title: 'Монголын 1000+ мэргэжлийн салон, 500+ үсчдийн сонголт',
    description:
      'ОХУ-д үйлдвэрлэгддэг 25 жилийн түүхтэй дэлхийн шилдэг брэнд. Монгол Улсад 6 дахь жилдээ албан ёсны эрхтэйгээр нийлүүлэгдэж, ESTEL Академиар дамжуулан үсчдийг мэргэшүүлж байна.',
  },
  {
    client: 'SYNERGETIC',
    href: '/work/synergetic',
    logo: logoSynergetic,
    year: '2018',
    tag: 'Эко цэвэрлэгээ, арчилгаа',
    title: 'Гэр бүл, хүүхдийн эрүүл мэндэд ээлтэй ногоон хэрэглээ',
    description:
      'Ургамлын гаралтай, харшил үүсгэгчгүй, SLS болон парабенгүй эко бүтээгдэхүүн. Монголын айл өрхийн эрүүл ахуй, байгаль орчныг хамгаалахад хувь нэмэр оруулж байна.',
  },
]

function Clients() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <div className="overflow-hidden">
          <div className="once-in flex items-center gap-x-8">
            <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
              Бидний албан ёсны дистрибьютер олон улсын брэндүүд
            </h2>
            <div className="h-px flex-auto bg-neutral-800" />
          </div>
        </div>
        <ul
          role="list"
          className="mt-10 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:gap-x-16"
        >
          {brands.map(([client, logo]) => (
            <li key={client} className="flex justify-center overflow-hidden">
              <div className="once-in">
                <Image
                  src={logo}
                  alt={client}
                  unoptimized
                  className="max-h-12 sm:max-h-16 w-auto brightness-0 invert"
                />
              </div>
            </li>
          ))}
        </ul>
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

function CaseStudies() {
  return (
    <>
      <SectionIntro
        title="Дэлхийн шилдэг брэндүүдийн албан ёсны төлөөлөгч"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Бид үс арчилгаа, гоо сайхан, эко цэвэрлэгээний чиглэлээр дэлхийд
          хүлээн зөвшөөрөгдсөн тэргүүлэгч брэндүүдийг Монголын зах зээлд
          албан ёсны эрхтэйгээр нийлүүлж байна.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {caseStudies.map((caseStudy) => (
            <FadeIn key={caseStudy.client} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <h3>
                  <Link href={caseStudy.href}>
                    <span className="absolute inset-0 rounded-3xl" />
                    <Image
                      src={caseStudy.logo}
                      alt={caseStudy.client}
                      className="h-12 w-auto object-contain"
                      style={{ filter: 'brightness(0)' }}
                      unoptimized
                    />
                  </Link>
                </h3>
                <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                  <span className="font-semibold">{caseStudy.year}</span>
                  <span className="text-neutral-300" aria-hidden="true">/</span>
                  <span>{caseStudy.tag}</span>
                </p>
                <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                  {caseStudy.title}
                </p>
                <p className="mt-4 text-base text-neutral-600">
                  {caseStudy.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  )
}


function Services() {
  return (
    <>
      <SectionIntro
        eyebrow="Үйл ажиллагааны чиглэл"
        title="Үс арчилгаа, гоо сайхны салбарт цогц шийдэл түгээж байна"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          2013 оноос хойш үс арчилгаа, гоо сайхны салбарт брэндийн албан ёсны
          дистрибьютерээр ажиллаж, дараах 4 үндсэн чиглэлээр үйл ажиллагаагаа
          өргөжүүлсээр байна.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-full max-w-[33.75rem] flex-none lg:w-[45rem]">
              <StylizedImage
                src={imageLaptop}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItem title="Сургалтын Академи">
              Мэргэжлийн үсчин, гоо засалчдад зориулсан тогтмол сургалт
              явуулдаг бөгөөд жил бүр дунджаар 500 гаруй үсчинд мэдлэг түгээдэг.
            </ListItem>
            <ListItem title="Салон худалдаа, үйлчилгээ">
              Мэргэжлийн салонд чиглэсэн бүтээгдэхүүн нийлүүлж, хот, хөдөө орон
              нутагт 1000 гаруй салонтой байнгын гэрээтэй ажилладаг.
            </ListItem>
            <ListItem title="Нэрийн болон сүлжээ дэлгүүр">
              Улаанбаатар, Дархан, Эрдэнэт хотуудад нийт 14 салбартай нэрийн
              болон сүлжээ дэлгүүрийн худалдаа эрхэлдэг.
            </ListItem>
            <ListItem title="Бөөний болон онлайн худалдаа">
              Жижиглэн-бөөний болон онлайн худалдааны сувгаар бүтээгдэхүүнээ
              хэрэглэгчиддээ шууд хүргэдэг.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  )
}

export const metadata = {
  description:
    'Тэнгэрийн Илгээмж ХХК — ESTEL, SYNERGETIC брэндүүдийн албан ёсны дистрибьютер. 2013 оноос хойш Монголын үсчин, гоо сайхны салбарт ажиллаж байна.',
}

export default async function Home() {
  return (
    <>
      <div className="relative overflow-x-clip overflow-y-visible">
        {/* Текст агуулах гол контейнер (Studio-ийн яг үндсэн mt-24 sm:mt-32 md:mt-56 хэмжээс) */}
        <Container className="relative z-10 mt-24 sm:mt-32 md:mt-56">
          <HeroIntro />
        </Container>

        {/* =========================================================================
            1. DESKTOP ХУВИЛБАР (hidden lg:block)
            Таны яг өөрөө тааруулсан 780px хэмжээтэй, баруун тийш 50% тайрагдсан лого.
            - overflow-x-clip overflow-y-visible тул доороосоо тайрагдахгүй
            - once-in класс хэвээрээ тул урсаж орж ирэх хөдөлгөөнтэй
            - layout шахаж түлхэхгүйгээр overlay байдлаар шууд дээр нь сууна
           ========================================================================= */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-[37%] -translate-y-1/2 translate-x-[50%] z-0 select-none hidden lg:block"
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

        {/* =========================================================================
            2. MOBILE ХУВИЛБАР (lg:hidden)
            Studio загварын яг ард суух 50% тайралттай лого:
            - translate-x-[50%] -> Баруун тийш яг 50% тайрагдсан
            - top-[42%] -translate-y-1/2 -> Гарчиг болон текстийн ард яг тэнцвэртэй байрлалтай
            - w-[360px] sm:w-[460px] -> 50% цухуйхад маш гоёмсог харагдах өргөн
            - opacity-20 -> Текст уншихад саад болохгүй усны тамга (watermark)
           ========================================================================= */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-[42%] -translate-y-1/2 translate-x-[50%] z-0 select-none opacity-20 lg:hidden"
        >
          <div className="once-in">
            <Image
              src="/logomark.png"
              alt=""
              width={2053}
              height={2308}
              unoptimized
              priority
              className="w-[360px] sm:w-[460px] h-auto max-w-none"
            />
          </div>
        </div>
      </div>

      <Clients />

      <Stats />

      <CaseStudies />

      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'ESTEL', logo: logoEstel }}
      >
        Бид дэлхийн жишигт нийцсэн чанартай бүтээгдэхүүн, мэргэжлийн сургалт,
        тогтвортой нийлүүлэлтээр Монголын үсчин, гоо сайхны салбарт найдвартай
        түнш болсоор ирсэн.
      </Testimonial>

      <Services />

      <ContactSection />
    </>
  )
}
