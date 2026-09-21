import glob from 'fast-glob'
import { getDictionary } from '@/dictionaries/index'

const exportNames = {
  blog: 'article',
  work: 'caseStudy',
}

export async function loadMDXMetadata(directory, lang = 'mn') {
  let files = await glob('**/page.mdx', { cwd: `src/app/[lang]/${directory}` })
  let useLangDir = true

  if (files.length === 0) {
    files = await glob('**/page.mdx', { cwd: `src/app/${directory}` })
    useLangDir = false
  }

  const dict = await getDictionary(lang).catch(() => null)

  return (
    await Promise.all(
      files.map(async (filename) => {
        let id = filename.replace(/[/|\\]page\.mdx$/, '')
        let mod
        if (directory === 'blog') {
          mod = useLangDir
            ? await import(`../app/[lang]/blog/${filename}`)
            : await import(`../app/blog/${filename}`)
        } else {
          mod = useLangDir
            ? await import(`../app/[lang]/work/${filename}`)
            : await import(`../app/work/${filename}`)
        }

        const meta = mod[exportNames[directory]] ?? {}
        const dictEntry = directory === 'work' ? dict?.work?.[id] : dict?.blog?.[id]

        return {
          id,
          href: `/${lang}/${directory}/${id}`,
          ...meta,
          ...(dictEntry
            ? {
                title: dictEntry.title ?? meta.title,
                description: dictEntry.description ?? meta.description,
                tag: dictEntry.tag ?? meta.tag,
              }
            : {}),
        }
      })
    )
  ).sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
}

