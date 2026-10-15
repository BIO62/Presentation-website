// Нүүр хуудасны дээд хэсгийн hero слайдер.
//
// Шинэ слайд хэрхэн нэмэх вэ:
// 1. Зургаа src/images/ дотор хуулна (өргөн, хэвтээ зураг хамгийн тохиромжтой —
//    desktop дээр 21:9, утсан дээр 4:3 харьцаагаар тайрагдана).
// 2. Энэ файлын дээд хэсэгт import мөр нэмнэ:
//      import imageNew from '@/images/new-photo.jpg'
// 3. Доорх `heroSlides` массивт шинэ объект нэмнэ. Массив дахь дараалал = слайдын дараалал.
//      {
//        image: imageNew,
//        position: 'center',              // (заавал биш) зураг тайрах цэг, жишээ нь 'center 30%'
//        tag: { mn: '...', ru: '...', en: '...' },    // зургийн доорх жижиг шошго
//        title: { mn: '...', ru: '...', en: '...' },  // нэг мөр гарчиг
//        href: '/blog/...',               // (заавал биш) хэлгүй зам; /mn, /ru, /en автоматаар нэмэгдэнэ
//      }
//    Блогийн нийтлэлийн гарчгийг шинээр бичихгүй, доорх шиг dictionary-аас авна.
// Логотой, өөр компанийн stock зураг бүү ашигла.

import en from '@/dictionaries/en.json'
import mn from '@/dictionaries/mn.json'
import ru from '@/dictionaries/ru.json'
import imageEstelHero from '@/app/[lang]/work/estel/hero.jpg'
import imageEstelAcademySession from '@/images/estel-academy-session.jpg'
import imageHairAcademyTraining from '@/images/hair-academy-training.jpg'

function blogTitle(slug) {
  return {
    mn: mn.blog[slug].title,
    ru: ru.blog[slug].title,
    en: en.blog[slug].title,
  }
}

export const heroSlides = [
  {
    image: imageHairAcademyTraining,
    position: 'center 45%',
    tag: { mn: 'ESTEL ACADEMY', ru: 'ESTEL ACADEMY', en: 'ESTEL ACADEMY' },
    title: {
      mn: 'Онол, практик хосолсон мэргэжлийн сургалт',
      ru: 'Профессиональное обучение, сочетающее теорию и практику',
      en: 'Professional training that combines theory and practice',
    },
    href: '/process',
  },
  {
    image: imageEstelAcademySession,
    position: 'center 40%',
    tag: { mn: '2024.10.10–11', ru: '2024.10.10–11', en: '2024.10.10–11' },
    title: blogTitle('estel-scalp-diagnosis-event'),
    href: '/blog/estel-scalp-diagnosis-event',
  },
  {
    // Түр зураг: SYNERGETIC-ийн шагналын зураг ирэхээр солино.
    image: imageEstelHero,
    position: 'center 55%',
    tag: { mn: 'SYNERGETIC', ru: 'SYNERGETIC', en: 'SYNERGETIC' },
    title: blogTitle('synergetic-golden-bear-award'),
    href: '/blog/synergetic-golden-bear-award',
  },
]

// Тухайн хэлний энгийн өгөгдөл болгоно (client компонент руу зөвхөн хэрэгтэйгээ дамжуулна).
export function getHeroSlides(lang) {
  return heroSlides.map((slide) => ({
    image: slide.image,
    position: slide.position ?? 'center',
    tag: slide.tag[lang] ?? slide.tag.mn,
    title: slide.title[lang] ?? slide.title.mn,
    href: slide.href ? `/${lang}${slide.href}` : null,
  }))
}
