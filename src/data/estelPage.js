// ESTEL брэндийн хуудасны (/[lang]/work/estel) агуулга.
//
// Монгол текст нь захирлын өгсөн эх: үг, үсэг, цэг таслалыг өөрчлөхгүй.
// Орос, англи нь түүний орчуулга: баримт (он, тоо) өөрчлөгдвөл гурвууланд нь зэрэг засна.
// Хуудасны дээд гарчиг, дэд гарчиг нь src/dictionaries/*.json → work.estel.title / description.
//
// Зураг нэмэх: зургаа src/images/site/academy/ эсвэл src/images/site/fukuoka/ дотор хуулж,
// доор import мөр нэмээд `estelGalleries`-ийн харгалзах массивт нэрийг нь нэмнэ.

import academy01 from '@/images/site/academy/academy-01.jpg'
import academy02 from '@/images/site/academy/academy-02.jpg'
import academy06 from '@/images/site/academy/academy-06.jpg'
import academy07 from '@/images/site/academy/academy-07.jpg'
import fukuoka01 from '@/images/site/fukuoka/fukuoka-01.jpg'
import fukuoka02 from '@/images/site/fukuoka/fukuoka-02.jpg'
import fukuoka03 from '@/images/site/fukuoka/fukuoka-03.jpg'
import heroCertificates from '@/images/site/hero/hero-06-academy-gerchilgee.jpg'
import heroAcademyTeam from '@/images/site/hero/hero-07-academy-hamt-olon.jpg'

export const estelGalleries = {
  academy: [heroCertificates, heroAcademyTeam, academy07, academy01, academy02, academy06],
  journey: [fukuoka01, fukuoka02, fukuoka03],
}

