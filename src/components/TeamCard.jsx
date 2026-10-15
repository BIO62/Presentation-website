import Image from 'next/image'

import { initials } from '@/components/InitialsAvatar'

// Том хөрөг карт (анхны загвар): h-96, hover үед зураг томорно, доод талд нэр, албан тушаал.
// `person.image` ({ src: ... }) өгөгдвөл бодит зураг, үгүй бол ижил хэмжээтэй картанд
// нэрийн эхний үсгийг харуулна. Зураг ирэхэд зөвхөн getTeam() дотор `image` нэмэхэд хангалттай.
export function TeamCard({ person }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-neutral-100">
      {person.image ? (
        <Image
          alt=""
          {...person.image}
          sizes="(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw"
          className="h-96 w-full object-cover transition duration-500 motion-safe:group-hover:scale-105"
        />
      ) : (
        <div className="relative flex h-96 w-full items-center justify-center bg-gradient-to-br from-brand-blue to-brand-blue-light transition duration-500 motion-safe:group-hover:scale-105">
          <Image
            src="/logomark-white.png"
            alt=""
            width={512}
            height={512}
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 w-64 opacity-[0.07]"
          />
          <span
            aria-hidden="true"
            className="-mt-16 font-display text-7xl font-semibold tracking-wide text-white/90"
          >
            {initials(person.name)}
          </span>
        </div>
      )}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-black/0 to-50% p-6">
        <p className="font-display text-base/6 font-semibold tracking-wide text-white">
          {person.name}
        </p>
        <p className="mt-2 text-sm text-white/90">{person.role}</p>
      </div>
    </div>
  )
}
