import Image from 'next/image'

import { Border } from '@/components/Border'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { StatList, StatListItem } from '@/components/StatList'
import { getDictionary, locales } from '@/dictionaries/index'
import imageAngelaFisher from '@/images/team/angela-fisher.jpeg'
import imageBenjaminRussel from '@/images/team/benjamin-russel.jpeg'
import imageBlakeReid from '@/images/team/blake-reid.jpeg'
import imageChelseaHagon from '@/images/team/chelsea-hagon.jpeg'
import imageDriesVincent from '@/images/team/dries-vincent.jpeg'
import imageEmmaDorsey from '@/images/team/emma-dorsey.jpeg'
import imageKathrynMurphy from '@/images/team/kathryn-murphy.jpeg'
import imageLeonardKrasner from '@/images/team/leonard-krasner.jpeg'
import imageLeslieAlexander from '@/images/team/leslie-alexander.jpeg'
import imageMichaelFoster from '@/images/team/michael-foster.jpeg'
import imageWhitneyFrancis from '@/images/team/whitney-francis.jpeg'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }) {
  const dict = await getDictionary(params.lang)
  return {
    title: dict.about.eyebrow,
    description: dict.metadata.about,
  }
}

function Culture({ dict }) {
  const values = dict.about.culture.valuesList || []
  return (
    <div className="mt-24 rounded-4xl bg-gradient-to-br from-neutral-950 via-brand-blue to-brand-blue-light py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow={dict.about.culture.eyebrow}
        title={dict.about.culture.title}
        invert
      >
        <p>{dict.about.culture.description}</p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          {values.map((val) => (
            <GridListItem key={val.title} title={val.title} invert>
              {val.text}
            </GridListItem>
          ))}
        </GridList>
      </Container>
    </div>
  )
}

function getTeam(lang, dict) {
  const isRu = lang === 'ru'
  const isEn = lang === 'en'

  return [
    {
      title: dict.about.team.management,
      people: [
        {
          name: isEn ? 'Oleg Tulin' : 'Тулин Олег',
          role: isRu ? 'Генеральный директор' : isEn ? 'CEO' : 'Ерөнхий захирал',
          image: { src: imageBenjaminRussel },
        },
        {
          name: isRu ? 'Н. Олзийхутаг' : isEn ? 'N. Ulziikhutag' : 'Н. Өлзийхутаг',
          role: isRu ? 'Исполнительный директор' : isEn ? 'Executive Director' : 'Гүйцэтгэх захирал',
          image: { src: imageLeslieAlexander },
        },
        {
          name: isRu ? 'Ж. Нямдорж' : isEn ? 'J. Nyamdorj' : 'Ж. Нямдорж',
          role: isRu ? 'Заместитель директора' : isEn ? 'Deputy Director' : 'Орлогч захирал',
          image: { src: imageMichaelFoster },
        },
        {
          name: isRu ? 'Б. Уранчимэг' : isEn ? 'B. Uranchimeg' : 'Б. Уранчимэг',
          role: isRu ? 'Финансовый директор' : isEn ? 'Chief Financial Officer' : 'Санхүү хариуцсан захирал',
          image: { src: imageLeslieAlexander },
        },
        {
          name: isRu ? 'Д. Мунхбаяр' : isEn ? 'D. Munkhbayar' : 'Д. Мөнхбаяр',
          role: isRu ? 'Директор по развитию продаж и сервиса' : isEn ? 'Sales & Service Development Director' : 'Борлуулалт, үйлчилгээ хөгжил хариуцсан захирал',
          image: { src: imageDriesVincent },
        },
      ],
    },
    {
      title: dict.about.team.managers,
      people: [
        {
          name: isRu ? 'О. Золжаргал' : isEn ? 'O. Zoljargal' : 'О. Золжаргал',
          role: isRu ? 'Менеджер филиала в Дархане' : isEn ? 'Darkhan Branch Manager' : 'Дархан салбар хариуцсан менежер',
          image: { src: imageChelseaHagon },
        },
        {
          name: isRu ? 'М. Гэрэлтуяа' : isEn ? 'M. Gereltuya' : 'М. Гэрэлтуяа',
          role: isRu ? 'Менеджер филиала в Эрдэнэте' : isEn ? 'Erdenet Branch Manager' : 'Эрдэнэт салбар хариуцсан менежер',
          image: { src: imageEmmaDorsey },
        },
        {
          name: isRu ? 'Ч. Дуламсурэн' : isEn ? 'Ch. Dulamsuren' : 'Ч. Дуламсүрэн',
          role: isRu ? 'Менеджер фирменных магазинов' : isEn ? 'Brand Store Manager' : 'Нэрийн дэлгүүр хариуцсан менежер',
          image: { src: imageLeonardKrasner },
        },
        {
          name: isRu ? 'Х. Отгонбаатар' : isEn ? 'Kh. Otgonbaatar' : 'Х. Отгонбаатар',
          role: isRu ? 'Старший технолог-преподаватель' : isEn ? 'Senior Technologist & Instructor' : 'Ахлах технологич багш',
          image: { src: imageBlakeReid },
        },
        {
          name: 'Kathryn Murphy',
          role: isRu ? 'Вице-президент по HR' : isEn ? 'VP, Human Resources' : 'Хүний нөөцийн дэд ерөнхийлөгч',
          image: { src: imageKathrynMurphy },
        },
        {
          name: 'Whitney Francis',
          role: isRu ? 'Контент-специалист' : isEn ? 'Content Specialist' : 'Контент мэргэжилтэн',
          image: { src: imageWhitneyFrancis },
        },
        {
          name: 'Angela Fisher',
          role: isRu ? 'Фронтенд-разработчик' : isEn ? 'Front-end Developer' : 'Вэб хөгжүүлэгч',
          image: { src: imageAngelaFisher },
        },
      ],
    },
  ]
}

function Team({ lang, dict }) {
  const team = getTeam(lang, dict)

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
                            className="h-96 w-full object-cover transition duration-500 motion-safe:group-hover:scale-105"
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

export default async function About({ params }) {
  const { lang } = params
  const dict = await getDictionary(lang)

  return (
    <>
      <PageIntro eyebrow={dict.about.eyebrow} title={dict.about.title}>
        <p>{dict.about.intro1}</p>
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>{dict.about.intro2}</p>
          <p>{dict.about.intro3}</p>
        </div>
        {dict.about.mission && (
          <div className="mt-12 rounded-3xl bg-neutral-50 p-8 ring-1 ring-neutral-950/5">
            <p className="font-display text-xs font-semibold uppercase tracking-wider text-neutral-500">
              {dict.about.mission.title}
            </p>
            <p className="mt-3 font-display text-xl font-medium tracking-tight text-neutral-950 sm:text-2xl">
              {dict.about.mission.text}
            </p>
          </div>
        )}
      </PageIntro>
      <Container className="mt-16">
        <StatList>
          <StatListItem value="60+" label={dict.about.stats.employees} />
          <StatListItem value="10" label={dict.about.stats.branches} />
          <StatListItem value="21" label={dict.about.stats.provinces} />
        </StatList>
      </Container>

      <Culture dict={dict} />

      <Team lang={lang} dict={dict} />

      <ContactSection dict={dict} lang={lang} />
    </>
  )
}