const content = {
  mn: {
    professional: {
      paragraphs: [
        'ESTEL брэндийн түүх 1999 онд ОХУ-ын Санкт-Петербург хотод эхэлсэн. Химич, бизнес эрхлэгч Лев Охотины мэргэжлийн үсний будаг бүтээх зорилгоос үүдэлтэй энэхүү санаа нь өнөөдөр мэргэжлийн үс арчилгаа, гоо сайхны салбарт өөрийн байр суурийг бий болгосон брэнд болон хөгжжээ.',
        'Бүтээгдэхүүний анхны найрлагыг туршиж, боловсруулсан жижигхэн лабораторийн санаачилгаас эхэлсэн ESTEL нь шинжлэх ухаан, технологи, үйлдвэрлэлийн хөгжлийг хослуулан, мэргэжлийн үсчдийн хэрэгцээ шаардлагад нийцсэн бүтээгдэхүүн, шийдлүүдийг тасралтгүй хөгжүүлж ирсэн түүхтэй.',
        'Өнөөдөр ESTEL Professional нь үс будах, өнгө сэргээх, арчлах, эмчлэх, хэлбэржүүлэх зориулалттай мэргэжлийн болон өдөр тутмын хэрэглээний өргөн сонголт бүхий бүтээгдэхүүний цогц шийдлийг санал болгодог.',
        'Брэндийн хөгжлийн үндэс нь өөрийн судалгаа, шинжилгээ, үйлдвэрлэлийн чадавх, чанарын хяналт, мэргэжлийн үсчидтэй нягт хамтран ажиллах зарчимд тулгуурладаг. Үүний зэрэгцээ ESTEL Academy болон сургалтын төвүүдээр дамжуулан үсчин, салон мэргэжилтнүүдийн мэдлэг, ур чадвар, мэргэжлийн хөгжлийг дэмждэг.',
        'ESTEL-ийн хөгжлийн гол үзэл баримтлал нь мэргэжлийн салбарын өсөлтийг дэмжих, технологийн шинэчлэлийг нэвтрүүлэх, чанартай бүтээгдэхүүнээр дамжуулан үсчин болон хэрэглэгчдийн итгэлийг бий болгоход оршдог.',
      ],
      closing:
        'ESTEL — Мэргэжлийн ур чадвар, шинжлэх ухаан, чанар, гоо сайхны салбарын хөгжлийг нэгтгэсэн брэнд.',
    },
    mongolia: {
      title: 'ESTEL MONGOLIA',
      subtitle: 'Мэргэжлийн гоо сайхны салбарын хөгжилд хамтдаа.',
      paragraphs: [
        'ESTEL Mongolia-ийн түүх нь Монголын мэргэжлийн үсчин, гоо сайхны салбарт олон улсын брэндийн бүтээгдэхүүн, технологи, мэргэжлийн мэдлэг, стандартыг нэвтрүүлэх зорилгоос эхтэй.',
        '2019 оноос ESTEL брэндийн Монгол Улс дахь цорын ганц албан ёсны дистрибьютерийн эрхийг авч, брэндийн бүтээгдэхүүн, технологи, мэргэжлийн стандарт, сургалт, үйлчилгээг Монголын зах зээлд албан ёсоор хүргэж эхэлсэн.',
        'Бидний үйл ажиллагаа бүтээгдэхүүний импорт, борлуулалтаар хязгаарлагдахгүй. Мэргэжлийн үсчин, салонуудын ур чадвар, мэдлэгийг хөгжүүлэх, сургалт, зөвлөгөө, бүтээгдэхүүний хэрэглээний дэмжлэг үзүүлэх, орон нутгийн хүртээмжийг нэмэгдүүлэхэд чиглэн өргөжиж ирсэн.',
        'Өнөөдөр бид 1,000 гаруй мэргэжлийн салонтой гэрээт хамтын ажиллагаатай ажиллаж, жил бүр 1,000 гаруй үсчин, гоо сайхны мэргэжилтнийг сургалтад хамруулан, Монгол Улсын 21 аймагт мастер сургалт зохион байгуулж байна. Мөн 15 албан ёсны салбар дэлгүүрээр дамжуулан хэрэглэгч, мэргэжилтнүүдэд бүтээгдэхүүн, үйлчилгээг хүргэж байна.',
        'Бид мэргэжлийн боловсрол, бүтээгдэхүүний чанар, найдвартай үйлчилгээ, урт хугацааны түншлэлийг эрхэмлэн, Монголын гоо сайхны салбарын тогтвортой хөгжилд бодит хувь нэмэр оруулахыг зорьдог.',
      ],
      closing:
        'Бидний хувьд ESTEL Mongolia бол зөвхөн брэндийн төлөөлөл бус, мэргэжлийн салбарын хөгжил, хамтын амжилтыг холбох гүүр юм.',
    },
    impact: {
      title: 'ХАМТЫН АЖИЛЛАГААНЫ ҮР ДҮН',
      subtitle: 'Our Partnership & Impact',
      intro:
        'Бидний хамтын ажиллагаа итгэлцэл, мэргэжлийн хөгжил, хүртээмжтэй үйлчилгээ, урт хугацааны түншлэлд тулгуурладаг. Энэ бүхэн бидний хамтдаа бүтээсэн бодит үр дүнгээр илэрхийлэгддэг.',
      stats: [
        {
          value: '1,000+',
          label: 'Гэрээт мэргэжлийн салон',
          text: 'Урт хугацааны хамтын ажиллагаатай салонууд',
        },
        {
          value: '1,000+',
          label: 'Мэргэжилтэн / жил',
          text: 'Жил бүр сургалтад хамрагддаг үсчин, мастер',
        },
        {
          value: '21',
          label: 'Аймаг',
          text: 'Орон нутагт хүрч ажилладаг мастер сургалт',
        },
        {
          value: '15',
          label: 'Албан ёсны салбар дэлгүүр',
          text: 'Хэрэглэгчдэд хүрэх үйлчилгээний сүлжээ',
        },
        {
          value: '3',
          label: 'Үйлдвэр',
          text: 'ESTEL брэндийн үйлдвэрлэлийн хүчин чадал',
        },
        {
          value: 'R&D',
          label: 'Судалгаа, хөгжүүлэлтийн лаборатори',
          text: 'Бие даасан лабораторийн бааз',
        },
      ],
    },
    academy: {
      title: 'ESTEL ACADEMY MONGOLIA',
      subtitle: 'Мэргэжлийн ур чадварыг дараагийн түвшинд',
      paragraphs: [
        'ESTEL Academy Mongolia нь Монгол Улсын үсчин, мэргэжлийн салон, гоо сайхны салбарын мэргэжилтнүүдийн мэдлэг, ур чадварыг хөгжүүлэх зорилготой, онол болон практик хосолсон мэргэжлийн сургалтын төв юм.',
        'Бид олон улсын мэргэжлийн арга барил, бүтээгдэхүүний технологи, орчин үеийн үс засалтын чиг хандлагыг сургалтын хөтөлбөртөө тусган, мэргэжилтнүүдэд мэдлэгээ ахиулах, шинэ техник эзэмших, ур чадвараа бодит ажил дээр хөгжүүлэх боломжийг олгодог.',
      ],
      featuresTitle: 'Сургалтын онцлог',
      features: [
        {
          title: 'Онол ба практик хосолсон сургалт',
          text: 'Санктпетербург дахь үйлдвэрийн Мэргэжлийн албан ёсны сертификат бүхий технологич багштай мэргэжлийн бүтээгдэхүүн, хэрэгсэл дээр дадлагатай хослуулж, сургалтын шаардлага хангасан оролцогчдод сертификат олгодог.',
        },
        {
          title: 'Мэргэжлийн өргөн хүрээний хөтөлбөр',
          text: 'Өнгө зүй, өнгө гаргалт, үс будах техник, цайруулалт, буурал үсний будалт, сор болон highlight техник, үс арчилгаа, эмчилгээ, гоёлын засалт, эрэгтэй тайралт, хими болон бүтээгдэхүүний зөв хэрэглээ зэрэг чиглэлээр сургалт зохион байгуулдаг.',
        },
        {
          title: 'Орон нутгийн мэргэжилтнүүдийг дэмжих',
          text: 'Монгол Улсын 21 аймагт сургалт, мастер класс сургалтыг зохион байгуулж, орон нутгийн үсчин, гоо сайхны мэргэжилтнүүдэд мэргэжлийн мэдлэг, шинэ техник, туршлагаа хүргэн ажилладаг.',
        },
        {
          title: 'Салбарын хөгжлийг дэмжих',
          text: 'Улс, нийслэл, аймаг, бүсийн хэмжээнд зохион байгуулагддаг үсчин, гоо сайханчдын тэмцээн, уралдаан, мэргэжлийн арга хэмжээг жил бүр ивээн тэтгэж, салбарын авьяас чадвар, мэргэжлийн ур чадварын хөгжлийг дэмждэг.',
        },
      ],
      goalTitle: 'Бидний зорилго',
      goal: 'Зөвхөн бүтээгдэхүүний мэдлэг олгохоос илүүтэй мэргэжилтэн бүрийн ур чадвар, бүтээлч сэтгэлгээ, мэргэжлийн үнэ цэнийг нэмэгдүүлэхэд оршино. Бид мэдлэгийг түгээж, ур чадварыг хөгжүүлж, Монголын гоо сайхны салбарын мэргэжлийн өсөлтөд бодит хувь нэмэр оруулахыг зорьдог.',
    },
    journey: {
      title: 'ХАМТЫН АМЖИЛТ – ТҮҮХЭН АЯЛАЛ',
      subtitle: 'Celebrating Success Together',
      paragraphs: [
        '2024 онд ESTEL Mongolia нь Монголын үсчин, гоо сайхны салбарын шилдэг мэргэжилтэн, салоны төлөөллүүдийг хамруулсан Фукуок арлын урамшууллын аяллыг амжилттай зохион байгууллаа.',
        'Энэхүү аялал нь Монголын үсчин, гоо сайхны салбарын хүрээнд хамгийн өргөн бүрэлдэхүүнтэйгээр анх удаа зохион байгуулагдсан аялал гэдгээрээ онцлог бөгөөд салбарын мэргэжилтнүүдийн хөдөлмөр, амжилт, хамтын ажиллагааг үнэлсэн онцгой үйл явдал байв.',
        'ESTEL Mongolia нь аялал, амралтын бүх зардлыг 100% бүрэн хариуцаж, шилдэг үсчин, салонуудаа олон улсын аялалд хамруулан, хамтын амжилтаа тэмдэглэх мартагдашгүй боломжийг бүрдүүлсэн юм.',
        'Бидний хувьд энэ аялал бол зөвхөн урамшуулал бус, хамтдаа өсөж хөгжих, бие биенээ дэмжих, урт хугацааны итгэлцэлтэй түншлэлийн үнэ цэнийн илэрхийлэл байлаа.',
      ],
      closing:
        'Бид амжилтыг үнэлдэг. Бид хамтын хөгжлийг дэмждэг. Бид амжилтыг хамтдаа бүтээдэг.',
    },
  },

  ru: {
    professional: {
      paragraphs: [
        'История бренда ESTEL началась в 1999 году в Санкт-Петербурге. Идея химика и предпринимателя Льва Охотина создать профессиональную краску для волос выросла в бренд, занявший собственное место в индустрии профессионального ухода за волосами и красоты.',
        'Начав с небольшой лаборатории, где испытывались и разрабатывались первые формулы, ESTEL объединяет науку, технологии и развитие производства и непрерывно совершенствует продукты и решения, отвечающие потребностям профессиональных парикмахеров.',
        'Сегодня ESTEL Professional предлагает комплексные решения с широким выбором профессиональных и повседневных средств для окрашивания, обновления цвета, ухода, восстановления и укладки волос.',
        'В основе развития бренда — собственные исследования и разработки, производственные мощности, контроль качества и тесное сотрудничество с профессиональными парикмахерами. Кроме того, через ESTEL Academy и учебные центры бренд поддерживает знания, мастерство и профессиональный рост парикмахеров и специалистов салонов.',
        'Ключевая философия развития ESTEL — поддерживать рост профессиональной отрасли, внедрять технологические инновации и завоёвывать доверие мастеров и потребителей благодаря качественной продукции.',
      ],
      closing:
        'ESTEL — бренд, объединивший профессиональное мастерство, науку, качество и развитие индустрии красоты.',
    },
    mongolia: {
      title: 'ESTEL MONGOLIA',
      subtitle: 'Вместе — для развития профессиональной индустрии красоты.',
      paragraphs: [
        'История ESTEL Mongolia началась с цели привнести в профессиональную парикмахерскую и бьюти-индустрию Монголии продукцию, технологии, профессиональные знания и стандарты международного бренда.',
        'В 2019 году мы получили права единственного официального дистрибьютора бренда ESTEL в Монголии и начали официально поставлять на монгольский рынок продукцию, технологии, профессиональные стандарты, обучение и сервис бренда.',
        'Наша деятельность не ограничивается импортом и продажей продукции. Мы развиваемся, чтобы повышать мастерство и знания профессиональных парикмахеров и салонов, проводить обучение и консультации, поддерживать правильное применение продукции и расширять доступность в регионах.',
        'Сегодня мы работаем по договорам более чем с 1,000 профессиональных салонов, ежегодно обучаем более 1,000 парикмахеров и бьюти-специалистов и проводим мастер-классы в 21 аймаке Монголии. Кроме того, через 15 официальных фирменных магазинов мы доставляем продукцию и услуги потребителям и специалистам.',
        'Мы ценим профессиональное образование, качество продукции, надёжный сервис и долгосрочное партнёрство и стремимся вносить реальный вклад в устойчивое развитие индустрии красоты Монголии.',
      ],
      closing:
        'Для нас ESTEL Mongolia — не просто представительство бренда, а мост, соединяющий развитие профессиональной отрасли и общий успех.',
    },
    impact: {
      title: 'РЕЗУЛЬТАТЫ СОТРУДНИЧЕСТВА',
      subtitle: 'Our Partnership & Impact',
      intro:
        'Наше сотрудничество строится на доверии, профессиональном развитии, доступном сервисе и долгосрочном партнёрстве. Всё это выражается в реальных результатах, которых мы достигли вместе.',
      stats: [
        {
          value: '1,000+',
          label: 'Профессиональных салонов по договору',
          text: 'Салоны с долгосрочным сотрудничеством',
        },
        {
          value: '1,000+',
          label: 'Специалистов в год',
          text: 'Парикмахеры и мастера, ежегодно проходящие обучение',
        },
        {
          value: '21',
          label: 'Аймак',
          text: 'Выездные мастер-классы в регионах',
        },
        {
          value: '15',
          label: 'Официальных фирменных магазинов',
          text: 'Сеть обслуживания, близкая к потребителю',
        },
        {
          value: '3',
          label: 'Завода',
          text: 'Производственные мощности бренда ESTEL',
        },
        {
          value: 'R&D',
          label: 'Лаборатория исследований и разработок',
          text: 'Собственная лабораторная база',
        },
      ],
    },
    academy: {
      title: 'ESTEL ACADEMY MONGOLIA',
      subtitle: 'Профессиональное мастерство — на новый уровень',
      paragraphs: [
        'ESTEL Academy Mongolia — профессиональный учебный центр, сочетающий теорию и практику, цель которого — развивать знания и мастерство парикмахеров, профессиональных салонов и специалистов индустрии красоты Монголии.',
        'Мы отражаем в учебных программах международные профессиональные подходы, технологии продукции и современные тенденции парикмахерского искусства и даём специалистам возможность углублять знания, осваивать новые техники и развивать мастерство в реальной работе.',
      ],
      featuresTitle: 'Особенности обучения',
      features: [
        {
          title: 'Обучение, сочетающее теорию и практику',
          text: 'Занятия ведут преподаватели-технологи с официальным профессиональным сертификатом завода в Санкт-Петербурге; теория сочетается с практикой на профессиональной продукции и инструментах, а участникам, выполнившим требования программы, выдаётся сертификат.',
        },
        {
          title: 'Широкая профессиональная программа',
          text: 'Мы проводим обучение по таким направлениям, как колористика, подбор цвета, техники окрашивания, осветление, окрашивание седых волос, мелирование и техники highlight, уход за волосами, лечение, вечерние причёски, мужские стрижки, химическая завивка и правильное применение продукции.',
        },
        {
          title: 'Поддержка региональных специалистов',
          text: 'Мы организуем обучение и мастер-классы в 21 аймаке Монголии, передавая парикмахерам и бьюти-специалистам в регионах профессиональные знания, новые техники и опыт.',
        },
        {
          title: 'Поддержка развития отрасли',
          text: 'Мы ежегодно спонсируем конкурсы, соревнования и профессиональные мероприятия парикмахеров и мастеров красоты национального, столичного, аймачного и регионального уровня, поддерживая развитие талантов и профессионального мастерства в отрасли.',
        },
      ],
      goalTitle: 'Наша цель',
      goal: 'Не просто давать знания о продукции, а повышать мастерство, творческое мышление и профессиональную ценность каждого специалиста. Мы распространяем знания, развиваем мастерство и стремимся вносить реальный вклад в профессиональный рост индустрии красоты Монголии.',
    },
    journey: {
      title: 'ОБЩИЙ УСПЕХ – ИСТОРИЧЕСКОЕ ПУТЕШЕСТВИЕ',
      subtitle: 'Celebrating Success Together',
      paragraphs: [
        'В 2024 году ESTEL Mongolia успешно организовала поощрительную поездку на остров Фукуок для лучших специалистов и представителей салонов парикмахерской и бьюти-индустрии Монголии.',
        'Эта поездка стала первой в парикмахерской и бьюти-индустрии Монголии, организованной в столь широком составе, и особым событием, в котором были оценены труд, достижения и сотрудничество специалистов отрасли.',
        'ESTEL Mongolia на 100% взяла на себя все расходы на поездку и отдых, дав лучшим парикмахерам и салонам возможность отправиться в международное путешествие и незабываемо отметить общий успех.',
        'Для нас эта поездка — не просто поощрение, а выражение ценности совместного роста, взаимной поддержки и долгосрочного партнёрства, основанного на доверии.',
      ],
      closing:
        'Мы ценим успех. Мы поддерживаем совместное развитие. Мы создаём успех вместе.',
    },
  },

  en: {
    professional: {
      paragraphs: [
        'The story of the ESTEL brand began in 1999 in Saint Petersburg, Russia. Born from chemist and entrepreneur Lev Okhotin’s goal of creating a professional hair color, the idea has grown into a brand with a place of its own in professional hair care and the beauty industry.',
        'Starting as a small laboratory initiative where the first formulas were tested and developed, ESTEL has combined science, technology and manufacturing to continuously develop products and solutions that meet the needs of professional hairdressers.',
        'Today ESTEL Professional offers a complete solution with a wide range of professional and everyday products for coloring, color refreshing, care, treatment and styling.',
        'The brand’s development is built on its own research and analysis, manufacturing capability, quality control and close collaboration with professional hairdressers. Alongside this, through ESTEL Academy and its training centers, it supports the knowledge, skills and professional growth of hairdressers and salon specialists.',
        'ESTEL’s core philosophy is to support the growth of the professional industry, introduce technological innovation and earn the trust of hairdressers and consumers through quality products.',
      ],
      closing:
        'ESTEL — a brand that brings together professional skill, science, quality and the development of the beauty industry.',
    },
    mongolia: {
      title: 'ESTEL MONGOLIA',
      subtitle: 'Together for the growth of the professional beauty industry.',
      paragraphs: [
        'The story of ESTEL Mongolia began with the goal of bringing an international brand’s products, technology, professional knowledge and standards to Mongolia’s professional hairdressing and beauty industry.',
        'In 2019 we were granted the rights of the sole official distributor of the ESTEL brand in Mongolia and began officially delivering the brand’s products, technology, professional standards, training and services to the Mongolian market.',
        'Our work is not limited to importing and selling products. We have expanded to develop the skills and knowledge of professional hairdressers and salons, provide training, consulting and product-application support, and increase accessibility in the regions.',
        'Today we work under contract with more than 1,000 professional salons, train more than 1,000 hairdressers and beauty specialists every year, and hold master classes in all 21 aimags of Mongolia. We also deliver products and services to consumers and professionals through 15 official branch stores.',
        'We value professional education, product quality, reliable service and long-term partnership, and aim to make a real contribution to the sustainable development of Mongolia’s beauty industry.',
      ],
      closing:
        'For us, ESTEL Mongolia is not merely a brand representative but a bridge connecting the growth of the professional industry with shared success.',
    },
    impact: {
      title: 'OUR PARTNERSHIP & IMPACT',
      subtitle: null,
      intro:
        'Our partnership is built on trust, professional development, accessible service and long-term collaboration. All of this is reflected in the real results we have achieved together.',
      stats: [
        {
          value: '1,000+',
          label: 'Contracted professional salons',
          text: 'Salons in long-term partnership with us',
        },
        {
          value: '1,000+',
          label: 'Professionals / year',
          text: 'Hairdressers and masters trained every year',
        },
        {
          value: '21',
          label: 'Aimags',
          text: 'Master classes delivered across the regions',
        },
        {
          value: '15',
          label: 'Official branch stores',
          text: 'A service network close to consumers',
        },
        {
          value: '3',
          label: 'Factories',
          text: 'The manufacturing capacity of the ESTEL brand',
        },
        {
          value: 'R&D',
          label: 'Research & development laboratory',
          text: 'An independent laboratory base',
        },
      ],
    },
    academy: {
      title: 'ESTEL ACADEMY MONGOLIA',
      subtitle: 'Taking professional skills to the next level',
      paragraphs: [
        'ESTEL Academy Mongolia is a professional training center combining theory and practice, dedicated to developing the knowledge and skills of Mongolia’s hairdressers, professional salons and beauty specialists.',
        'We build international professional methods, product technology and contemporary hairdressing trends into our curriculum, giving specialists the opportunity to deepen their knowledge, master new techniques and develop their skills in real work.',
      ],
      featuresTitle: 'What makes our training different',
      features: [
        {
          title: 'Training that combines theory and practice',
          text: 'Led by technologist trainers holding the official professional certificate of the factory in Saint Petersburg, the training pairs theory with hands-on practice on professional products and tools, and participants who meet the course requirements are awarded a certificate.',
        },
        {
          title: 'A broad professional curriculum',
          text: 'We run courses in color theory, color formulation, hair coloring techniques, lightening, grey hair coloring, streaking and highlight techniques, hair care, treatment, occasion styling, men’s cuts, perming and correct product use.',
        },
        {
          title: 'Supporting specialists in the regions',
          text: 'We organize training and master classes in all 21 aimags of Mongolia, bringing professional knowledge, new techniques and experience to local hairdressers and beauty specialists.',
        },
        {
          title: 'Supporting the growth of the industry',
          text: 'Every year we sponsor hairdressing and beauty competitions, contests and professional events held at national, capital city, aimag and regional level, supporting the development of talent and professional skill in the industry.',
        },
      ],
      goalTitle: 'Our goal',
      goal: 'Our goal goes beyond product knowledge: it is to raise the skills, creative thinking and professional value of every specialist. We share knowledge, develop skills and aim to make a real contribution to the professional growth of Mongolia’s beauty industry.',
    },
    journey: {
      title: 'SHARED SUCCESS – A HISTORIC JOURNEY',
      subtitle: 'Celebrating Success Together',
      paragraphs: [
        'In 2024, ESTEL Mongolia successfully organized an incentive trip to Phu Quoc island for the leading specialists and salon representatives of Mongolia’s hairdressing and beauty industry.',
        'The trip stood out as the first of its kind in Mongolia’s hairdressing and beauty industry to be organized with such a wide group of participants, and was a special occasion that recognized the hard work, achievements and collaboration of the industry’s professionals.',
        'ESTEL Mongolia covered 100% of all travel and holiday costs, taking its best hairdressers and salons on an international trip and creating an unforgettable opportunity to celebrate shared success.',
        'For us, this trip was not just a reward but an expression of the value of growing together, supporting one another and a long-term partnership built on trust.',
      ],
      closing:
        'We value success. We support shared growth. We create success together.',
    },
  },
}

export function getEstelPage(lang) {
  return content[lang] ?? content.mn
}
