// Нүүр хуудасны "Мэдээ" хэсэг (hero слайдерын доор) болон мэдээ бүрийн дотоод хуудас
// (/[lang]/news/[slug]).
//
// Шинэ мэдээ хэрхэн нэмэх вэ:
// 1. Постероо src/images/site/news/ дотор хуулна.
// 2. Энэ файлын дээд хэсэгт import мөр нэмнэ:
//      import newsNew from '@/images/site/news/news-2026-11-10-new.jpg'
// 3. `news` массивт шинэ объект нэмнэ (сайт дээр огноогоор нь автоматаар эрэмбэлэгдэнэ, шинэ нь эхэндээ):
//      {
//        slug: 'davtagdashgui-latin-ner',  // хуудасны хаяг: /mn/news/<slug>
//        date: '2026-11-10',               // ISO огноо
//        endDate: '2026-11-15',            // (заавал биш) хугацаатай бол дуусах огноо
//        category: { mn, ru, en },
//        image: newsNew,
//        title: { mn, ru, en },
//        excerpt: { mn, ru, en },          // картан дээрх товч текст
//        body: { mn: [...], ru: [...], en: [...] },  // дотоод хуудасны догол мөрүүд
//        link: 'https://...',              // (заавал биш) "Facebook-оос үзэх" холбоос
//        published: true,                  // false бол хаана ч харагдахгүй
//      }

import newsDeluxe from '@/images/site/news/news-2026-06-08-deluxe.jpg'
import newsOmc1 from '@/images/site/news/news-2026-10-20-omc-1-estel.jpg'
import newsOmc2 from '@/images/site/news/news-2026-10-20-omc-2.jpg'
import newsGrayCoverage from '@/images/site/news/news-2026-10-26-gray-coverage.jpg'
import newsBlackFriday from '@/images/site/news/news-2026-10-28-black-friday.jpg'
import newsShineSalbar from '@/images/site/news/news-2026-10-29-urangan-photo.jpg'
import newsAcademySchedule from '@/images/site/news/news-2026-11-academy-schedule.jpg'
import newsBlackFridayNov from '@/images/site/news/news-2026-11-12-black-friday.png'
import newsDarkhanExpo from '@/images/site/news/news-2026-11-12-darkhan-beauty-expo.png'
import newsSynergeticNomin from '@/images/site/news/news-2026-11-13-synergetic-nomin.png'
import newsHighlightBlond from '@/images/site/news/news-2026-11-14-highlight-blond.png'

const FB_ESTEL = 'https://www.facebook.com/ESTELMongolia'
const FB_ACADEMY = 'https://www.facebook.com/profile.php?id=100090370504042'

const TRAINING = { mn: 'Сургалт', ru: 'Обучение', en: 'Training' }
const ACHIEVEMENT = { mn: 'Амжилт', ru: 'Достижения', en: 'Achievement' }
const SALE = { mn: 'Хямдрал', ru: 'Акция', en: 'Sale' }
const EVENT = { mn: 'Арга хэмжээ', ru: 'Мероприятие', en: 'Event' }

