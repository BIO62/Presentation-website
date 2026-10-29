// Нүүр хуудасны дээд хэсгийн hero слайдер.
//
// Шинэ слайд хэрхэн нэмэх вэ:
// 1. Зургаа src/images/site/hero/ дотор хуулна (өргөн, хэвтээ зураг хамгийн тохиромжтой —
//    дэлгэцийн ирмэг хүртэл дүүргэж, утсан дээр голын хэсэг нь харагдана).
// 2. Энэ файлын дээд хэсэгт import мөр нэмнэ:
//      import imageNew from '@/images/site/hero/hero-06-new.jpg'
// 3. Доорх `heroSlides` массивт шинэ объект нэмнэ. Массив дахь дараалал = слайдын дараалал.
//    Доод талын 01 ── 05 явцын зураас слайдын тоонд автоматаар тохирно.
//      {
//        image: imageNew,
//        focus: '50% 40%',                // (заавал биш) зургийн гол хэсэг (object-position); үндсэн нь '50% 50%'
//        tag: { mn: '...', ru: '...', en: '...' },    // (заавал биш) гарчгийн дээрх жижиг шошго
//        title: { mn: '...', ru: '...', en: '...' },  // тайлбар
//        href: '/process',                // (заавал биш) хэлгүй зам; /mn, /ru, /en автоматаар нэмэгдэнэ
//      }
// Логотой, өөр компанийн stock зураг бүү ашигла.

import imageHero01 from '@/images/site/hero/hero-01-tara-salbar.jpg'
import imageHero02 from '@/images/site/hero/hero-02-sansar-emart.jpg'
import imageHero03 from '@/images/site/hero/hero-03-estel-academy.jpg'
import imageHero04 from '@/images/site/hero/hero-04-surgalt-gerchilgee.jpg'
import imageHero05 from '@/images/site/hero/hero-05-aguulah.jpg'

export const heroSlides = [
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
    image: imageHero02,
    focus: '50% 45%',
    title: {
      mn: 'Сансар E-mart салбар',
      ru: 'Филиал в E-mart Сансар',
      en: 'Sansar E-mart branch',
    },
  },
  {
    image: imageHero03,
    focus: '38% 25%',
    title: {
      mn: 'ESTEL Academy Mongolia',
      ru: 'ESTEL Academy Mongolia',
      en: 'ESTEL Academy Mongolia',
    },
  },
  {
    image: imageHero04,
    focus: '50% 45%',
    title: {
      mn: 'Мэргэжлийн сургалт, гэрчилгээ олголт',
      ru: 'Профессиональное обучение и сертификация',
      en: 'Professional training & certification',
    },
  },
  {
    image: imageHero05,
    focus: '57% 45%',
    title: {
      mn: 'Төв агуулах, түгээлтийн сүлжээ',
      ru: 'Центральный склад и дистрибуция',
      en: 'Central warehouse & distribution',
    },
  },
]

// Тухайн хэлний энгийн өгөгдөл болгоно (client компонент руу зөвхөн хэрэгтэйгээ дамжуулна).
export function getHeroSlides(lang) {
  return heroSlides.map((slide) => ({
    image: slide.image,
    focus: slide.focus ?? null,
    tag: slide.tag ? slide.tag[lang] ?? slide.tag.mn : null,
    title: slide.title[lang] ?? slide.title.mn,
    href: slide.href ? `/${lang}${slide.href}` : null,
  }))
}
