const dictionaries = {
  mn: () => import('./mn.json').then((m) => m.default),
  ru: () => import('./ru.json').then((m) => m.default),
  en: () => import('./en.json').then((m) => m.default),
}

export const locales = ['mn', 'ru', 'en']
export const defaultLocale = 'mn'

export async function getDictionary(lang) {
  const loader = dictionaries[lang] ?? dictionaries[defaultLocale]
  return loader()
}
