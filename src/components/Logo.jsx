import Image from 'next/image'
import clsx from 'clsx'

export function Logomark({
  invert = false,
  variant = 'color', // 'black' | 'color' | 'white'
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
        width={2033}
        height={2288}
        className={clsx(
          'h-10 w-auto object-contain transition-all',
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
  variant = 'color', // 'black' | 'color' | 'white'
  filled = false,
  fillOnHover = false,
  lang = 'en',
  ...props
}) {
  // Монгол хэл дээр кирилл "ТЭНГЭРИЙН ИЛГЭЭМЖ" лого, бусад хэл дээр латин лого.
  let isMn = lang === 'mn'
  let src = isMn ? '/logo-color-mn.png' : variant === 'color' ? '/logo-color.png' : '/logo.png'
  let dimensions = isMn ? { width: 4195, height: 1170 } : { width: 882, height: 255 }
  let isWhite = invert || variant === 'white'

  return (
    <div
      className={clsx('relative inline-flex items-center', className)}
      {...props}
    >
      <Image
        src={src}
        alt="Тэнгэрийн Илгээмж"
        width={dimensions.width}
        height={dimensions.height}
        className={clsx(
          'h-9 lg:h-11 w-auto object-contain transition-all',
          isWhite && 'brightness-0 invert'
        )}
        priority
      />
    </div>
  )
}