export const news = [
  {
    slug: 'highlight-blond-surgaltiin-ur-dun',
    date: '2026-11-14',
    category: TRAINING,
    image: newsHighlightBlond,
    title: {
      mn: 'High Light Blond сургалтын үр дүн',
      ru: 'Результаты курса High Light Blond',
      en: 'High Light Blond training results',
    },
    excerpt: {
      mn: 'ESTEL Academy-ийн High Light Blond буюу үс цайруулалтын сургалтад хамрагдсан үсчдийн сурсан мэдлэг, эзэмшсэн ур чадварын бодит үр дүн.',
      ru: 'Реальные результаты мастеров, прошедших в ESTEL Academy курс High Light Blond по осветлению волос.',
      en: 'Real results from the hairdressers who completed the High Light Blond hair lightening course at ESTEL Academy.',
    },
    body: {
      mn: [
        'Онолын мэдлэгээс бодит үр дүн хүртэл суралцсан үсчдэдээ баяр хүргэе.',
        'ESTEL Academy-ийн High Light Blond буюу үс цайруулалтын сургалтад хамрагдсан үсчдийн маань сурсан мэдлэг, эзэмшсэн ур чадварын бодит үр дүнг хүргэж байна.',
      ],
      ru: [
        'Поздравляем мастеров, которые прошли путь от теории до реального результата.',
        'Представляем реальные результаты знаний и навыков, которые наши мастера получили на курсе ESTEL Academy High Light Blond по осветлению волос.',
      ],
      en: [
        'Congratulations to our hairdressers, who went all the way from theory to real results.',
        'Here are the real results of the knowledge and skills gained by the hairdressers who took the High Light Blond hair lightening course at ESTEL Academy.',
      ],
    },
    link: 'https://www.facebook.com/reel/1006345245161256/',
    published: true,
  },
  {
    slug: 'synergetic-black-friday-nomin',
    date: '2026-11-13',
    endDate: '2026-11-20',
    category: SALE,
    image: newsSynergeticNomin,
    title: {
      mn: 'SYNERGETIC Black Friday — Номин сүлжээ дэлгүүрт',
      ru: 'SYNERGETIC Black Friday — в сети магазинов «Номин»',
      en: 'SYNERGETIC Black Friday at Nomin stores',
    },
    excerpt: {
      mn: 'Номин төв болон орон нутгийн нийт 44 салбар дэлгүүрээс SYNERGETIC ECO бүтээгдэхүүнээ 20% хямдралтай үнээр аваарай. 11.13–11.20.',
      ru: 'В 44 магазинах сети «Номин» в столице и регионах — скидка 20% на эко-продукцию SYNERGETIC. 13–20 ноября.',
      en: '20% off SYNERGETIC ECO products at all 44 Nomin stores in the capital and the regions. November 13–20.',
    },
    body: {
      mn: [
        'Black Friday Номин сүлжээ дэлгүүрт үргэлжилсээр байна.',
        'Номин төв болон орон нутгийн нийт 44 салбар дэлгүүрээс SYNERGETIC ECO бүтээгдэхүүнүүдээ 20% хямдралтай үнээр худалдан аваарай.',
        '2026.11.13–20 хүртэл 7 хоногийн турш Номингийн бүх сүлжээ дэлгүүрээр үргэлжилнэ. Онлайн захиалга: www.nomin.mn',
      ],
      ru: [
        'Black Friday продолжается в сети магазинов «Номин».',
        'В 44 магазинах «Номин» в столице и регионах эко-продукцию SYNERGETIC можно купить со скидкой 20%.',
        'Акция действует 7 дней, с 13 по 20 ноября 2026 года, во всех магазинах сети. Онлайн-заказ: www.nomin.mn',
      ],
      en: [
        'Black Friday continues at Nomin stores.',
        'Get SYNERGETIC ECO products at 20% off in all 44 Nomin stores in the capital and the regions.',
        'The offer runs for 7 days, November 13–20, 2026, across the whole Nomin chain. Online orders: www.nomin.mn',
      ],
    },
    link: 'https://www.facebook.com/SynergeticMongolia/posts/pfbid0oJoRzZTaGBTvHe3neUxbgrFhYFpSpzoXo223SGKbZEMKaNorLMSSzgLNcnAinVLwl',
    published: true,
  },
  {
    slug: 'darkhan-international-beauty-expo-2026',
    date: '2026-11-13',
    endDate: '2026-11-15',
    category: EVENT,
    image: newsDarkhanExpo,
    title: {
      mn: 'Darkhan International Beauty Expo 2026',
      ru: 'Darkhan International Beauty Expo 2026',
      en: 'Darkhan International Beauty Expo 2026',
    },
    excerpt: {
      mn: 'Дархан хотод 3 дахь жилдээ болж буй гоо сайхны үзэсгэлэн худалдаанд ESTEL, SYNERGETIC оролцож байна. Хуйх оношилгоо үнэгүй. 11.13–15, Grand Yak Event Hall.',
      ru: 'ESTEL и SYNERGETIC участвуют в выставке красоты, которая проходит в Дархане третий год подряд. Бесплатная диагностика кожи головы. 13–15 ноября, Grand Yak Event Hall.',
      en: 'ESTEL and SYNERGETIC are at the beauty expo held in Darkhan for the third year running. Free scalp diagnostics. November 13–15, Grand Yak Event Hall.',
    },
    body: {
      mn: [
        'Дархан хотод 3 дахь жилдээ зохион байгуулагдаж буй гоо сайхны үзэсгэлэн худалдаанд бид оролцож байна.',
        'ESTEL: бүх бүтээгдэхүүн 10%–50% хямдралтай, мэргэжлийн хуйх оношилгоо үнэгүй.',
        'SYNERGETIC: бүх бүтээгдэхүүн 10%–40% хямдралтай, 200,000₮-өөс дээш худалдан авалт хийсэн эхний 50 хэрэглэгчид бэлэгтэй.',
        '2026.11.13–15, 12:00–20:00. Grand Yak Event Hall, Дархан хот.',
      ],
      ru: [
        'Мы участвуем в выставке-ярмарке красоты, которая проходит в Дархане третий год подряд.',
        'ESTEL: скидки 10%–50% на всю продукцию и бесплатная профессиональная диагностика кожи головы.',
        'SYNERGETIC: скидки 10%–40% на всю продукцию, подарки первым 50 покупателям при покупке от 200,000₮.',
        '13–15 ноября 2026 года, 12:00–20:00. Grand Yak Event Hall, г. Дархан.',
      ],
      en: [
        'We are taking part in the beauty expo held in Darkhan for the third year running.',
        'ESTEL: 10%–50% off all products and free professional scalp diagnostics.',
        'SYNERGETIC: 10%–40% off all products, with gifts for the first 50 customers who spend over 200,000₮.',
        'November 13–15, 2026, 12:00–20:00. Grand Yak Event Hall, Darkhan.',
      ],
    },
    link: 'https://www.facebook.com/ESTELMongolia/posts/pfbid08XWXkQwMZiHuqiiSN8LGkLNcLtYHS4Dv8Dx2q4212nF7bw8NUMmBaXBCvUDugZpBl',
    published: true,
  },
  {
    slug: 'estel-black-friday-11-11',
    date: '2026-11-11',
    endDate: '2026-11-17',
    category: SALE,
    image: newsBlackFridayNov,
    title: {
      mn: 'ESTEL Black Friday — 10%–50% хямдрал',
      ru: 'ESTEL Black Friday — скидки 10%–50%',
      en: 'ESTEL Black Friday — 10%–50% off',
    },
    excerpt: {
      mn: 'Бүх салбарт 10%–50% хүртэлх хөнгөлөлт. Блондерууд 30%, PRO ART GLOSS 20% хямдарлаа. 11.11–11.17-г дуустал. Захиалга: estelpro.mn',
      ru: 'Скидки 10%–50% во всех филиалах. Блондеры — 30%, PRO ART GLOSS — 20%. До 17 ноября включительно. Заказ: estelpro.mn',
      en: '10%–50% off in all branches. Blonders 30% off, PRO ART GLOSS 20% off. Through November 17. Order at estelpro.mn',
    },
    body: {
      mn: [
        'Таны хүсэн хүлээсэн их хямдрал эхэллээ! Бүх салбарт 10%–50% хүртэлх хөнгөлөлттэй үнээр бүтээгдэхүүнээ худалдан аваарай. Өнгөлөгч маскууд ч хямдарлаа.',
        'Блондерууд 30%, PRO ART GLOSS 20% хямдралтай.',
        'Бүтээгдэхүүний нөөц хязгаартай. 11.11–11.17-г дуустал үргэлжилнэ. Онлайн захиалга: estelpro.mn/black-friday',
        'Салбарууд: Уранганы Emart 1 давхар; Тара центр 2 давхар, В-227; Сансар, Чингисийн Emart 2 давхар; Баянгол, 10-р хорооллын Emart 3 давхар; Их дэлгүүр 1 давхар; Эрдэнэт, Орхон молл 2 давхар; Дархан, Аму молл 2 давхар.',
        'Pocket Zero / Sono / Storepay-р төлбөрөө хуваан төлөх боломжтой.',
      ],
      ru: [
        'Долгожданная большая распродажа началась! Во всех филиалах — скидки от 10% до 50%. Скидки действуют и на оттеночные маски.',
        'Блондеры — со скидкой 30%, PRO ART GLOSS — со скидкой 20%.',
        'Количество товара ограничено. Акция действует до 17 ноября включительно. Онлайн-заказ: estelpro.mn/black-friday',
        'Филиалы: Emart Уранган, 1 этаж; Тара центр, 2 этаж, В-227; Emart Чингис (Сансар), 2 этаж; Emart Баянгол (10-й микрорайон), 3 этаж; Их дэлгүүр, 1 этаж; Эрдэнэт, Орхон молл, 2 этаж; Дархан, Аму молл, 2 этаж.',
        'Доступна оплата в рассрочку через Pocket Zero / Sono / Storepay.',
      ],
      en: [
        'The big sale you have been waiting for is here! Get 10%–50% off in all our branches, including tinting masks.',
        'Blonders are 30% off and PRO ART GLOSS is 20% off.',
        'Stock is limited. The sale runs through November 17. Online orders: estelpro.mn/black-friday',
        'Branches: Emart Urangan, 1st floor; Tara Center, 2nd floor, B-227; Emart Chinggis (Sansar), 2nd floor; Emart Bayangol (10th khoroolol), 3rd floor; Ikh Delguur, 1st floor; Erdenet, Orkhon Mall, 2nd floor; Darkhan, Amu Mall, 2nd floor.',
        'Pay in installments with Pocket Zero / Sono / Storepay.',
      ],
    },
    link: 'https://www.facebook.com/ESTELMongolia/posts/pfbid035S5Lrz7KPQ7WbyGM2SRAzFXWsHV1QUvSMJe4VXp5TVxmPoVJ1D9qDFSchPtmkh7gl',
    published: true,
  },
  {
    slug: 'emart-urangan-salbar',
    date: '2026-10-29',
    category: { mn: 'Шинэ салбар', ru: 'Новый филиал', en: 'New branch' },
    image: newsShineSalbar,
    title: {
      mn: 'Emart Уранган салбар нээгдлээ',
      ru: 'Открылся филиал в Emart Уранган',
      en: 'New branch at Emart Urangan',
    },
    excerpt: {
      mn: 'Emart Уранган 1 давхарт шинэ салбар нээгдлээ. Нээлтийн хямдрал: бүх бүтээгдэхүүн 10%, сонгосон бүтээгдэхүүн 20–50%.',
      ru: 'Новый магазин на 1 этаже Emart Уранган. Скидки к открытию: 10% на всё, 20–50% на избранные товары.',
      en: 'Our new store is now open on the 1st floor of Emart Urangan. Opening sale: 10% off everything, 20–50% off selected products.',
    },
    body: {
      mn: [
        'Манай шинэ салбар Emart Уранган худалдааны төвийн 1 давхарт 10 сарын 29-нд нээгдлээ.',
        'Нээлтийн хямдралаар бүх бүтээгдэхүүн 10%, сонгосон бүтээгдэхүүн 20–50% хямдарна.',
      ],
      ru: [
        '29 октября на 1 этаже ТЦ Emart Уранган открылся наш новый филиал.',
        'В честь открытия — скидка 10% на весь ассортимент и 20–50% на избранные товары.',
      ],
      en: [
        'Our new branch opened on October 29 on the 1st floor of Emart Urangan.',
        'Opening sale: 10% off everything and 20–50% off selected products.',
      ],
    },
    link: FB_ESTEL,
    published: true,
  },
  {
    slug: 'black-friday-synergetic-estel',
    date: '2026-10-28',
    endDate: '2026-11-01',
    category: { mn: 'Хямдрал', ru: 'Акция', en: 'Sale' },
    image: newsBlackFriday,
    title: {
      mn: 'Black Friday — Synergetic × ESTEL',
      ru: 'Black Friday — Synergetic × ESTEL',
      en: 'Black Friday — Synergetic × ESTEL',
    },
    excerpt: {
      mn: '10.28–11.01-ний хооронд зөвхөн Тара центр салбарт: бүх бүтээгдэхүүн 10%, сонгосон бүтээгдэхүүн 20–50% хямдарна.',
      ru: 'С 28.10 по 01.11 только в филиале Тара центр: скидка 10% на всё и 20–50% на избранные товары.',
      en: 'Oct 28 – Nov 1, Tara Center branch only: 10% off everything and 20–50% off selected products.',
    },
    body: {
      mn: [
        'Synergetic × ESTEL Black Friday хямдрал 10.28-аас 11.01-ний хооронд үргэлжилнэ.',
        'Хямдрал зөвхөн Тара центр (B-227) салбарт хүчинтэй: бүх бүтээгдэхүүн 10%, сонгосон бүтээгдэхүүн 20–50%.',
      ],
      ru: [
        'Акция Black Friday от Synergetic × ESTEL проходит с 28 октября по 1 ноября.',
        'Только в филиале Тара центр (B-227): скидка 10% на всё и 20–50% на избранные товары.',
      ],
      en: [
        'The Synergetic × ESTEL Black Friday sale runs from October 28 to November 1.',
        'Valid only at our Tara Center branch (B-227): 10% off everything and 20–50% off selected products.',
      ],
    },
    link: FB_ESTEL,
    published: true,
  },
  {
    slug: 'academy-11-sar-khuvaari',
    date: '2026-11-03',
    category: TRAINING,
    image: newsAcademySchedule,
    title: {
      mn: 'ESTEL Academy — 11 сарын сургалтын хуваарь',
      ru: 'ESTEL Academy — расписание на ноябрь',
      en: 'ESTEL Academy — November schedule',
    },
    excerpt: {
      mn: '11.03-нд 10:00 цагаас GLAM HAIR MASTERCLASS (багш Б. Сэлэнгэмөрөн). Хаяг: Олимп хотхон 424. Утас: 8610-7202, 8620-7202, 8621-7202.',
      ru: '3 ноября в 10:00 GLAM HAIR MASTERCLASS (преподаватель Б. Сэлэнгэмөрөн). Адрес: Олимп хотхон 424. Тел.: 8610-7202, 8620-7202, 8621-7202.',
      en: 'GLAM HAIR MASTERCLASS on Nov 3 at 10:00 with B. Selengemurun. Address: Olimp Khotkhon 424. Tel: 8610-7202, 8620-7202, 8621-7202.',
    },
    body: {
      mn: [
        'ESTEL Academy Mongolia 11 сарын сургалтын хуваариа зарлалаа.',
        '11 сарын 3-нд 10:00 цагаас Б. Сэлэнгэмөрөн багшийн GLAM HAIR MASTERCLASS болно.',
        'Хаяг: Олимп хотхон 424. Бүртгэл, лавлах утас: 8610-7202, 8620-7202, 8621-7202.',
      ],
      ru: [
        'ESTEL Academy Mongolia опубликовала расписание обучения на ноябрь.',
        '3 ноября в 10:00 — GLAM HAIR MASTERCLASS с преподавателем Б. Сэлэнгэмөрөн.',
        'Адрес: Олимп хотхон 424. Запись и справки: 8610-7202, 8620-7202, 8621-7202.',
      ],
      en: [
        'ESTEL Academy Mongolia has announced its November training schedule.',
        'GLAM HAIR MASTERCLASS with B. Selengemurun on November 3 at 10:00.',
        'Address: Olimp Khotkhon 424. Registration: 8610-7202, 8620-7202, 8621-7202.',
      ],
    },
    link: FB_ACADEMY,
    published: true,
  },
  {
    slug: 'gray-coverage-surgalt',
    date: '2026-10-26',
    category: TRAINING,
    image: newsGrayCoverage,
    title: {
      mn: 'Gray Coverage — буурал будалтын сургалт',
      ru: 'Gray Coverage — окрашивание седины',
      en: 'Gray Coverage training',
    },
    excerpt: {
      mn: 'ESTEL Academy-д Х. Отгонбаатар багшийн буурал үсийг бүрэн будах техникийн сургалт амжилттай болж өнгөрлөө.',
      ru: 'В ESTEL Academy прошёл семинар Х. Отгонбаатара по техникам полного закрашивания седины.',
      en: 'ESTEL Academy hosted a seminar by Kh. Otgonbaatar on full gray-coverage coloring techniques.',
    },
    body: {
      mn: [
        'ESTEL Academy Mongolia-д 10 сарын 26-нд Х. Отгонбаатар багшийн буурал үсийг будах техникийн "Gray Coverage" сургалт амжилттай боллоо.',
      ],
      ru: [
        '26 октября в ESTEL Academy Mongolia прошёл семинар Х. Отгонбаатара «Gray Coverage» по техникам окрашивания седины.',
      ],
      en: [
        'On October 26, ESTEL Academy Mongolia hosted the "Gray Coverage" seminar on gray-hair coloring techniques by Kh. Otgonbaatar.',
      ],
    },
    link: FB_ACADEMY,
    published: true,
  },
  {
    slug: 'omc-hair-world-2026-alt',
    date: '2026-10-20',
    category: ACHIEVEMENT,
    image: newsOmc1,
    title: {
      mn: 'OMC Hair World 2026 — Алтан медаль',
      ru: 'OMC Hair World 2026 — золотая медаль',
      en: 'Gold at OMC Hair World 2026',
    },
    excerpt: {
      mn: 'Парист болсон OMC Hair World 2026 дэлхийн аварга шалгаруулах тэмцээний Creative Fade Cut төрөлд Н. Алтаншагай алтан медаль хүртлээ.',
      ru: 'На чемпионате мира OMC Hair World 2026 в Париже Н. Алтаншагай завоевал золото в категории Creative Fade Cut.',
      en: 'At OMC Hair World 2026 in Paris, N. Altanshagai won gold in the Creative Fade Cut category.',
    },
    body: {
      mn: [
        'Францын Парис хотод болсон OMC Hair World 2026 үсчний дэлхийн аварга шалгаруулах тэмцээний Creative Fade Cut төрөлд Н. Алтаншагай алтан медаль хүртлээ.',
      ],
      ru: [
        'На чемпионате мира по парикмахерскому искусству OMC Hair World 2026 в Париже Н. Алтаншагай завоевал золотую медаль в категории Creative Fade Cut.',
      ],
      en: [
        'At the OMC Hair World 2026 championship in Paris, France, N. Altanshagai won the gold medal in the Creative Fade Cut category.',
      ],
    },
    link: FB_ACADEMY,
    published: true,
  },
  {
    slug: 'omc-fashion-cup',
    date: '2026-10-20',
    category: ACHIEVEMENT,
    image: newsOmc2,
    title: {
      mn: 'Fashion Cup — тусгай шагнал',
      ru: 'Fashion Cup — специальный приз',
      en: 'Fashion Cup — special award',
    },
    excerpt: {
      mn: 'OMC Hair World 2026-ийн Fashion Cup төрөлд Э. Төрболдын баг тусгай шагнал хүртлээ.',
      ru: 'Команда Э. Турболда получила специальный приз в категории Fashion Cup на OMC Hair World 2026.',
      en: "E. Turbold's team received a special award in the Fashion Cup at OMC Hair World 2026.",
    },
    body: {
      mn: [
        'OMC Hair World 2026 тэмцээний Fashion Cup төрөлд Э. Төрболдын баг тусгай шагнал хүртлээ.',
      ],
      ru: [
        'Команда Э. Турболда получила специальный приз в категории Fashion Cup на OMC Hair World 2026.',
      ],
      en: [
        "E. Turbold's team received a special award in the Fashion Cup category at OMC Hair World 2026.",
      ],
    },
    link: FB_ACADEMY,
    published: true,
  },
  {
    slug: 'estel-deluxe-shinechlegdsen-savlagaa',
    date: '2026-06-08',
    category: { mn: 'Шинэ бүтээгдэхүүн', ru: 'Новинка', en: 'New products' },
    image: newsDeluxe,
    title: {
      mn: 'ESTEL De Luxe — шинэчлэгдсэн савлагаа',
      ru: 'ESTEL De Luxe — обновлённая упаковка',
      en: 'ESTEL De Luxe — new packaging',
    },
    excerpt: {
      mn: 'ESTEL Professional-ийн De Luxe цувралын шампунь, бальзам шинэ савлагаатай болж, захиалга өдөр бүр гарч байна.',
      ru: 'Шампуни и бальзамы серии De Luxe от ESTEL Professional — в новой упаковке. Заказы отправляем ежедневно.',
      en: 'ESTEL Professional De Luxe shampoos and balms now come in new packaging, with orders shipped daily.',
    },
    body: {
      mn: [
        'ESTEL Professional-ийн De Luxe цувралын бүтээгдэхүүнүүд шинэ савлагаатай болжээ.',
        'Цувралд: эрчимтэй цэвэрлэгч шампунь, өнгө тогтворжуулагч шампунь (pH 4.5), өнгө тогтворжуулагч бальзам, үсний бүтэц тэгшлэх бальзам багтана.',
        'Захиалга өдөр бүр гарч байна. Захиалгын утас: 8605-7202, 8603-7202.',
      ],
      ru: [
        'Продукция серии De Luxe от ESTEL Professional — в обновлённой упаковке.',
        'В серии: шампунь интенсивного очищения, шампунь-стабилизатор цвета (pH 4,5), бальзам-стабилизатор цвета и бальзам для выравнивания структуры волос.',
        'Заказы отправляем ежедневно. Телефоны: 8605-7202, 8603-7202.',
      ],
      en: [
        "ESTEL Professional's De Luxe line now comes in new packaging.",
        'The line includes Intensive Cleansing Shampoo, Color Stabilizer Shampoo (pH 4.5), Color Stabilizer Balm and Hair Structure Smoothing Balm.',
        'Orders ship daily. Call 8605-7202 or 8603-7202.',
      ],
    },
    link: FB_ESTEL,
    published: true,
  },
]

