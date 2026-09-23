const LOCALES = { mn: 'mn-MN', ru: 'ru-RU', en: 'en-US' }

export function formatDate(dateString, lang = 'en') {
  let parts = dateString.split('-')
  let hasDay = parts.length > 2

  return new Date(`${dateString}Z`).toLocaleDateString(LOCALES[lang] ?? 'en-US', {
    day: hasDay ? 'numeric' : undefined,
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
