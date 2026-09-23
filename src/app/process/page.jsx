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
import imageAcademy from '@/images/estel-academy-session.jpg'
import imageGrowthChart from '@/images/growth-chart.jpg'
import imageWarehouse from '@/images/warehouse-loading.jpg'

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
              className="font-display text-base font-semibold before:text-brand-yellow before:content-['/_'] after:text-neutral-950 after:content-[counter(section,decimal-leading-zero)]"
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

function Distribution() {
  return (
    <Section title="Нийлүүлэлт" image={{ src: imageWarehouse }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          ESTEL, SYNERGETIC брэндүүдийн{' '}
          <strong className="font-semibold text-neutral-950">
            албан ёсны дистрибьютер
          </strong>{' '}
          эрхтэйгээр гадаадаас чанарын баталгаатай бүтээгдэхүүнийг Монгол
          Улсад нийлүүлдэг.
        </p>
        <p>
          Нийлүүлсэн бүтээгдэхүүнээ Улаанбаатар, Дархан, Эрдэнэт хотуудад
          нийт 10 салбар, нэрийн болон сүлжээ дэлгүүрээр дамжуулан хот,
          хөдөө орон нутгийн{' '}
          <strong className="font-semibold text-neutral-950">
            хэрэглэгчид
          </strong>{' '}
          хүртээмжтэй хүргэдэг.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Энэ шатанд багтдаг
      </h3>
      <TagList className="mt-4">
        <TagListItem>Албан ёсны дистрибьюшн эрх</TagListItem>
        <TagListItem>Чанарын баталгаа</TagListItem>
        <TagListItem>10 салбарын логистик</TagListItem>
        <TagListItem>Нэрийн болон сүлжээ дэлгүүр</TagListItem>
      </TagList>
    </Section>
  )
}

function Academy() {
  return (
    <Section title="Сургалт" image={{ src: imageAcademy, shape: 1 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          ESTEL Академийн хүрээнд мэргэжлийн үсчин, гоо засалчдад зориулсан
          тогтмол сургалт явуулж, жил бүр дунджаар{' '}
          <strong className="font-semibold text-neutral-950">
            1000 гаруй үсчинд
          </strong>{' '}
          мэдлэг, ур чадвар түгээдэг.
        </p>
        <p>
          Сургалтын хэлбэрээр зогсохгүй, улс орон даяар 21 аймгаар тойрч
          сургалт зохион байгуулж, орон нутгийн мэргэжилтнүүдэд хүрч
          ажилладаг.
        </p>
        <p>
          Мөн улс, нийслэл, аймаг, бүсийн үсчин гоо сайханчдын тэмцээн
          уралдаанд жил бүр 40-50 сая төгрөгийн ивээн тэтгэлэг зарцуулж,
          салбарын хөгжлийг дэмждэг.
        </p>
      </div>
    </Section>
  )
}

function Retail() {
  return (
    <Section title="Худалдаа" image={{ src: imageGrowthChart, shape: 2 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          Мэргэжлийн салонд чиглэсэн зориулалтын бүтээгдэхүүнийг{' '}
          <strong className="font-semibold text-neutral-950">
            салон худалдаа, үйлчилгээ
          </strong>{' '}
          хэлбэрээр 1000 гаруй салонтой байнгын гэрээгээр ханган ажилладаг.
        </p>
        <p>
          Хэрэглэгчиддээ ойртохын тулд нэрийн болон сүлжээ дэлгүүр, жижиглэн
          бөөний болон{' '}
          <strong className="font-semibold text-neutral-950">
            онлайн худалдааны
          </strong>{' '}
          сувгуудаар зэрэг ажилладаг.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Энэ шатанд багтдаг
      </h3>
      <List className="mt-8">
        <ListItem title="Салон гэрээ">
          Хот, хөдөө орон нутагт 1000 гаруй мэргэжлийн салонтой байнгын
          гэрээгээр ажилладаг.
        </ListItem>
        <ListItem title="Нэрийн дэлгүүр">
          Мэргэжлийн салонд чиглэсэн зориулалтын бүтээгдэхүүний 5 салбар
          дэлгүүртэй.
        </ListItem>
        <ListItem title="Онлайн худалдаа">
          Бөөний болон онлайн сувгаар бүтээгдэхүүнээ шууд хэрэглэгчдэд
          хүргэдэг.
        </ListItem>
      </List>
    </Section>
  )
}

function Values() {
  return (
    <div className="relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40">
      <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-gradient-to-b from-neutral-50">
        <GridPattern
          className="absolute inset-0 h-full w-full fill-neutral-100 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
          yOffset={-270}
        />
      </div>

      <SectionIntro
        eyebrow="Бидний зарчим"
        title="Найдвартай байдал, тасралтгүй хөгжлийг эрхэмлэнэ"
      >
        <p>
          2013 оноос хойш баримталж ирсэн зарчмуудаа хадгалсаар, чиглэлээ
          өргөжүүлсээр байна.
        </p>
      </SectionIntro>

      <Container className="mt-24">
        <GridList>
          <GridListItem title="Найдвартай">
            Дэлхийд танигдсан брэндүүдийн албан ёсны эрхтэй нийлүүлэгчээр
            ажиллаж, чанарын баталгаагаа хадгалдаг.
          </GridListItem>
          <GridListItem title="Тогтвортой">
            2013 оноос хойш тасралтгүй өсөж, өнөөдөр 10 салбар, 60 гаруй
            ажилтантайгаар ажиллаж байна.
          </GridListItem>
          <GridListItem title="Мэргэшсэн">
            ESTEL Академиар дамжуулан жил бүр мэргэжлийн үсчдэд тогтмол
            сургалт зохион байгуулдаг.
          </GridListItem>
          <GridListItem title="Байгальд ээлтэй">
            SYNERGETIC зэрэг 98.8% байгалийн гаралтай, эко бүтээгдэхүүнийг
            хэрэглэгчдэдээ санал болгодог.
          </GridListItem>
          <GridListItem title="Хүртээмжтэй">
            Нэрийн, сүлжээ дэлгүүр, бөөний болон онлайн худалдаагаар хот,
            хөдөө орон нутагт хүрч ажилладаг.
          </GridListItem>
          <GridListItem title="Дэмжигч">
            Салбарын тэмцээн, уралдаанд жил бүр ивээн тэтгэлэг зарцуулж,
            мэргэжлийн хамт олноо дэмждэг.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

export const metadata = {
  title: 'Үйл ажиллагаа',
  description:
    'Тэнгэрийн Илгээмж ХХК — нийлүүлэлт, сургалт, худалдааны гурван үндсэн чиглэлээр ажилладаг.',
}

export default function Process() {
  return (
    <>
      <PageIntro eyebrow="Үйл ажиллагаа" title="Бид хэрхэн ажилладаг вэ">
        <p>
          Нийлүүлэлт, сургалт, худалдаа гэсэн гурван үндсэн чиглэлээр
          хэрэглэгчиддээ чанартай бүтээгдэхүүн, үйлчилгээг тасралтгүй
          хүргэдэг.
        </p>
      </PageIntro>

      <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
        <Distribution />
        <Academy />
        <Retail />
      </div>

      <Values />

      <ContactSection />
    </>
  )
}
