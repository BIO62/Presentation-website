// Нүүр хуудасны дээд хэсгийн hero слайдер.
//
// Шинэ слайд хэрхэн нэмэх вэ:
// 1. Зургаа src/images/site/hero/ дотор хуулна (өргөн, хэвтээ зураг хамгийн тохиромжтой —
//    дэлгэцийн ирмэг хүртэл дүүргэж, утсан дээр голын хэсэг нь харагдана).
// 2. Энэ файлын дээд хэсэгт import мөр нэмнэ:
//      import imageNew from '@/images/site/hero/hero-06-new.jpg'
// 3. Доорх `heroSlides` массивт шинэ объект нэмнэ. Массив дахь дараалал = слайдын дараалал.
//    Доод талын 01 ── 06 явцын зураас слайдын тоонд автоматаар тохирно.
//      {
//        image: imageNew,
//        focus: '50% 40%',                // (заавал биш) зургийн гол хэсэг (object-position); үндсэн нь '50% 50%'
//        still: true,                     // (заавал биш) жижиг зураг: томруулах хөдөлгөөнгүй (бүдгэрэхгүй)
//        tag: { mn: '...', ru: '...', en: '...' },    // (заавал биш) гарчгийн дээрх жижиг шошго
//        title: { mn: '...', ru: '...', en: '...' },  // тайлбар
//        href: '/process',                // (заавал биш) хэлгүй зам; /mn, /ru, /en автоматаар нэмэгдэнэ
//      }
// Логотой, өөр компанийн stock зураг бүү ашигла.

import imageHero01 from '@/images/site/hero/hero-01-tara-salbar.jpg'
import imageHero06 from '@/images/site/hero/hero-06-academy-gerchilgee.jpg'
import imageHero07 from '@/images/site/hero/hero-07-academy-hamt-olon.jpg'
import imageHero08 from '@/images/site/hero/hero-08-delguur-hamt-olon.jpg'
import imageHero09 from '@/images/site/hero/hero-09-synergetic-mongolia.jpg'
import imageHero10 from '@/images/site/hero/hero-10-synergetic-ertunts.jpg'

export const heroSlides = [
  {
    image: imageHero06,
    focus: '50% 40%',
    title: {
      mn: 'Мэргэжлийн сургалт, гэрчилгээ олголт',
      ru: 'Профессиональное обучение и сертификация',
      en: 'Professional training & certification',
    },
  },
  {
    image: imageHero07,
    focus: '50% 35%',
    title: {
      mn: 'ESTEL Academy Mongolia',
      ru: 'ESTEL Academy Mongolia',
      en: 'ESTEL Academy Mongolia',
    },
  },
  {
    image: imageHero08,
    focus: '50% 55%',
    title: {
      mn: 'ESTEL нэрийн дэлгүүрийн хамт олон',
      ru: 'Команда фирменного магазина ESTEL',
      en: 'Our ESTEL brand store team',
    },
  },
  {
    image: imageHero01,
    focus: '50% 30%',
    title: {
      mn: 'Тара центр дэх салбар дэлгүүр',
      ru: 'Фирменный магазин в Тара центре',
      en: 'Our store at Tara Center',
    },
  },
  {
    image: imageHero09,
    focus: '50% 35%',
    still: true,
    title: {
      mn: 'SYNERGETIC Mongolia',
      ru: 'SYNERGETIC Mongolia',
      en: 'SYNERGETIC Mongolia',
    },
  },
  {
    image: imageHero10,
    focus: '50% 50%',
    still: true,
    title: {
      mn: 'SYNERGETIC ертөнц',
      ru: 'Мир SYNERGETIC',
      en: 'The world of SYNERGETIC',
    },
  },
]

// Тухайн хэлний энгийн өгөгдөл болгоно (client компонент руу зөвхөн хэрэгтэйгээ дамжуулна).
export function getHeroSlides(lang) {
  return heroSlides.map((slide) => ({
    image: slide.image,
    focus: slide.focus ?? null,
    still: slide.still ?? false,
    tag: slide.tag ? slide.tag[lang] ?? slide.tag.mn : null,
    title: slide.title[lang] ?? slide.title.mn,
    href: slide.href ? `/${lang}${slide.href}` : null,
  }))
}
