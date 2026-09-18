import Image from 'next/image'

import { Border } from '@/components/Border'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { StatList, StatListItem } from '@/components/StatList'
import imageAngelaFisher from '@/images/team/angela-fisher.jpeg'
import imageBenjaminRussel from '@/images/team/benjamin-russel.jpeg'
import imageBlakeReid from '@/images/team/blake-reid.jpeg'
import imageChelseaHagon from '@/images/team/chelsea-hagon.jpeg'
import imageDriesVincent from '@/images/team/dries-vincent.jpeg'
import imageEmmaDorsey from '@/images/team/emma-dorsey.jpeg'
import imageJeffreyWebb from '@/images/team/jeffrey-webb.jpeg'
import imageKathrynMurphy from '@/images/team/kathryn-murphy.jpeg'
import imageLeonardKrasner from '@/images/team/leonard-krasner.jpeg'
import imageLeslieAlexander from '@/images/team/leslie-alexander.jpeg'
import imageMichaelFoster from '@/images/team/michael-foster.jpeg'
import imageWhitneyFrancis from '@/images/team/whitney-francis.jpeg'

function Culture() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow="Бидний зарчим"
        title="Чанар, байгальд ээлтэй байдал, тасралтгүй суралцахуйг эрхэмлэнэ"
        invert
      >
        <p>
          2013 оноос хойш баримталж ирсэн зарчмаа хадгалсаар, чиглэлээ
          өргөжүүлсээр байна.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Чанар" invert>
            Дэлхийд танигдсан брэндүүдийн албан ёсны дистрибьютерээр ажиллаж,
            хэрэглэгчдэдээ баталгаатай, чанартай бүтээгдэхүүн хүргэдэг.
          </GridListItem>
          <GridListItem title="Байгальд ээлтэй" invert>
            SYNERGETIC зэрэг 98.8% байгалийн гаралтай, SLS/парабенгүй эко
            бүтээгдэхүүнийг сонгож, ногоон дэлхийг бүтээлцэхийг эрхэмлэдэг.
          </GridListItem>
          <GridListItem title="Тасралтгүй суралцахуй" invert>
            Сургалтын Академийн хүрээнд жил бүр 500 гаруй мэргэжлийн үсчинд
            мэдлэгээ түгээж, салбарын хөгжилд хувь нэмрээ оруулдаг.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

const team = [
  {
    title: 'Удирдлага',
    people: [
      {
        name: 'Тулин Олег',
        role: 'Ерөнхий захирал',
        image: { src: imageBenjaminRussel},
      },
      {
        name: 'Н. Өлзийхутаг',
        role: 'Гүйцэтгэх захирал',
        image: { src:  imageLeslieAlexander  },
      },
      {
        name: 'Ж. Нямдорж',
        role: 'Орлогч захирал',
        image: { src: imageMichaelFoster },
      },
            {
        name: 'Б. Уранчимэг',
        role: 'Санхүү хариуцсан захирал',
        image: { src: imageLeslieAlexander },
      },
                  {
        name: 'Д. Мөнхбаяр',
        role: 'Борлуулалт, үйлчилгээ хөгжил хариуцсан захирал',
        image: { src: imageDriesVincent },
      },
    ],
  },
  {
    title: 'Менежер\nБаг хамт олон',
    people: [
      {
        name: 'О. Золжаргал',
        role: 'Дархан салбар харицсан менежер',
        image: { src: imageChelseaHagon },
      },
      {
        name: 'М. Гэрэлтуяа',
        role: 'Эрдэнэт салбар хариуцсан менежер',
        image: { src: imageEmmaDorsey },
      },
      {
        name: 'Ч. Дуламсүрэн',
        role: 'Нэрийн дэлгүүр хариуцсан менежер',
        image: { src: imageLeonardKrasner },
      },
      {
        name: 'Х. Отгонбаатар',
        role: 'Ахлан технологич багш',
        image: { src: imageBlakeReid },
      },
      {
        name: 'Kathryn Murphy',
        role: 'VP, Human Resources',
        image: { src: imageKathrynMurphy },
      },
      {
        name: 'Whitney Francis',
        role: 'Content Specialist',
        image: { src: imageWhitneyFrancis },
      },
      {
        name: 'Jeffrey Webb',
        role: 'Account Coordinator',
        image: { src: imageJeffreyWebb },
      },
      {
        name: 'Benjamin Russel',
        role: 'Senior Developer',
        image: { src: imageBenjaminRussel },
      },
      {
        name: 'Angela Fisher',
        role: 'Front-end Developer',
        image: { src: imageAngelaFisher },
      },
    ],
  },
]

function Team() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="space-y-24">
        {team.map((group) => (
          <FadeInStagger key={group.title}>
            <Border as={FadeIn} />
            <div className="grid grid-cols-1 gap-6 pt-12 sm:pt-16 lg:grid-cols-4 xl:gap-8">
              <FadeIn>
                <h2 className="whitespace-pre-line font-display text-2xl font-semibold text-neutral-950">
                  {group.title}
                </h2>
              </FadeIn>
              <div className="lg:col-span-3">
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
                >
                  {group.people.map((person) => (
                    <li key={person.name}>
                      <FadeIn>
                        <div className="group relative overflow-hidden rounded-3xl bg-neutral-100">
                          <Image
                            alt=""
                            {...person.image}
                            className="h-96 w-full object-cover grayscale transition duration-500 motion-safe:group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-black/0 to-40% p-6">
                            <p className="font-display text-base/6 font-semibold tracking-wide text-white">
                              {person.name}
                            </p>
                            <p className="mt-2 text-sm text-white">
                              {person.role}
                            </p>
                          </div>
                        </div>
                      </FadeIn>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInStagger>
        ))}
      </div>
    </Container>
  )
}

export const metadata = {
  title: 'Бидний тухай',
  description:
    'Тэнгэрийн Илгээмж ХХК — 2013 оноос хойш ESTEL, SYNERGETIC брэндүүдийн албан ёсны дистрибьютерээр ажиллаж байна.',
}

export default async function About() {
  return (
    <>
      <PageIntro eyebrow="Бидний тухай" title="2013 оноос хойших итгэлцэл">
        <p>
          Тэнгэрийн Илгээмж ХХК нь 2013 онд байгуулагдсан бөгөөд ESTEL,
          SYNERGETIC брэндүүдийн Монгол дахь албан ёсны
          дистрибьютер юм.
        </p>
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>
            Сургалтын Академи, салон худалдаа/үйлчилгээ, нэрийн болон сүлжээ
            дэлгүүр, жижиглэн-бөөний болон онлайн худалдаа гэсэн үндсэн
            чиглэлүүдээр ажилладаг. Улаанбаатар, Дархан, Эрдэнэт хотуудад
            нийт 14 салбартай.
          </p>
          <p>
            ESTEL брэнд 1000 гаруй салонтой байнгын гэрээтэй ажилладаг бол
            SYNERGETIC нь 98.8% байгалийн гаралтай, эко бүтээгдэхүүнээрээ
            танигдсан. Жил бүр 500 гаруй мэргэжлийн үсчинд сургалт явуулж,
            салбарын хөгжилд тогтмол хувь нэмрээ оруулсаар байна.
          </p>
        </div>
      </PageIntro>
      <Container className="mt-16">
        <StatList>
          <StatListItem value="70+" label="Ажилтан" />
          <StatListItem value="14" label="Салбар" />
          <StatListItem value="4.5 тэрбум₮" label="2024 оны борлуулалт" />
        </StatList>
      </Container>

      <Culture />

      <Team />

      <ContactSection />
    </>
  )
}
