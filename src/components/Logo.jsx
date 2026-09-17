import Image from 'next/image'
import clsx from 'clsx'

export function Logomark({
  invert = false,
  variant = 'black', // 'black' | 'color' | 'white'
  filled,
  className,
  ...props
}) {
  let src = variant === 'color' ? '/logomark-color.png' : '/logomark.png'
  let isWhite = invert || variant === 'white'

  return (
    <div
      className={clsx(
        'relative flex items-center justify-center',
        className
      )}
      {...props}
    >
      <Image
        src={src}
        alt="Тэнгэрийн Илгээмж"
        width={64}
        height={64}
        className={clsx(
          'h-12 w-12 sm:h-14 sm:w-14 object-contain transition-all',
          isWhite && 'brightness-0 invert'
        )}
        priority
      />
    </div>
  )
}

export function Logo({
  className,
  invert = false,
  variant = 'black', // 'black' | 'color' | 'white'
  filled = false,
  fillOnHover = false,
  ...props
}) {
  let src = variant === 'color' ? '/logo-color.png' : '/logo.png'
  let isWhite = invert || variant === 'white'

  return (
    <div
      className={clsx('relative inline-flex items-center', className)}
      {...props}
    >
      <Image
        src={src}
        alt="Tengeriin Ilgeemj"
        width={340}
        height={85}
        className={clsx(
          'h-14 lg:h-16 w-auto object-contain transition-all',
          isWhite && 'brightness-0 invert'
        )}
        priority
      />
    </div>
  )
}
