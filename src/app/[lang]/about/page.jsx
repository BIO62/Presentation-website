import { Border } from '@/components/Border'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { HomeStats } from '@/components/HomeStats'
import { TeamCard } from '@/components/TeamCard'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { Timeline } from '@/components/Timeline'
import { getDictionary, locales } from '@/dictionaries/index'

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

function withHighlight(text, highlight) {
  let at = highlight ? text.indexOf(highlight) : -1
  if (at === -1) return text

  return (
    <>
      {text.slice(0, at)}
      <strong className="font-semibold text-neutral-950">{highlight}</strong>
      {text.slice(at + highlight.length)}
    </>
  )
}

function Mission({ mission }) {
  const lines = mission.lines?.length ? mission.lines : [mission.text]

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-neutral-500">
          {mission.title}
        </h2>
      </FadeIn>
      <FadeInStagger
        faster
        className="mt-8 max-w-6xl font-display text-2xl font-medium leading-[1.4] tracking-tight text-neutral-950 sm:text-4xl sm:leading-[1.3]"
      >
        {lines.map((line) => (
          <FadeIn key={line} className="[text-wrap:balance]">
            {line}
          </FadeIn>
        ))}
      </FadeInStagger>
    </Container>
  )
}

function History({ timeline }) {
  return (
    <>
      <SectionIntro title={timeline.title} className="mt-24 sm:mt-32 lg:mt-40" />
      <Container className="mt-16">
        <Timeline items={timeline.items} />
      </Container>
    </>
  )
}

function Culture({ dict }) {
  const values = dict.about.culture.valuesList || []
  return (
    <div className="mt-24 rounded-4xl bg-gradient-to-br from-neutral-950 via-brand-blue to-brand-blue-light py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow={dict.about.culture.eyebrow}
        title={dict.about.culture.title}
        invert
      />
      <Container className="mt-16">
        <FadeInStagger faster>
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {values.map((value, i) => (
              <li key={value.title} className="flex">
                <FadeIn className="flex w-full">
                  <div className="group w-full rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 transition duration-300 hover:bg-white/10 hover:ring-white/25">
                    <p className="font-display text-sm font-semibold text-neutral-400 transition-colors duration-300 group-hover:text-brand-yellow">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-6 font-display text-lg font-semibold text-white">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-base text-neutral-300">
                      {value.text}
                    </p>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}

function getTeam(lang, dict) {
  const isRu = lang === 'ru'
  const isEn = lang === 'en'

  // image нь заавал биш: жинхэнэ зураг ирэхээр `image: { src: imagePerson }` нэмэхэд
  // нэрийн эхний үсгийн avatar-ын оронд зураг гарна.
  return [
    {
      title: dict.about.team.management,
      people: [
        {
          name: isEn ? 'Oleg Tulin' : 'Тулин Олег',
          role: isRu ? 'Генеральный директор' : isEn ? 'CEO' : 'Ерөнхий захирал',
        },
        {
          name: 'Н. Өлзий-Хутаг',
          role: isRu ? 'Исполнительный директор' : isEn ? 'Executive Director' : 'Гүйцэтгэх захирал',
        },
        {
          name: isEn ? 'J. Nyamdorj' : 'Ж. Нямдорж',
          role: isRu ? 'Заместитель директора' : isEn ? 'Deputy Director' : 'Орлогч захирал',
        },
        {
          name: isEn ? 'B. Uranchimeg' : 'Б. Уранчимэг',
          role: isRu ? 'Финансовый директор' : isEn ? 'Chief Financial Officer' : 'Санхүү хариуцсан захирал',
        },
        {
          name: isEn ? 'D. Munkhbayar' : 'Д. Мөнхбаяр',
          role: isRu ? 'Директор по развитию продаж и сервиса' : isEn ? 'Sales & Service Development Director' : 'Борлуулалт, үйлчилгээ хөгжил хариуцсан захирал',
        },
      ],
    },
    {
      title: dict.about.team.managers,
      people: [
        {
          name: isEn ? 'O. Zoljargal' : 'О. Золжаргал',
          role: isRu ? 'Менеджер филиала в Дархане' : isEn ? 'Darkhan Branch Manager' : 'Дархан салбар хариуцсан менежер',
        },
        {
          name: isEn ? 'M. Gereltuya' : 'М. Гэрэлтуяа',
          role: isRu ? 'Менеджер филиала в Эрдэнэте' : isEn ? 'Erdenet Branch Manager' : 'Эрдэнэт салбар хариуцсан менежер',
        },
        {
          name: isEn ? 'Ch. Dulamsuren' : 'Ч. Дуламсүрэн',
          role: isRu ? 'Менеджер фирменных магазинов' : isEn ? 'Brand Store Manager' : 'Нэрийн дэлгүүр хариуцсан менежер',
        },
        {
          name: isEn ? 'Kh. Otgonbaatar' : 'Х. Отгонбаатар',
          role: isRu ? 'Старший технолог-преподаватель' : isEn ? 'Senior Technologist & Instructor' : 'Ахлах технологич багш',
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
                        <TeamCard person={person} />
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
          <p>{dict.about.intro3}</p>
          <p>{withHighlight(dict.about.intro4, dict.about.intro4Highlight)}</p>
        </div>
      </PageIntro>

      <HomeStats
        stats={[
          ['15', dict.about.stats.branches],
          ['21', dict.about.stats.provinces],
        ]}
        className="mt-16"
      />

      {dict.about.mission && <Mission mission={dict.about.mission} />}

      <History timeline={dict.about.timeline} />

      <Culture dict={dict} />

      <Team lang={lang} dict={dict} />

      <ContactSection dict={dict} lang={lang} />
    </>
  )
}