// "10.28" эсвэл "10.28 – 11.01"
function formatRange(date, endDate) {
  const md = (iso) => iso.slice(5, 7) + '.' + iso.slice(8, 10)
  return endDate ? `${md(date)} – ${md(endDate)}` : md(date)
}

// Нийтлэгдсэн мэдээ, огноогоор эрэмбэлсэн (шинэ нь эхэндээ)
function publishedNews() {
  return news
    .filter((item) => item.published && item.image && item.date && item.slug)
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
}

function localize(item, lang) {
  return {
    slug: item.slug,
    href: `/${lang}/news/${item.slug}`,
    date: item.date,
    dateLabel: formatRange(item.date, item.endDate),
    category: item.category[lang] ?? item.category.mn,
    image: item.image,
    title: item.title[lang] ?? item.title.mn,
    excerpt: item.excerpt[lang] ?? item.excerpt.mn,
    body: item.body?.[lang] ?? item.body?.mn ?? [],
    link: item.link ?? null,
  }
}

// Нүүр хуудасны картууд
export function getNews(lang) {
  return publishedNews().map((item) => localize(item, lang))
}

// Дотоод хуудас: олдохгүй бол null
export function getNewsItem(slug, lang) {
  const item = publishedNews().find((n) => n.slug === slug)
  return item ? localize(item, lang) : null
}

export function getNewsSlugs() {
  return publishedNews().map((item) => item.slug)
}
