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

function EstelContentRu() {
  return (
    <>
      <h2 className="font-display text-2xl font-semibold text-neutral-950">
        О бренде ESTEL
      </h2>
      <p className="mt-6 text-base text-neutral-600 leading-relaxed">
        ESTEL Professional — ведущий международный бренд профессионального ухода за волосами, основанный в 1999 году и представленный в более чем 50 странах мира. Бренд славится своими научными разработками и неизменно высоким салонным качеством.
      </p>
      <p className="mt-4 text-base text-neutral-600 leading-relaxed">
        В Монголии компания <strong>ООО «Тэнгэрийн Илгээмж»</strong> с 2013 года является единственным официальным дистрибьютором ESTEL, стабильно развивая и поддерживая индустрию красоты по всей стране.
      </p>

      <h2 className="mt-16 font-display text-2xl font-semibold text-neutral-950">
        Результаты сотрудничества
      </h2>
      <TagList className="my-6">
        <TagListItem>1000+ салонов-партнёров</TagListItem>
        <TagListItem>500+ обученных мастеров в год</TagListItem>
        <TagListItem>Обучение в 21 аймаке</TagListItem>
        <TagListItem>5 фирменных магазинов (УБ)</TagListItem>
        <TagListItem>5 специализированных филиалов</TagListItem>
        <TagListItem>4 региональных тура в год</TagListItem>
      </TagList>

      <h2 className="mt-16 font-display text-2xl font-semibold text-neutral-950">
        Академия ESTEL
      </h2>
      <p className="mt-6 text-base text-neutral-600 leading-relaxed">
        ООО «Тэнгэрийн Илгээмж» развивает в Монголии образовательную платформу <strong>Академия ESTEL</strong> для непрерывного повышения квалификации мастеров:
      </p>
      <ul className="mt-4 list-disc pl-6 space-y-2 text-base text-neutral-600">
        <li>Ежегодно более <strong>500 профессиональных парикмахеров</strong> проходят теоретические и практические курсы</li>
        <li>Выездные обучающие программы охватывают специалистов во всех <strong>21 аймаках</strong> страны</li>
        <li>Ежегодная спонсорская поддержка конкурсов парикмахерского искусства составляет <strong>40–50 млн тугриков</strong></li>
      </ul>

      <Blockquote
        className="my-16"
        author={{
          name: 'ООО «Тэнгэрийн Илгээмж»',
          role: 'Официальный дистрибьютор ESTEL в Монголии',
        }}
      >
        Наша цель — вывести мастерство парикмахеров Монголии на мировой уровень. Академия ESTEL является главным инструментом для воплощения этой цели.
      </Blockquote>

      <StatList className="my-16 !max-w-none">
        <StatListItem value="2013" label="Выход на рынок Монголии" />
        <StatListItem value="1000+" label="Салонов-партнёров" />
        <StatListItem value="500+" label="Обученных мастеров (в год)" />
        <StatListItem value="50M ₮" label="Годовой спонсорский фонд" />
      </StatList>
    </>
  )
}

