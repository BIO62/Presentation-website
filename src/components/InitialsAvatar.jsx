import Image from 'next/image'
import clsx from 'clsx'

// "Н. Өлзийхутаг" → "НӨ", "Oleg Tulin" → "OT"
export function initials(name) {
  return name
    .split(/\s+/)
    .map((part) => part.replace(/[^\p{L}]/gu, '').charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

// Дугуй avatar: `image` ({ src: ... }) өгөгдвөл зураг, үгүй бол нэрийн эхний үсэг.
export function InitialsAvatar({
  name,
  image,
  className = 'h-16 w-16',
  textClassName = 'text-xl',
}) {
  return (
    <div
      className={clsx(
        'relative flex flex-none items-center justify-center overflow-hidden rounded-full bg-brand-blue',
        className
      )}
    >
      {image ? (
        <Image
          alt=""
          {...image}
          fill
          sizes="96px"
          className="object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className={clsx(
            'font-display font-semibold tracking-wide text-white',
            textClassName
          )}
        >
          {initials(name)}
        </span>
      )}
    </div>
  )
}
