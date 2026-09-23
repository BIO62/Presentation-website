'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function AdminLogin() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function onSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)
    const data = Object.fromEntries(new FormData(event.currentTarget))
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        window.location.href = '/admin'
        return
      }
      setError('Нэвтрэх нэр эсвэл нууц үг буруу байна.')
    } catch {
      setError('Сүлжээний алдаа гарлаа. Дахин оролдоно уу.')
    }
    setLoading(false)
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Брэндийн тал */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-neutral-950 via-brand-blue to-brand-blue-light lg:flex lg:flex-col lg:justify-between lg:p-14">
        <Image
          src="/logomark-color.png"
          alt=""
          width={2033}
          height={2288}
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -right-40 w-[560px] opacity-[0.15]"
        />
        <Image
          src="/logo-color.png"
          alt="Tengeriin Ilgeemj"
          width={882}
          height={255}
          className="relative h-12 w-auto self-start brightness-0 invert"
          priority
        />
        <div className="relative">
          <p className="font-condensed text-sm font-semibold uppercase tracking-widest text-brand-yellow">
            Дотоод систем
          </p>
          <h1 className="mt-4 font-condensed text-6xl font-semibold uppercase leading-[0.95] text-white">
            Хүсэлтийн
            <br />
            самбар
          </h1>
          <p className="mt-6 max-w-sm text-base text-white/70">
            Сайтаар ирсэн хамтын ажиллагаа, захиалга, сургалт болон ажлын байрны
            хүсэлтүүдийг нэг дороос харж, шийдвэрлэнэ.
          </p>
        </div>
        <p className="relative text-sm text-white/50">© {new Date().getFullYear()} Тэнгэрийн Илгээмж ХХК</p>
      </div>

      {/* Нэвтрэх форм */}
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <Image
            src="/logo-color.png"
            alt="Tengeriin Ilgeemj"
            width={882}
            height={255}
            className="h-10 w-auto lg:hidden"
            priority
          />
          <h2 className="mt-10 font-display text-3xl font-semibold tracking-tight lg:mt-0">
            Нэвтрэх
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Админ эрхээрээ нэвтэрч хүсэлтүүдийг харна уу.
          </p>

          <form onSubmit={onSubmit} className="mt-10 space-y-5">
            <div>
              <label htmlFor="username" className="text-sm font-semibold text-neutral-800">
                Нэвтрэх нэр
              </label>
              <input
                id="username"
                name="username"
                autoComplete="username"
                required
                className="mt-2 block w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base outline-none transition focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-semibold text-neutral-800">
                Нууц үг
              </label>
              <div className="relative mt-2">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 pr-20 text-base outline-none transition focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-3 my-auto h-8 rounded-lg px-2 text-xs font-semibold text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950"
                >
                  {showPassword ? 'Нуух' : 'Харах'}
                </button>
              </div>
            </div>

            {error && (
              <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-xl bg-brand-blue px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-blue-light disabled:opacity-60"
            >
              {loading ? 'Шалгаж байна...' : 'Нэвтрэх'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