function EstelContentEn() {
  return (
    <>
      <h2 className="font-display text-2xl font-semibold text-neutral-950">
        About ESTEL
      </h2>
      <p className="mt-6 text-base text-neutral-600 leading-relaxed">
        ESTEL Professional, founded in 1999, is a global leader in professional hair care distributed in over 50 countries worldwide. The brand is renowned for scientifically grounded formulations, technological innovation, and reliable salon-grade products.
      </p>
      <p className="mt-4 text-base text-neutral-600 leading-relaxed">
        In Mongolia, <strong>Tengeriin Ilgeemj LLC</strong> has served as the sole official distributor of ESTEL since 2013, establishing a strong and enduring footprint across the nation’s hair and beauty industry.
      </p>

      <h2 className="mt-16 font-display text-2xl font-semibold text-neutral-950">
        Partnership Highlights
      </h2>
      <TagList className="my-6">
        <TagListItem>1000+ partner salons</TagListItem>
        <TagListItem>500+ stylists trained annually</TagListItem>
        <TagListItem>Workshops across 21 provinces</TagListItem>
        <TagListItem>5 branded retail stores (UB)</TagListItem>
        <TagListItem>5 professional branch stores</TagListItem>
        <TagListItem>4 nationwide outreach tours per year</TagListItem>
      </TagList>

      <h2 className="mt-16 font-display text-2xl font-semibold text-neutral-950">
        ESTEL Academy
      </h2>
      <p className="mt-6 text-base text-neutral-600 leading-relaxed">
        Tengeriin Ilgeemj LLC operates the <strong>ESTEL Academy</strong> in Mongolia to continually advance the expertise of local stylists:
      </p>
      <ul className="mt-4 list-disc pl-6 space-y-2 text-base text-neutral-600">
        <li>Theory and hands-on masterclasses delivered to over <strong>500 professionals</strong> every year</li>
        <li>Direct roadshow workshops reaching stylists in all <strong>21 provinces</strong> nationwide</li>
        <li>Over <strong>40–50 million MNT</strong> invested annually in sponsoring regional and national styling championships</li>
      </ul>

      <Blockquote
        className="my-16"
        author={{
          name: 'Tengeriin Ilgeemj LLC',
          role: 'Official Distributor of ESTEL in Mongolia',
        }}
      >
        Our mission is to elevate Mongolian hairstylists to world-class standards. The ESTEL Academy serves as the primary vehicle to achieve this vision.
      </Blockquote>

      <StatList className="my-16 !max-w-none">
        <StatListItem value="2013" label="Introduced to Mongolia" />
        <StatListItem value="1000+" label="Contracted Salons" />
        <StatListItem value="500+" label="Stylists Trained / Year" />
        <StatListItem value="50M ₮" label="Annual Sponsorship Fund" />
      </StatList>
    </>
  )
}

function SynergeticContentRu() {
  return (
    <>
      <h2 className="font-display text-2xl font-semibold text-neutral-950">
        О бренде SYNERGETIC
      </h2>
      <p className="mt-6 text-base text-neutral-600 leading-relaxed">
        SYNERGETIC — ведущий российский бренд экологичных моющих и уходовых средств с содержанием до <strong>98,8% натуральных растительных компонентов</strong>. Каждый продукт разработан с заботой о здоровье человека и окружающей среде:
      </p>
      <ul className="mt-4 list-disc pl-6 space-y-2 text-base text-neutral-600">
        <li>Без <strong>SLS, SLES</strong> (агрессивных ПАВ)</li>
        <li>Без <strong>парабенов</strong> и консервантов</li>
        <li>Без <strong>силиконов</strong></li>
        <li>Без <strong>минеральных масел</strong></li>
        <li>Без <strong>искусственных красителей</strong></li>
        <li><strong>Гипоаллергенный</strong> состав</li>
      </ul>
      <p className="mt-4 text-base text-neutral-600 leading-relaxed">
        ООО «Тэнгэрийн Илгээмж» поставляет SYNERGETIC в Монголию, прививая культуру осознанного и экологически чистого потребления.
      </p>

      <h2 className="mt-16 font-display text-2xl font-semibold text-neutral-950">
        Для кого подходит
      </h2>
      <TagList className="my-6">
        <TagListItem>Семьи с детьми</TagListItem>
        <TagListItem>Люди с аллергией</TagListItem>
        <TagListItem>Эко-осознанные потребители</TagListItem>
        <TagListItem>Ценители чистоты и уюта</TagListItem>
        <TagListItem>Защитники природы</TagListItem>
      </TagList>

      <h2 className="mt-16 font-display text-2xl font-semibold text-neutral-950">
        Линейки продукции
      </h2>
      <p className="mt-6 text-base text-neutral-600 leading-relaxed">
        SYNERGETIC предлагает широкий спектр сертифицированной эко-продукции:
      </p>
      <p className="mt-4 text-base text-neutral-600 leading-relaxed">
        <strong>Уход за домом:</strong> Средства для мытья посуды, экологичные гели для стирки, кондиционеры и чистящие средства для любых поверхностей.
      </p>
      <p className="mt-4 text-base text-neutral-600 leading-relaxed">
        <strong>Личная гигиена:</strong> Натуральные шампуни, бальзамы, гели для душа, зубные пасты и специализированная детская серия 0+.
      </p>
      <p className="mt-4 text-base text-neutral-600 leading-relaxed">
        <strong>Тревел-форматы:</strong> Компактные и удобные форматы для поездок и путешествий.
      </p>

      <Blockquote
        className="my-16"
        author={{
          name: 'ООО «Тэнгэрийн Илгээмж»',
          role: 'Официальный дистрибьютор SYNERGETIC в Монголии',
        }}
      >
        Каждая семья в Монголии заслуживает право пользоваться безопасными и натуральными средствами. SYNERGETIC даёт нам эту абсолютную уверенность.
      </Blockquote>

      <StatList className="my-16 !max-w-none">
        <StatListItem value="98.8%" label="Натуральные ингредиенты" />
        <StatListItem value="0" label="SLS / Парабенов / Силикона" />
        <StatListItem value="50+" label="Наименований продукции" />
        <StatListItem value="Эко" label="Международные эко-сертификаты" />
      </StatList>
    </>
  )
}

