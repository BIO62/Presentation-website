// Нүүр хуудасны "Мэдээ" хэсэг (hero слайдерын доор).
//
// Шинэ мэдээ хэрхэн нэмэх вэ:
// 1. Постероо src/images/site/news/ дотор хуулна (босоо постер 4:5 харьцаагаар тайрагдана).
// 2. Энэ файлын дээд хэсэгт import мөр нэмнэ:
//      import newsNew from '@/images/site/news/news-2026-11-10-new.jpg'
// 3. `news` массивын ЭХЭНД шинэ объект нэмнэ (шинэ нь эхэндээ):
//      {
//        id: 'davtagdashgui-id',
//        date: '2026-11-10',            // ISO огноо
//        endDate: '2026-11-15',         // (заавал биш) хугацаатай бол дуусах огноо
//        category: { mn, ru, en },
//        image: newsNew,
//        title: { mn, ru, en },
//        excerpt: { mn, ru, en },
//        link: 'https://...',           // (заавал биш) "Дэлгэрэнгүй" дарахад шинэ таб дээр нээгдэнэ
//        published: true,               // false бол карт харагдахгүй
//      }

import newsBlackFriday from '@/images/site/news/news-2026-10-28-black-friday.jpg'
import newsShineSalbar from '@/images/site/news/news-2026-10-29-shine-salbar.jpg'
import newsAcademySchedule from '@/images/site/news/news-2026-11-academy-schedule.jpg'
import newsGrayCoverage from '@/images/site/news/news-2026-10-26-gray-coverage.jpg'
import newsOmc1 from '@/images/site/news/news-2026-10-20-omc-1.jpg'
import newsOmc2 from '@/images/site/news/news-2026-10-20-omc-2.jpg'

const FB_ESTEL = 'https://www.facebook.com/ESTELMongolia'
const FB_ACADEMY = 'https://www.facebook.com/profile.php?id=100090370504042'

const TRAINING = { mn: 'Сургалт', ru: 'Обучение', en: 'Training' }
const ACHIEVEMENT = { mn: 'Амжилт', ru: 'Достижения', en: 'Achievement' }

export const news = [
  {
    id: 'emart-urangan-salbar',
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
    link: FB_ESTEL,
    published: true,
  },
  {
    id: 'black-friday-2026',
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
    link: FB_ESTEL,
    published: true,
  },
  {
    id: 'academy-november-schedule',
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
    link: FB_ACADEMY,
    published: true,
  },
  {
    id: 'gray-coverage-training',
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
    link: FB_ACADEMY,
    published: true,
  },
  {
    id: 'omc-hair-world-2026-gold',
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
    link: FB_ACADEMY,
    published: true,
  },
  {
    id: 'omc-hair-world-2026-fashion-cup',
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
    link: FB_ACADEMY,
    published: true,
  },
  {
    // Постер ирэхээр: image-д импортыг тавьж, date-ийг оруулаад published: true болгоно.
    id: 'estel-deluxe-renewed',
    date: null,
    category: null, // АСУУЛТ: ангилал (жишээ нь "Шинэ бүтээгдэхүүн") заагаагүй — постертой хамт өгнө үү
    image: null,
    title: {
      mn: 'ESTEL De Luxe — шинэчлэгдсэн будаг',
      ru: 'ESTEL De Luxe — обновлённая краска',
      en: 'ESTEL De Luxe — renewed hair color',
    },
    excerpt: null, // АСУУЛТ: товч текст заагаагүй
    link: FB_ESTEL,
    published: false,
  },
]

// "10.28" эсвэл "10.28 – 11.01"
function formatRange(date, endDate) {
  const md = (iso) => iso.slice(5, 7) + '.' + iso.slice(8, 10)
  return endDate ? `${md(date)} – ${md(endDate)}` : md(date)
}

// Тухайн хэлний энгийн өгөгдөл болгоно; нийтлэгдээгүй, зураггүй мэдээг алгасна.
export function getNews(lang) {
  return news
    .filter((item) => item.published && item.image && item.date)
    .map((item) => ({
      id: item.id,
      date: item.date,
      dateLabel: formatRange(item.date, item.endDate),
      category: item.category[lang] ?? item.category.mn,
      image: item.image,
      title: item.title[lang] ?? item.title.mn,
      excerpt: item.excerpt[lang] ?? item.excerpt.mn,
      link: item.link ?? null,
    }))
}
