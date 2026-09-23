import { Blockquote } from '@/components/Blockquote'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GrayscaleTransitionImage } from '@/components/GrayscaleTransitionImage'
import { MDXComponents } from '@/components/MDXComponents'
import { PageIntro } from '@/components/PageIntro'
import { PageLinks } from '@/components/PageLinks'
import { StatList, StatListItem } from '@/components/StatList'
import { TagList, TagListItem } from '@/components/TagList'
import { getDictionary } from '@/dictionaries/index'
import { loadMDXMetadata } from '@/lib/loadMDXMetadata'

// Орос, англи агуулга нь estel/page.mdx, synergetic/page.mdx доторх монгол эхийн
// орчуулга — баримт (он, тоо) өөрчлөгдвөл гурвууланд нь зэрэг засна.

const h2 = 'font-display text-2xl font-semibold text-neutral-950'
const p = 'mt-6 text-base text-neutral-600 leading-relaxed'
const list = 'mt-4 list-disc pl-6 space-y-2 text-base text-neutral-600'

function EstelContentRu() {
  return (
    <>
      <h2 className={h2}>О бренде ESTEL</h2>
      <p className={p}>
        ESTEL Professional — ведущий мировой бренд профессионального ухода за волосами с
        26-летним опытом. Бренд предлагает профессиональным парикмахерам, салонам и
        покупателям комплексные решения для окрашивания, ухода, восстановления и укладки волос.
      </p>
      <p className={p}>
        Бренд располагает <strong>3 крупными заводами</strong> и{' '}
        <strong>собственной научно-исследовательской лабораторией</strong>. С 2019 года
        ООО «Тэнгэрийн Илгээмж» является официальным дистрибьютором ESTEL в Монголии и
        поставляет продукцию на рынок по официальным каналам.
      </p>
      <p className={p}>
        Помимо продукции, мы оказываем парикмахерам, салонам и дилерам профессиональные
        консультации, проводим обучение и поддерживаем правильное применение средств,
        развивая ценность бренда ESTEL Professional на рынке Монголии.
      </p>

      <h2 className={`mt-16 ${h2}`}>Результаты сотрудничества</h2>
      <TagList className="my-6">
        <TagListItem>1000+ салонов по договору</TagListItem>
        <TagListItem>1000+ обученных мастеров в год</TagListItem>
        <TagListItem>Мастер-классы по 21 аймаку</TagListItem>
        <TagListItem>Гарантия 3 крупных заводов</TagListItem>
        <TagListItem>10 официальных филиалов</TagListItem>
        <TagListItem>Собственная исследовательская лаборатория</TagListItem>
      </TagList>

      <h2 className={`mt-16 ${h2}`}>ESTEL Academy — профессионализм на новом уровне</h2>
      <p className={p}>
        ESTEL Academy — профессиональный учебный центр для парикмахеров, салонов и
        бьюти-мастеров, <strong>сочетающий теорию и практику</strong>:
      </p>
      <ul className={list}>
        <li>
          <strong>Теория + практика:</strong> работа на реальной продукции и
          профессиональные сертификаты
        </li>
        <li>
          <strong>Направления обучения:</strong> колористика, подбор цвета, техники
          окрашивания, осветление, окрашивание седины, мелирование / highlight, уход и
          лечение волос, вечерние укладки, мужские стрижки, химическая завивка, правильное
          применение продукции
        </li>
        <li>
          <strong>Охват регионов:</strong> выездные программы для специалистов во всех 21
          аймаке
        </li>
        <li>
          <strong>Поддержка отрасли:</strong> ежегодное спонсорство национальных,
          городских, аймачных и региональных конкурсов парикмахеров
        </li>
      </ul>

      <Blockquote
        className="my-16"
        author={{
          name: 'ООО «Тэнгэрийн Илгээмж»',
          role: 'Официальный дистрибьютор ESTEL в Монголии',
        }}
      >
        Наша миссия — вывести мастерство парикмахеров, салонов и специалистов Монголии на
        мировой уровень и дать каждому клиенту почувствовать гарантию высочайшего качества.
      </Blockquote>

      <StatList className="my-16 !max-w-none">
        <StatListItem value="2019" label="Официальные права в Монголии" />
        <StatListItem value="26 лет" label="Международный опыт" />
        <StatListItem value="3" label="Завода и R&D-лаборатория" />
        <StatListItem value="1000+" label="Обученных мастеров (в год)" />
      </StatList>
    </>
  )
}

