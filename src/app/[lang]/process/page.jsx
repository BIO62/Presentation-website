import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { GridPattern } from '@/components/GridPattern'
import { List, ListItem } from '@/components/List'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { TagList, TagListItem } from '@/components/TagList'
import { getDictionary, locales } from '@/dictionaries/index'
import imageLaptop from '@/images/laptop.jpg'
import imageMeeting from '@/images/meeting.jpg'
import imageWhiteboard from '@/images/whiteboard.jpg'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }) {
  const dict = await getDictionary(params.lang)
  return {
    title: dict.process.eyebrow,
    description: dict.metadata.process,
  }
}

function Section({ title, image, children }) {
  return (
    <Container className="group/section [counter-increment:section]">
      <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
        <div className="flex justify-center">
          <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
            <StylizedImage
              {...image}
              sizes="(min-width: 1024px) 41rem, 31rem"
              className="justify-center lg:justify-end lg:group-even/section:justify-start"
            />
          </FadeIn>
        </div>
        <div className="mt-12 lg:mt-0 lg:w-[37rem] lg:flex-none lg:group-even/section:order-first">
          <FadeIn>
            <div
              className="font-display text-base font-semibold before:text-neutral-300 before:content-['/_'] after:text-neutral-950 after:content-[counter(section,decimal-leading-zero)]"
              aria-hidden="true"
            />
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
              {title}
            </h2>
            <div className="mt-6">{children}</div>
          </FadeIn>
        </div>
      </div>
    </Container>
  )
}

function Distribution({ dict }) {
  const d = dict.process.distribution
  return (
    <Section title={d.title} image={{ src: imageWhiteboard }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          {d.p1part1}{' '}
          <strong className="font-semibold text-neutral-950">{d.p1bold}</strong>{' '}
          {d.p1part2}
        </p>
        <p>
          {d.p2part1}{' '}
          <strong className="font-semibold text-neutral-950">{d.p2bold}</strong>{' '}
          {d.p2part2}
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        {d.includedTitle}
      </h3>
      <TagList className="mt-4">
        {d.tags.map((tag) => (
          <TagListItem key={tag}>{tag}</TagListItem>
        ))}
      </TagList>
    </Section>
  )
}

function Academy({ dict }) {
  const a = dict.process.academy
  return (
    <Section title={a.title} image={{ src: imageLaptop, shape: 1 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          {a.p1part1}{' '}
          <strong className="font-semibold text-neutral-950">{a.p1bold}</strong>{' '}
          {a.p1part2}
        </p>
        <p>{a.p2}</p>
        <p>{a.p3}</p>
      </div>

      {a.courses && a.courses.length > 0 && (
        <>
          <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
            {a.includedTitle}
          </h3>
          <TagList className="mt-4">
            {a.courses.map((course) => (
              <TagListItem key={course}>{course}</TagListItem>
            ))}
          </TagList>
        </>
      )}
    </Section>
  )
}

function Retail({ dict }) {
  const r = dict.process.retail
  return (
    <Section title={r.title} image={{ src: imageMeeting, shape: 2 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          {r.p1part1}{' '}
          <strong className="font-semibold text-neutral-950">{r.p1bold}</strong>{' '}
          {r.p1part2}
        </p>
        <p>
          {r.p2part1}{' '}
          <strong className="font-semibold text-neutral-950">{r.p2bold}</strong>{' '}
          {r.p2part2}
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        {r.includedTitle}
      </h3>
      <List className="mt-8">
        {r.channels ? (
          r.channels.map((channel) => (
            <ListItem key={channel.title} title={channel.title}>
              {channel.text}
            </ListItem>
          ))
        ) : (
          <>
            <ListItem title={r.salon?.title}>{r.salon?.text}</ListItem>
            <ListItem title={r.store?.title}>{r.store?.text}</ListItem>
            <ListItem title={r.online?.title}>{r.online?.text}</ListItem>
          </>
        )}
      </List>
    </Section>
  )
}

function Values({ dict }) {
  const v = dict.process.values
  return (
    <div className="relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40">
      <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-gradient-to-b from-neutral-50">
        <GridPattern
          className="absolute inset-0 h-full w-full fill-neutral-100 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
          yOffset={-270}
        />
      </div>

      <SectionIntro eyebrow={v.eyebrow} title={v.title}>
        <p>{v.description}</p>
      </SectionIntro>

      <Container className="mt-24">
        <GridList>
          <GridListItem title={v.reliable.title}>{v.reliable.text}</GridListItem>
          <GridListItem title={v.stable.title}>{v.stable.text}</GridListItem>
          <GridListItem title={v.expert.title}>{v.expert.text}</GridListItem>
          <GridListItem title={v.eco.title}>{v.eco.text}</GridListItem>
          <GridListItem title={v.accessible.title}>{v.accessible.text}</GridListItem>
          <GridListItem title={v.supportive.title}>{v.supportive.text}</GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

export default async function Process({ params }) {
  const { lang } = params
  const dict = await getDictionary(lang)

  return (
    <>
      <PageIntro eyebrow={dict.process.eyebrow} title={dict.process.title}>
        <p>{dict.process.description}</p>
      </PageIntro>

      <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
        <Distribution dict={dict} />
        <Academy dict={dict} />
        <Retail dict={dict} />
      </div>

      <Values dict={dict} />

      <ContactSection dict={dict} lang={lang} />
    </>
  )
}
