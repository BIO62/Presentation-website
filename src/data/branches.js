// Салбар дэлгүүрүүдийн жагсаалт: /[lang]/contact хуудасны "Салбар дэлгүүрүүд" хэсэг (#branches).
//
// Салбар нэмэх / засах:
// 1. Доорх `branches` массивт объект нэмнэ эсвэл засна. Хот дотроо массив дахь дарааллаар гарна.
// 2. Хот: Улаанбаатар → Дархан → Эрдэнэт дарааллаар бүлэглэгдэнэ (`CITY_ORDER`). Шинэ хот бол
//    `CITY_ORDER`-д англи нэрээр нь нэмнэ.
// 3. Зураг нэмэх: зургаа src/images/site/ дотор хуулж, дээр import хийгээд `image`-д тавина.
//    `image: null` бол зураггүй, зөвхөн текстэн карт харагдана.
// 4. `phone`, `hours` null бол харагдахгүй. Утас: '7700-0000'; цаг: { mn: '10:00–21:00', ru: ..., en: ... }
// 5. `mapQuery`: Google Maps-д хайх үг ("Газрын зураг ↗" холбоос үүгээр нээгдэнэ).
// 6. `isNew: true` бол нэрийн хажууд "Шинэ" шошго гарна. `published: false` бол харагдахгүй.

import retailSansar from '@/images/site/retail/retail-04-sansar.jpg'
import retailTara from '@/images/site/retail/retail-01-tara.jpg'

const UB = { mn: 'Улаанбаатар', ru: 'Улан-Батор', en: 'Ulaanbaatar' }

export const CITY_ORDER = ['Ulaanbaatar', 'Darkhan', 'Erdenet']

export const branches = [
  {
    id: 'tara',
    city: UB,
    name: { mn: 'Тара центр', ru: 'Тара центр', en: 'Tara Center' },
    location: { mn: 'B-227 тоот', ru: 'пав. B-227', en: 'Unit B-227' },
    phone: null,
    hours: null,
    image: retailTara,
    mapQuery: 'Tara center Ulaanbaatar',
    isNew: false,
    published: true,
  },
  {
    id: 'sansar',
    city: UB,
    name: { mn: 'Сансар E-mart', ru: 'E-mart Сансар', en: 'E-mart Sansar' },
    location: { mn: '2 давхар', ru: '2 этаж', en: '2nd floor' },
    phone: null,
    hours: null,
    image: retailSansar,
    mapQuery: 'E-mart Sansar Ulaanbaatar',
    isNew: false,
    published: true,
  },
  {
    id: 'urangan',
    city: UB,
    name: { mn: 'Emart Уранган', ru: 'Emart Уранган', en: 'Emart Urangan' },
    location: { mn: '1 давхар', ru: '1 этаж', en: '1st floor' },
    phone: null,
    hours: null,
    image: null,
    mapQuery: 'Emart Urangan Ulaanbaatar',
    isNew: true,
    published: true,
  },
  {
    id: 'bayangol',
    city: UB,
    name: { mn: 'Баянгол E-mart', ru: 'E-mart Баянгол', en: 'E-mart Bayangol' },
    location: { mn: '3 давхар', ru: '3 этаж', en: '3rd floor' },
    phone: null,
    hours: null,
    image: null,
    mapQuery: 'E-mart Bayangol Ulaanbaatar',
    isNew: false,
    published: true,
  },
  {
    id: 'ikh-delguur',
    city: UB,
    name: {
      mn: 'Улсын Их Дэлгүүр',
      ru: 'Государственный универмаг',
      en: 'State Department Store',
    },
    location: { mn: '1 давхар', ru: '1 этаж', en: '1st floor' },
    phone: null,
    hours: null,
    image: null,
    mapQuery: 'State Department Store Ulaanbaatar',
    isNew: false,
    published: true,
  },
  {
    id: 'darkhan',
    city: { mn: 'Дархан', ru: 'Дархан', en: 'Darkhan' },
    name: { mn: 'Аму молл', ru: 'Аму молл', en: 'Amu Mall' },
    location: { mn: '2 давхар', ru: '2 этаж', en: '2nd floor' },
    phone: null,
    hours: null,
    image: null,
    mapQuery: 'Amu Mall Darkhan',
    isNew: false,
    published: true,
  },
  {
    id: 'erdenet',
    city: { mn: 'Эрдэнэт', ru: 'Эрдэнэт', en: 'Erdenet' },
    name: { mn: 'Орхон молл', ru: 'Орхон молл', en: 'Orkhon Mall' },
    location: { mn: '2 давхар', ru: '2 этаж', en: '2nd floor' },
    phone: null,
    hours: null,
    image: null,
    mapQuery: 'Orkhon Mall Erdenet',
    isNew: false,
    published: true,
  },
]

// Хотоор бүлэглэсэн, тухайн хэлний өгөгдөл
export function getBranchGroups(lang) {
  const pick = (v) => (v ? v[lang] ?? v.mn : null)
  const visible = branches.filter((b) => b.published)
  return CITY_ORDER.map((cityKey) => {
    const items = visible.filter((b) => b.city.en === cityKey)
    if (!items.length) return null
    return {
      city: pick(items[0].city),
      items: items.map((b) => ({
        id: b.id,
        name: pick(b.name),
        location: pick(b.location),
        phone: b.phone,
        hours: pick(b.hours),
        image: b.image,
        isNew: b.isNew,
        mapHref:
          'https://www.google.com/maps/search/?api=1&query=' +
          encodeURIComponent(b.mapQuery),
      })),
    }
  }).filter(Boolean)
}