function EstelContentEn() {
  return (
    <>
      <h2 className={h2}>About ESTEL</h2>
      <p className={p}>
        ESTEL Professional is a world-leading professional hair care brand with 26 years of
        experience, offering complete coloring, care, restoration and styling solutions for
        professional hairdressers, salons and consumers.
      </p>
      <p className={p}>
        The brand operates <strong>3 major manufacturing plants</strong> and an{' '}
        <strong>independent research laboratory</strong>. Since 2019, Tengeriin Ilgeemj LLC
        has been the official distributor of ESTEL in Mongolia, supplying the market through
        official channels.
      </p>
      <p className={p}>
        Beyond products, we provide hairdressers, salons and dealers with professional
        consulting, training and product-application support, growing the value of ESTEL
        Professional in the Mongolian market.
      </p>

      <h2 className={`mt-16 ${h2}`}>Partnership Highlights</h2>
      <TagList className="my-6">
        <TagListItem>1000+ contracted salons</TagListItem>
        <TagListItem>1000+ hairdressers trained per year</TagListItem>
        <TagListItem>Masterclasses across 21 provinces</TagListItem>
        <TagListItem>Backed by 3 major plants</TagListItem>
        <TagListItem>10 official branch stores</TagListItem>
        <TagListItem>Independent research laboratory</TagListItem>
      </TagList>

      <h2 className={`mt-16 ${h2}`}>ESTEL Academy — Taking Skills to the Next Level</h2>
      <p className={p}>
        ESTEL Academy is a professional training center for hairdressers, salons and beauty
        specialists, <strong>combining theory and hands-on practice</strong>:
      </p>
      <ul className={list}>
        <li>
          <strong>Theory + practice:</strong> hands-on work with real products and
          professional certification
        </li>
        <li>
          <strong>Core curriculum:</strong> color theory, color formulation, coloring
          techniques, lightening, grey coverage, highlights, hair care and treatment,
          occasion styling, men’s cuts, perms, and proper product application
        </li>
        <li>
          <strong>Nationwide reach:</strong> roadshow training for specialists in all 21
          provinces
        </li>
        <li>
          <strong>Industry support:</strong> annual sponsorship of national, city,
          provincial and regional hairdressing competitions
        </li>
      </ul>

      <Blockquote
        className="my-16"
        author={{
          name: 'Tengeriin Ilgeemj LLC',
          role: 'Official Distributor of ESTEL in Mongolia',
        }}
      >
        Our mission is to raise the skills of Mongolian hairdressers, salons and specialists
        to world standards, and to let every customer experience the highest guarantee of
        quality.
      </Blockquote>

      <StatList className="my-16 !max-w-none">
        <StatListItem value="2019" label="Official rights in Mongolia" />
        <StatListItem value="26 yrs" label="International experience" />
        <StatListItem value="3" label="Plants & R&D laboratory" />
        <StatListItem value="1000+" label="Hairdressers trained (per year)" />
      </StatList>
    </>
  )
}

