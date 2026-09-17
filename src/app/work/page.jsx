import Image from 'next/image'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import logoEstel from '@/images/clients/estel/logo-light.png'
import logoSynergetic from '@/images/clients/synergetic/logo-light.png'
import logoConstantDelight from '@/images/clients/constant-delight/logo-light.png'

const brands = [
  {
    name: 'ESTEL',
    logo: logoEstel,
    origin: 'Орос улс',
    tagline: 'Beauty has a name',
    summary: [
      'ОХУ-д үйлдвэрлэгддэг, 25 жилийн түүхтэй дэлхийн шилдэг салоны үс арчилгаа, гоо сайхны брэнд. Монгол Улсад 6 дахь жилдээ нутагшиж, хэрэглэгчиддээ тогтвортой хүрч байна.',
      'Хот, хөдөө орон нутагт 1000 гаруй мэргэжлийн салонтой байнгын гэрээтэй хамтран ажилладаг бөгөөд 5 албан ёсны нэрийн дэлгүүр, мэргэжлийн салонд чиглэсэн 5 салбар дэлгүүртэй.',
      'ESTEL Академийн хүрээнд жил бүр дунджаар 500 гаруй мэргэжлийн үсчинд сургалт явуулж, 4 удаа 21 аймгаар тойрч сургалт хийсэн. Улс, нийслэл, аймаг, бүсийн үсчин гоо сайханчдын тэмцээнд жил бүр 40-50 сая төгрөгийн ивээн тэтгэлэг зарцуулдаг.',
    ],
  },
  {
    name: 'SYNERGETIC',
    logo: logoSynergetic,
    origin: 'Орос улс',
    tagline: '98.8% байгалийн гаралтай',
    summary: [
      'ОХУ-д үйлдвэрлэгддэг, 98.8%-ийн байгалийн гаралтай ургамлын орцтой гоо сайхан, гэр ахуйн цэвэрлэгээний эко бүтээгдэхүүн. Харшил үүсгэгчгүй, үнэртүүлэгч агуулаагүй.',
      'SLS, SLES, парабен, силикон, эрдэс тос, будагч бодисгүй — гэр бүлийн гишүүн бүрт, тэр дундаа хүүхэдтэй өрх толгойлсон гэр бүлд ээлтэй байхаар зохион бүтээгдсэн.',
    ],
  },
  {
    name: 'Constant Delight',
    logo: logoConstantDelight,
    origin: 'Итали улс',
    tagline: 'Салон худалдааны шинэ түнш',
    summary: [
      'Итали улсад үйлдвэрлэгддэг салоны үс арчилгааны бүтээгдэхүүн. 2024 оны 9 дүгээр сараас эхлэн Монгол Улсад албан ёсны эрхтэйгээр салон болон мэргэжлийн үсчдийн зах зээлд борлуулагдаж байна.',
    ],
  },
]

function Brands() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="space-y-20 sm:space-y-24 lg:space-y-32">
        {brands.map((brand) => (
          <FadeIn key={brand.name}>
            <article className="grid grid-cols-1 gap-x-8 gap-y-8 border-t border-neutral-200 pt-16 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <div className="flex h-16 items-center">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-14 w-auto"
                    unoptimized
                  />
                </div>
                <p className="mt-6 text-sm font-semibold text-neutral-950">
                  {brand.origin}
                </p>
                <p className="mt-1 text-sm text-neutral-600">
                  {brand.tagline}
                </p>
              </div>
              <div className="lg:col-span-2 lg:max-w-2xl">
                <div className="space-y-6 text-base text-neutral-600">
                  {brand.summary.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </Container>
  )
}

export const metadata = {
  title: 'Манай брэндүүд',
  description:
    'Тэнгэрийн Илгээмж ХХК нь ESTEL, SYNERGETIC, Constant Delight брэндүүдийн Монгол Улс дахь албан ёсны дистрибьютер юм.',
}

export default async function Work() {
  return (
    <>
      <PageIntro
        eyebrow="Манай брэндүүд"
        title="Дэлхийн шилдэг брэндүүдийн албан ёсны төлөөлөгч"
      >
        <p>
          2013 оноос хойш ESTEL, SYNERGETIC, Constant Delight брэндүүдийг
          Монголын үсчин, гоо сайхны салбарт албан ёсны эрхтэйгээр
          нийлүүлж байна.
        </p>
      </PageIntro>

      <Brands />

      <ContactSection />
    </>
  )
}