function SynergeticContentEn() {
  return (
    <>
      <h2 className="font-display text-2xl font-semibold text-neutral-950">
        About SYNERGETIC
      </h2>
      <p className="mt-6 text-base text-neutral-600 leading-relaxed">
        SYNERGETIC is a premier eco-friendly brand with formulations crafted from <strong>98.8% natural plant-based ingredients</strong>. Every formulation adheres to rigorous environmental and health safety criteria:
      </p>
      <ul className="mt-4 list-disc pl-6 space-y-2 text-base text-neutral-600">
        <li>Free of <strong>SLS and SLES</strong></li>
        <li>Free of <strong>parabens</strong> and harmful preservatives</li>
        <li>Free of <strong>silicones</strong></li>
        <li>Free of <strong>mineral oils</strong></li>
        <li>Free of <strong>synthetic colorants</strong></li>
        <li><strong>Hypoallergenic</strong> and non-irritating</li>
      </ul>
      <p className="mt-4 text-base text-neutral-600 leading-relaxed">
        Tengeriin Ilgeemj LLC officially imports SYNERGETIC to Mongolia, championing green lifestyles and conscious household care.
      </p>

      <h2 className="mt-16 font-display text-2xl font-semibold text-neutral-950">
        Ideal For
      </h2>
      <TagList className="my-6">
        <TagListItem>Families with children</TagListItem>
        <TagListItem>Sensitive skin & allergy sufferers</TagListItem>
        <TagListItem>Eco-conscious consumers</TagListItem>
        <TagListItem>Wellness-focused homes</TagListItem>
        <TagListItem>Environmental advocates</TagListItem>
      </TagList>

      <h2 className="mt-16 font-display text-2xl font-semibold text-neutral-950">
        Product Lines
      </h2>
      <p className="mt-6 text-base text-neutral-600 leading-relaxed">
        SYNERGETIC delivers a comprehensive portfolio of certified green products:
      </p>
      <p className="mt-4 text-base text-neutral-600 leading-relaxed">
        <strong>Home Care:</strong> Plant-based dishwashing gels, eco laundry liquids, stain removers, and multi-surface cleaners.
      </p>
      <p className="mt-4 text-base text-neutral-600 leading-relaxed">
        <strong>Personal Care:</strong> Natural shampoos, nourishing body washes, organic toothpastes, and gentle 0+ baby care essentials.
      </p>
      <p className="mt-4 text-base text-neutral-600 leading-relaxed">
        <strong>Travel Range:</strong> Portable and convenient compact packaging for people on the move.
      </p>

      <Blockquote
        className="my-16"
        author={{
          name: 'Tengeriin Ilgeemj LLC',
          role: 'Official Distributor of SYNERGETIC in Mongolia',
        }}
      >
        Mongolian consumers deserve access to authentically safe, plant-derived products. SYNERGETIC delivers that uncompromising peace of mind.
      </Blockquote>

      <StatList className="my-16 !max-w-none">
        <StatListItem value="98.8%" label="Natural Plant Ingredients" />
        <StatListItem value="0" label="SLS / Parabens / Silicones" />
        <StatListItem value="50+" label="Product Varieties" />
        <StatListItem value="Eco" label="International Certifications" />
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

  const localizedService =
    id === 'estel'
      ? lang === 'ru'
        ? 'Профессиональный уход за волосами, Обучение'
        : lang === 'en'
        ? 'Professional Hair Care, Training'
        : caseStudy?.service
      : id === 'synergetic'
      ? lang === 'ru'
        ? 'Эко чистящие средства, Уход'
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
        />
      )}

      <ContactSection dict={dict} lang={lang} />
    </>
  )
}

