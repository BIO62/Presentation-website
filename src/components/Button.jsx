import Link from 'next/link'
import clsx from 'clsx'

export function Button({ invert, href, className, children, ...props }) {
  className = clsx(
    className,
    'inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition',
    invert
      ? 'bg-brand-yellow text-neutral-950 hover:bg-white'
      : 'bg-brand-blue text-white hover:bg-brand-blue-light'
  )

  let inner = <span className="relative top-px">{children}</span>

  if (href) {
    return (
      <Link href={href} className={className} {...props}>
        {inner}
      </Link>
    )
  }

  return (
    <button className={className} {...props}>
      {inner}
    </button>
  )
}