function SynergeticContentRu() {
  return (
    <>
      <h2 className={h2}>О бренде SYNERGETIC</h2>
      <p className={p}>
        SYNERGETIC — ведущий бренд экологичной продукции для дома и личного ухода, основанный
        в 2013 году в России. Бренд сочетает современные научные решения с растительными
        ингредиентами, создавая эффективные и удобные в использовании средства.
      </p>
      <p className={p}>
        С 2022 года ООО «Тэнгэрийн Илгээмж» является официальным дистрибьютором SYNERGETIC в
        Монголии: мы поставляем продукцию по официальным каналам, развиваем культуру
        экологичного потребления и делаем экологичный выбор частью повседневной жизни.
      </p>

      <h2 className={`mt-16 ${h2}`}>Ключевые преимущества продукции</h2>
      <TagList className="my-6">
        <TagListItem>Более 95% натуральных ингредиентов</TagListItem>
        <TagListItem>Гипоаллергенный состав</TagListItem>
        <TagListItem>Без SLS, парабенов и силиконов</TagListItem>
        <TagListItem>Безопасно для детей и всей семьи</TagListItem>
        <TagListItem>100% биоразлагаемость</TagListItem>
        <TagListItem>Международные эко-сертификаты</TagListItem>
      </TagList>

      <h2 className={`mt-16 ${h2}`}>Линейки продукции</h2>
      <p className={p}>
        SYNERGETIC предлагает комплексные линейки для семьи, личного ухода и уборки дома:
      </p>
      <p className={p}>
        <strong>Уборка дома:</strong> средства для мытья посуды, гели и кондиционеры для
        стирки, средства для пола и поверхностей, эко-решения для кухни и ванной.
      </p>
      <p className={p}>
        <strong>Уход за телом и личная гигиена:</strong> шампуни с натуральным составом,
        гели для душа, жидкое мыло для рук, зубные пасты и специальные детские средства.
      </p>
      <p className={p}>
        <strong>Культура эко-потребления:</strong> мы продвигаем «зелёный» выбор —
        средства, безвредные для природы и полностью безопасные для здоровья.
      </p>

      <Blockquote
        className="my-16"
        author={{
          name: 'ООО «Тэнгэрийн Илгээмж»',
          role: 'Официальный дистрибьютор SYNERGETIC в Монголии',
        }}
      >
        Наша миссия — по официальным каналам доставлять монгольским покупателям натуральную
        и безопасную продукцию и вместе беречь нашу планету.
      </Blockquote>

      <StatList className="my-16 !max-w-none">
        <StatListItem value="2022" label="Официальные права в Монголии" />
        <StatListItem value="95%+" label="Натуральных ингредиентов" />
        <StatListItem value="2013" label="Год основания бренда" />
        <StatListItem value="10" label="Торговых филиалов" />
      </StatList>
    </>
  )
}

function SynergeticContentEn() {
  return (
    <>
      <h2 className={h2}>About SYNERGETIC</h2>
      <p className={p}>
        Founded in Russia in 2013, SYNERGETIC is a leading brand of eco-friendly home care
        and personal care products. It combines modern science with plant-based ingredients
        to create effective products that are easy to use.
      </p>
      <p className={p}>
        Since 2022, Tengeriin Ilgeemj LLC has been the official distributor of SYNERGETIC in
        Mongolia — supplying products through official channels, promoting eco-conscious
        consumption and bringing green choices into everyday life.
      </p>

      <h2 className={`mt-16 ${h2}`}>Key Product Features</h2>
      <TagList className="my-6">
        <TagListItem>Over 95% natural ingredients</TagListItem>
        <TagListItem>Hypoallergenic</TagListItem>
        <TagListItem>Free of SLS, parabens and silicones</TagListItem>
        <TagListItem>Safe for children and families</TagListItem>
        <TagListItem>100% biodegradable</TagListItem>
        <TagListItem>International eco certifications</TagListItem>
      </TagList>

      <h2 className={`mt-16 ${h2}`}>Product Lines</h2>
      <p className={p}>
        SYNERGETIC offers complete ranges for the family, personal care and household
        cleaning:
      </p>
      <p className={p}>
        <strong>Home Cleaning:</strong> dishwashing liquids, laundry gels and softeners,
        floor and surface cleaners, and eco solutions for kitchens and bathrooms.
      </p>
      <p className={p}>
        <strong>Body & Personal Care:</strong> natural shampoos, body washes, liquid hand
        soaps, toothpastes and dedicated baby products.
      </p>
      <p className={p}>
        <strong>Eco-Conscious Living:</strong> we promote a green culture of choosing
        products that are harmless to nature and completely safe for health.
      </p>

      <Blockquote
        className="my-16"
        author={{
          name: 'Tengeriin Ilgeemj LLC',
          role: 'Official Distributor of SYNERGETIC in Mongolia',
        }}
      >
        Our mission is to bring natural, safe products to Mongolian consumers through
        official channels — and to build a greener world together.
      </Blockquote>

      <StatList className="my-16 !max-w-none">
        <StatListItem value="2022" label="Official rights in Mongolia" />
        <StatListItem value="95%+" label="Natural ingredients" />
        <StatListItem value="2013" label="Year brand was founded" />
        <StatListItem value="10" label="Retail branches" />
      </StatList>
    </>
  )
}

