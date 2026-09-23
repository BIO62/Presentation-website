'use client'

import { useId, useState } from 'react'

import { Button } from '@/components/Button'
import { FadeIn } from '@/components/FadeIn'

function TextInput({ label, ...props }) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        type="text"
        id={id}
        {...props}
        placeholder=" "
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
      >
        {label}
      </label>
    </div>
  )
}

function TextArea({ label, ...props }) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <textarea
        id={id}
        rows={4}
        {...props}
        placeholder=" "
        className="peer block w-full resize-y border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-6 top-8 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
      >
        {label}
      </label>
    </div>
  )
}

function RadioInput({ label, ...props }) {
  return (
    <label className="flex gap-x-3">
      <input
        type="radio"
        {...props}
        className="h-6 w-6 flex-none appearance-none rounded-full border border-neutral-950/20 outline-none checked:border-[0.5rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
      />
      <span className="text-base/6 text-neutral-950">{label}</span>
    </label>
  )
}

export function ContactForm({ dict, lang }) {
  const f = dict.contact.form
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState('')

  async function onSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))

    if (!data.name?.trim() || (!data.email?.trim() && !data.phone?.trim())) {
      setStatus('error')
      setErrorMessage(f.errorRequired)
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, lang }),
      })
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({}))
        setStatus('error')
        setErrorMessage(
          error === 'required' ? f.errorRequired : error === 'email' ? f.errorEmail : f.errorServer
        )
        return
      }
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMessage(f.errorServer)
    }
  }

  if (status === 'success') {
    return (
      <FadeIn className="lg:order-last">
        <div className="rounded-3xl bg-neutral-50 p-10 ring-1 ring-neutral-950/5">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-yellow">
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-neutral-950 stroke-2" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="mt-6 font-display text-2xl font-semibold text-neutral-950">
            {f.successTitle}
          </h2>
          <p className="mt-3 text-base text-neutral-600">{f.successText}</p>
          <Button className="mt-8" onClick={() => setStatus('idle')}>
            {f.again}
          </Button>
        </div>
      </FadeIn>
    )
  }

  return (
    <FadeIn className="lg:order-last">
      <form onSubmit={onSubmit} noValidate>
        <h2 className="font-display text-base font-semibold text-neutral-950">
          {dict.contact.formTitle}
        </h2>
        {/* Honeypot — хүн харахгүй, бот бөглөнө */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />
        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <TextInput label={f.name} name="name" autoComplete="name" required />
          <TextInput label={f.email} type="email" name="email" autoComplete="email" />
          <TextInput label={f.company} name="company" autoComplete="organization" />
          <TextInput label={f.phone} type="tel" name="phone" autoComplete="tel" />
          <TextArea label={f.message} name="message" />
          <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
            <fieldset>
              <legend className="text-base/6 text-neutral-500">{f.inquiryType}</legend>
              <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <RadioInput label={f.dealer} name="inquiry" value="dealer" defaultChecked />
                <RadioInput label={f.wholesale} name="inquiry" value="wholesale" />
                <RadioInput label={f.academy} name="inquiry" value="academy" />
                <RadioInput label={f.hr} name="inquiry" value="hr" />
                <RadioInput label={f.other} name="inquiry" value="other" />
              </div>
            </fieldset>
          </div>
        </div>

        {status === 'error' && (
          <p role="alert" className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
            {errorMessage}
          </p>
        )}

        <Button type="submit" className="mt-10" disabled={status === 'sending'}>
          {status === 'sending' ? f.sending : f.submit}
        </Button>
      </form>
    </FadeIn>
  )
}
