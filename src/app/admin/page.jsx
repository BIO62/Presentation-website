'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

const TYPES = {
  dealer: { label: 'Дилер / салон', className: 'bg-blue-50 text-brand-blue ring-brand-blue/20' },
  wholesale: { label: 'Бөөний захиалга', className: 'bg-amber-50 text-amber-800 ring-amber-600/20' },
  academy: { label: 'Сургалт', className: 'bg-violet-50 text-violet-700 ring-violet-600/20' },
  hr: { label: 'Хүний нөөц', className: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' },
  other: { label: 'Бусад', className: 'bg-neutral-100 text-neutral-700 ring-neutral-500/20' },
}

const STATUSES = {
  new: { label: 'Шинэ', dot: 'bg-brand-yellow' },
  read: { label: 'Уншсан', dot: 'bg-brand-blue-light' },
  done: { label: 'Шийдвэрлэсэн', dot: 'bg-emerald-500' },
}

const FILTERS = [
  { id: 'all', label: 'Бүгд' },
  { id: 'new', label: 'Шинэ' },
  { id: 'read', label: 'Уншсан' },
  { id: 'done', label: 'Шийдвэрлэсэн' },
  { id: 'starred', label: 'Одтой' },
]

const LANG_LABELS = { mn: 'MN', ru: 'RU', en: 'EN' }

function pad(n) {
  return String(n).padStart(2, '0')
}

function formatDate(ts) {
  const d = new Date(ts)
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function timeAgo(ts) {
  const minutes = Math.floor((Date.now() - ts) / 60000)
  if (minutes < 1) return 'Дөнгөж сая'
  if (minutes < 60) return `${minutes} мин өмнө`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} цагийн өмнө`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days} өдрийн өмнө`
  return formatDate(ts).slice(0, 10)
}

function initials(name) {
  return (name || '?')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function downloadCsv(rows) {
  const header = ['Огноо', 'Төлөв', 'Төрөл', 'Нэр', 'Утас', 'Имэйл', 'Байгууллага', 'Мессеж', 'Хэл']
  const escape = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const lines = rows.map((s) =>
    [
      formatDate(s.createdAt),
      STATUSES[s.status]?.label,
      TYPES[s.inquiry]?.label,
      s.name,
      s.phone,
      s.email,
      s.company,
      s.message,
      LANG_LABELS[s.lang],
    ]
      .map(escape)
      .join(',')
  )
  // BOM — Excel кирилл үсгийг зөв уншина
  const blob = new Blob(['﻿' + [header.map(escape).join(','), ...lines].join('\r\n')], {
    type: 'text/csv;charset=utf-8',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `husegt-${formatDate(Date.now()).slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

// --- Icons ---
function Icon({ d, className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {d}
    </svg>
  )
}
const icons = {
  star: <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z" />,
  trash: <path d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  mail: <path d="M4 6h16v12H4zM4 7l8 6 8-6" />,
  building: <path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 9h4a1 1 0 0 1 1 1v11M8 8h3M8 12h3M8 16h3M3 21h18" />,
  search: <path d="m21 21-4.3-4.3M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" />,
  refresh: <path d="M20 11a8 8 0 0 0-14.9-3.5M4 4v4h4M4 13a8 8 0 0 0 14.9 3.5M20 20v-4h-4" />,
  download: <path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" />,
  logout: <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l5-5-5-5M15 12H3" />,
  back: <path d="M15 18 9 12l6-6" />,
  inbox: <path d="M3 13h5l1.5 3h5L16 13h5M5 5h14l2 8v6H3v-6l2-8Z" />,
}

function StatCard({ label, value, accent, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'rounded-2xl bg-white p-5 text-left ring-1 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-neutral-950/5',
        active ? 'ring-2 ring-brand-blue' : 'ring-neutral-950/5'
      )}
    >
      <div className="flex items-center gap-x-2 text-sm font-medium text-neutral-600">
        {accent && <span className={clsx('h-2 w-2 rounded-full', accent)} />}
        {label}
      </div>
      <p className="mt-3 font-condensed text-4xl font-semibold text-neutral-950">{value}</p>
    </button>
  )
}

function TypeBadge({ type }) {
  const t = TYPES[type] ?? TYPES.other
  return (
    <span className={clsx('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset', t.className)}>
      {t.label}
    </span>
  )
}

function ListItem({ item, selected, onSelect, onToggleStar }) {
  const isNew = item.status === 'new'
  return (
    <li>
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelect(item.id)}
        onKeyDown={(e) => e.key === 'Enter' && onSelect(item.id)}
        className={clsx(
          'group relative flex cursor-pointer gap-x-4 px-5 py-4 transition',
          selected ? 'bg-brand-blue/[0.06]' : 'hover:bg-neutral-50'
        )}
      >
        {selected && <span className="absolute inset-y-0 left-0 w-1 bg-brand-blue" />}
        <div className="relative flex-none">
          <div className={clsx('flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold', isNew ? 'bg-brand-blue text-white' : 'bg-neutral-100 text-neutral-600')}>
            {initials(item.name)}
          </div>
          {isNew && <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-brand-yellow ring-2 ring-white" />}
        </div>
        <div className="min-w-0 flex-auto">
          <div className="flex items-center justify-between gap-x-3">
            <p className={clsx('truncate text-sm', isNew ? 'font-semibold text-neutral-950' : 'font-medium text-neutral-800')}>
              {item.name}
            </p>
            <p className="flex-none text-xs text-neutral-500">{timeAgo(item.createdAt)}</p>
          </div>
          <div className="mt-1.5 flex items-center gap-x-2">
            <TypeBadge type={item.inquiry} />
            {item.status === 'done' && (
              <span className="text-xs font-semibold text-emerald-600">✓ Шийдвэрлэсэн</span>
            )}
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
            {item.message || <span className="italic text-neutral-400">Мессежгүй</span>}
          </p>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onToggleStar(item)
          }}
          aria-label={item.starred ? 'Одноос хасах' : 'Одтой болгох'}
          className={clsx('-m-1 flex-none self-start rounded-lg p-1 transition', item.starred ? 'text-brand-yellow' : 'text-neutral-300 opacity-0 hover:text-brand-yellow group-hover:opacity-100')}
        >
          <Icon d={icons.star} className={clsx('h-5 w-5', item.starred && 'fill-brand-yellow')} />
        </button>
      </div>
    </li>
  )
}

function InfoRow({ icon, label, value, href }) {
  if (!value) return null
  const content = (
    <>
      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-neutral-100 text-neutral-600">
        <Icon d={icon} />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-medium text-neutral-500">{label}</span>
        <span className="block truncate text-sm font-semibold text-neutral-950">{value}</span>
      </span>
    </>
  )
  return href ? (
    <a href={href} className="flex items-center gap-x-3 rounded-2xl p-2 transition hover:bg-neutral-50">
      {content}
    </a>
  ) : (
    <div className="flex items-center gap-x-3 p-2">{content}</div>
  )
}

function Detail({ item, onUpdate, onDelete, onBack }) {
  const [confirming, setConfirming] = useState(false)

  useEffect(() => setConfirming(false), [item?.id])

  if (!item) {
    return (
      <div className="hidden h-full flex-col items-center justify-center text-center lg:flex">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-neutral-400 ring-1 ring-neutral-950/5">
          <Icon d={icons.inbox} className="h-7 w-7" />
        </span>
        <p className="mt-4 font-semibold text-neutral-800">Хүсэлт сонгоно уу</p>
        <p className="mt-1 text-sm text-neutral-500">Зүүн талын жагсаалтаас нэгийг дарж дэлгэрэнгүйг харна.</p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-x-3 border-b border-neutral-950/5 px-5 py-4 sm:px-8">
        <button type="button" onClick={onBack} className="-ml-2 flex items-center gap-x-1 rounded-lg p-2 text-sm font-semibold text-neutral-600 hover:bg-neutral-100 lg:hidden">
          <Icon d={icons.back} /> Буцах
        </button>
        <div className="hidden text-sm text-neutral-500 lg:block">{formatDate(item.createdAt)}</div>
        <div className="flex items-center gap-x-1">
          <button
            type="button"
            onClick={() => onUpdate(item.id, { starred: !item.starred })}
            className={clsx('rounded-xl p-2.5 transition hover:bg-neutral-100', item.starred ? 'text-brand-yellow' : 'text-neutral-500')}
            aria-label="Од"
            title={item.starred ? 'Одноос хасах' : 'Одтой болгох'}
          >
            <Icon d={icons.star} className={clsx('h-5 w-5', item.starred && 'fill-brand-yellow')} />
          </button>
          {confirming ? (
            <div className="flex items-center gap-x-2 rounded-xl bg-red-50 py-1 pl-3 pr-1 ring-1 ring-red-200">
              <span className="text-sm font-medium text-red-700">Устгах уу?</span>
              <button type="button" onClick={() => onDelete(item.id)} className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700">
                Тийм
              </button>
              <button type="button" onClick={() => setConfirming(false)} className="rounded-lg px-2 py-1.5 text-xs font-semibold text-neutral-600 hover:bg-white">
                Үгүй
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => setConfirming(true)} className="rounded-xl p-2.5 text-neutral-500 transition hover:bg-red-50 hover:text-red-600" aria-label="Устгах" title="Устгах">
              <Icon d={icons.trash} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-auto overflow-y-auto px-5 py-8 sm:px-8">
        <div className="flex items-start gap-x-4">
          <div className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-blue-light text-lg font-semibold text-white">
            {initials(item.name)}
          </div>
          <div className="min-w-0">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-neutral-950">{item.name}</h2>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <TypeBadge type={item.inquiry} />
              <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-semibold text-neutral-600">
                {LANG_LABELS[item.lang] ?? 'MN'}
              </span>
              <span className="text-xs text-neutral-500 lg:hidden">{formatDate(item.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Төлөв солих */}
        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Төлөв</p>
          <div className="mt-3 inline-flex rounded-xl bg-neutral-100 p-1">
            {Object.entries(STATUSES).map(([id, s]) => (
              <button
                key={id}
                type="button"
                onClick={() => onUpdate(item.id, { status: id })}
                className={clsx(
                  'flex items-center gap-x-2 rounded-lg px-3 py-2 text-sm font-semibold transition sm:px-4',
                  item.status === id ? 'bg-white text-neutral-950 shadow-sm' : 'text-neutral-500 hover:text-neutral-950'
                )}
              >
                <span className={clsx('h-2 w-2 rounded-full', s.dot)} />
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-2 rounded-3xl bg-white p-3 ring-1 ring-neutral-950/5 sm:grid-cols-2">
          <InfoRow icon={icons.phone} label="Утас" value={item.phone} href={item.phone && `tel:${item.phone.replace(/\s/g, '')}`} />
          <InfoRow icon={icons.mail} label="Имэйл" value={item.email} href={item.email && `mailto:${item.email}`} />
          <InfoRow icon={icons.building} label="Байгууллага / салон" value={item.company} />
        </div>

        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Мессеж</p>
          <div className="mt-3 whitespace-pre-wrap rounded-3xl bg-white p-6 text-base leading-7 text-neutral-800 ring-1 ring-neutral-950/5">
            {item.message || <span className="italic text-neutral-400">Мессеж бичээгүй байна.</span>}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {item.phone && (
            <a href={`tel:${item.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-x-2 rounded-xl bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-blue-light">
              <Icon d={icons.phone} className="h-4 w-4" /> Залгах
            </a>
          )}
          {item.email && (
            <a href={`mailto:${item.email}`} className="inline-flex items-center gap-x-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950 ring-1 ring-neutral-950/10 hover:bg-neutral-50">
              <Icon d={icons.mail} className="h-4 w-4" /> Имэйл бичих
            </a>
          )}
          {item.status !== 'done' && (
            <button type="button" onClick={() => onUpdate(item.id, { status: 'done' })} className="inline-flex items-center gap-x-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
              ✓ Шийдвэрлэсэн болгох
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const [type, setType] = useState('all')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/submissions', { cache: 'no-store' })
      if (res.status === 401) {
        window.location.href = '/admin/login'
        return
      }
      if (res.status === 503) {
        setError('Өгөгдлийн сан холбогдоогүй байна. Vercel дээр Upstash Redis холбоно уу.')
        setItems([])
      } else if (!res.ok) {
        setError('Хүсэлтүүдийг ачаалж чадсангүй.')
      } else {
        setItems((await res.json()).submissions)
      }
    } catch {
      setError('Сүлжээний алдаа гарлаа.')
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  async function update(id, patch) {
    setItems((list) => list.map((s) => (s.id === id ? { ...s, ...patch } : s)))
    const res = await fetch(`/api/admin/submissions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    })
    if (res.status === 401) window.location.href = '/admin/login'
  }

  async function remove(id) {
    setItems((list) => list.filter((s) => s.id !== id))
    setSelectedId(null)
    const res = await fetch(`/api/admin/submissions/${id}`, { method: 'DELETE' })
    if (res.status === 401) window.location.href = '/admin/login'
  }

  function select(id) {
    setSelectedId(id)
    const item = items.find((s) => s.id === id)
    // Нээхэд автоматаар "Уншсан" болно
    if (item?.status === 'new') update(id, { status: 'read' })
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    window.location.href = '/admin/login'
  }

  const counts = useMemo(
    () => ({
      all: items.length,
      new: items.filter((s) => s.status === 'new').length,
      read: items.filter((s) => s.status === 'read').length,
      done: items.filter((s) => s.status === 'done').length,
      starred: items.filter((s) => s.starred).length,
    }),
    [items]
  )

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((s) => {
      if (filter === 'starred' ? !s.starred : filter !== 'all' && s.status !== filter) return false
      if (type !== 'all' && s.inquiry !== type) return false
      if (!q) return true
      return [s.name, s.email, s.phone, s.company, s.message].some((v) => v?.toLowerCase().includes(q))
    })
  }, [items, filter, type, query])

  const selected = items.find((s) => s.id === selectedId) ?? null

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-neutral-950/5 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-x-4 px-4 sm:px-6">
          <div className="flex items-center gap-x-4">
            <Image src="/logo-color.png" alt="Tengeriin Ilgeemj" width={882} height={255} className="h-8 w-auto" priority />
            <span className="hidden h-6 w-px bg-neutral-200 sm:block" />
            <span className="hidden font-condensed text-lg font-semibold uppercase tracking-wide text-neutral-950 sm:block">
              Хүсэлтийн самбар
            </span>
          </div>
          <div className="flex items-center gap-x-1 sm:gap-x-2">
            <button type="button" onClick={load} className="rounded-xl p-2.5 text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950" title="Шинэчлэх" aria-label="Шинэчлэх">
              <Icon d={icons.refresh} className={clsx('h-5 w-5', loading && 'animate-spin')} />
            </button>
            <button
              type="button"
              onClick={() => downloadCsv(visible)}
              disabled={!visible.length}
              className="inline-flex items-center gap-x-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950 disabled:opacity-40"
            >
              <Icon d={icons.download} /> <span className="hidden sm:inline">Excel татах</span>
            </button>
            <button type="button" onClick={logout} className="inline-flex items-center gap-x-2 rounded-xl bg-neutral-950 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-blue-light">
              <Icon d={icons.logout} className="h-4 w-4" /> <span className="hidden sm:inline">Гарах</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[1600px] flex-auto flex-col px-4 py-6 sm:px-6 sm:py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <StatCard label="Нийт хүсэлт" value={counts.all} active={filter === 'all'} onClick={() => setFilter('all')} />
          <StatCard label="Шинэ" value={counts.new} accent="bg-brand-yellow" active={filter === 'new'} onClick={() => setFilter('new')} />
          <StatCard label="Уншсан" value={counts.read} accent="bg-brand-blue-light" active={filter === 'read'} onClick={() => setFilter('read')} />
          <StatCard label="Шийдвэрлэсэн" value={counts.done} accent="bg-emerald-500" active={filter === 'done'} onClick={() => setFilter('done')} />
        </div>

        {error && (
          <p role="alert" className="mt-6 rounded-2xl bg-amber-50 px-5 py-4 text-sm font-medium text-amber-900 ring-1 ring-amber-200">
            {error}
          </p>
        )}

        {/* Toolbar */}
        <div className="mt-6 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="-mx-4 flex gap-x-1 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={clsx(
                  'flex flex-none items-center gap-x-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition',
                  filter === f.id ? 'bg-neutral-950 text-white' : 'text-neutral-600 hover:bg-white hover:text-neutral-950'
                )}
              >
                {f.label}
                <span className={clsx('rounded-full px-1.5 text-xs', filter === f.id ? 'bg-white/20' : 'bg-neutral-200/70')}>
                  {counts[f.id]}
                </span>
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-xl border-0 bg-white py-2.5 pl-3 pr-9 text-sm font-medium text-neutral-800 ring-1 ring-neutral-950/10 focus:ring-2 focus:ring-brand-blue"
            >
              <option value="all">Бүх төрөл</option>
              {Object.entries(TYPES).map(([id, t]) => (
                <option key={id} value={id}>
                  {t.label}
                </option>
              ))}
            </select>
            <label className="relative flex-auto xl:w-80 xl:flex-none">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-400">
                <Icon d={icons.search} className="h-4 w-4" />
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Нэр, утас, имэйлээр хайх..."
                className="w-full rounded-xl border-0 bg-white py-2.5 pl-9 pr-3 text-sm ring-1 ring-neutral-950/10 placeholder:text-neutral-400 focus:ring-2 focus:ring-brand-blue"
              />
            </label>
          </div>
        </div>

        {/* List + detail */}
        <div className="mt-4 grid flex-auto overflow-hidden rounded-3xl bg-white ring-1 ring-neutral-950/5 lg:h-[calc(100vh-19rem)] lg:min-h-[32rem] lg:grid-cols-[minmax(0,26rem)_1fr]">
          <div className="min-h-0 overflow-y-auto border-neutral-950/5 lg:border-r">
            {loading && !items.length ? (
              <ul className="divide-y divide-neutral-950/5">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i} className="flex gap-x-4 px-5 py-4">
                    <div className="h-10 w-10 animate-pulse rounded-full bg-neutral-100" />
                    <div className="flex-auto space-y-2">
                      <div className="h-3 w-1/2 animate-pulse rounded bg-neutral-100" />
                      <div className="h-3 w-3/4 animate-pulse rounded bg-neutral-100" />
                    </div>
                  </li>
                ))}
              </ul>
            ) : visible.length ? (
              <ul className="divide-y divide-neutral-950/5">
                {visible.map((item) => (
                  <ListItem
                    key={item.id}
                    item={item}
                    selected={item.id === selectedId}
                    onSelect={select}
                    onToggleStar={(s) => update(s.id, { starred: !s.starred })}
                  />
                ))}
              </ul>
            ) : (
              <div className="flex h-full min-h-[16rem] flex-col items-center justify-center px-6 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-50 text-neutral-400">
                  <Icon d={icons.inbox} className="h-6 w-6" />
                </span>
                <p className="mt-4 font-semibold text-neutral-800">Хүсэлт алга</p>
                <p className="mt-1 text-sm text-neutral-500">
                  {items.length ? 'Шүүлтүүрт тохирох хүсэлт олдсонгүй.' : 'Сайтаар ирсэн хүсэлтүүд энд харагдана.'}
                </p>
              </div>
            )}
          </div>
          <div className={clsx('min-h-0', selected ? 'fixed inset-0 z-40 overflow-hidden bg-neutral-50 lg:static lg:z-auto lg:bg-neutral-50/60' : 'hidden bg-neutral-50/60 lg:block')}>
            <Detail item={selected} onUpdate={update} onDelete={remove} onBack={() => setSelectedId(null)} />
          </div>
        </div>
      </main>
    </div>
  )
}