export default async function CaseStudyLayout({ children, _segments, params }) {
  const lang = params?.lang ?? _segments?.find((s) => /^(mn|ru|en)$/.test(s)) ?? 'mn'
  const id = _segments?.at(-2) ?? 'estel'

  const dict = await getDictionary(lang)
  const allCaseStudies = await loadMDXMetadata('work', lang)
  const caseStudy = allCaseStudies.find((cs) => cs.id === id) ?? allCaseStudies[0]
  const moreCaseStudies = allCaseStudies
    .filter((cs) => cs.id !== id && (cs.id === 'estel' || cs.id === 'synergetic'))
    .slice(0, 2)

  // Wrapper labels from dict
  const brandLabel = lang === 'ru' ? 'Бренд' : lang === 'en' ? 'Brand' : 'Брэнд'
  const yearLabel = lang === 'ru' ? 'Год' : lang === 'en' ? 'Year' : 'Он'
  const serviceLabel = lang === 'ru' ? 'Направление' : lang === 'en' ? 'Service' : 'Чиглэл'
  const moreBrandsLabel = lang === 'ru' ? 'Другие бренды' : lang === 'en' ? 'Other Brands' : 'Бусад брэндүүд'
  const aboutBrandEyebrow = lang === 'ru' ? 'О бренде' : lang === 'en' ? 'About Brand' : 'Брэндийн тухай'
  const readMoreLabel = lang === 'ru' ? 'Читать далее' : lang === 'en' ? 'Read more' : 'Дэлгэрэнгүй'

  const localizedService =
    id === 'estel'
      ? lang === 'ru'
        ? 'Профессиональный уход за волосами, ESTEL Academy'
        : lang === 'en'
        ? 'Professional Hair Care, ESTEL Academy'
        : caseStudy?.service
      : id === 'synergetic'
      ? lang === 'ru'
        ? 'Экологичная бытовая химия, уход'
        : lang === 'en'
        ? 'Eco Cleaning & Care'
        : caseStudy?.service
      : caseStudy?.service

  const localizedTitle = dict.work?.[id]?.title ?? caseStudy?.title
  const localizedDescription = dict.work?.[id]?.description ?? caseStudy?.description

  const isRu = lang === 'ru'
  const isEn = lang === 'en'

  return (
    <>
      <article className="mt-24 sm:mt-32 lg:mt-40">
        <header>
          <PageIntro eyebrow={aboutBrandEyebrow} title={localizedTitle} centered>
            <p>{localizedDescription}</p>
          </PageIntro>

          <FadeIn>
            <div className="mt-24 border-t border-neutral-200 bg-white/50 sm:mt-32 lg:mt-40">
              <Container>
                <div className="mx-auto max-w-5xl">
                  <dl className="-mx-6 grid grid-cols-1 text-sm text-neutral-950 sm:mx-0 sm:grid-cols-3">
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">{brandLabel}</dt>
                      <dd>{caseStudy?.client}</dd>
                    </div>
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">{yearLabel}</dt>
                      <dd>
                        <time dateTime={caseStudy?.date?.split('-')[0]}>
                          {caseStudy?.date?.split('-')[0]}
                        </time>
                      </dd>
                    </div>
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">{serviceLabel}</dt>
                      <dd>{localizedService}</dd>
                    </div>
                  </dl>
                </div>
              </Container>
            </div>

            {caseStudy?.image && (
              <div className="border-y border-neutral-200 bg-neutral-100">
                <div className="-my-px mx-auto max-w-[76rem] bg-neutral-200">
                  <GrayscaleTransitionImage
                    {...caseStudy.image}
                    quality={90}
                    className="w-full"
                    sizes="(min-width: 1216px) 76rem, 100vw"
                    priority
                  />
                </div>
              </div>
            )}
          </FadeIn>
        </header>

        <Container className="mt-24 sm:mt-32 lg:mt-40">
          <FadeIn>
            <MDXComponents.wrapper>
              {isRu && id === 'estel' ? (
                <EstelContentRu />
              ) : isEn && id === 'estel' ? (
                <EstelContentEn />
              ) : isRu && id === 'synergetic' ? (
                <SynergeticContentRu />
              ) : isEn && id === 'synergetic' ? (
                <SynergeticContentEn />
              ) : (
                children
              )}
            </MDXComponents.wrapper>
          </FadeIn>
        </Container>
      </article>

      {moreCaseStudies.length > 0 && (
        <PageLinks
          className="mt-24 sm:mt-32 lg:mt-40"
          title={moreBrandsLabel}
          pages={moreCaseStudies}
          readMoreLabel={readMoreLabel}
          lang={lang}
        />
      )}

      <ContactSection dict={dict} lang={lang} />
    </>
  )
}

