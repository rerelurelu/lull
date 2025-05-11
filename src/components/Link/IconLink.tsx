import { cn } from '@/libs/shadcn/utils'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'
import { css, cx } from 'styled-system/css'

type Props = {
  href: string
  areaLabel: string
  src: string
  width: number
  height: number
  alt: string
  target?: string
  linkStyle?: string
  iconStyle?: string
}

export const IconLink: FC<Props> = ({
  href,
  areaLabel,
  src,
  width,
  height,
  alt,
  target = '_blank',
  linkStyle,
  iconStyle,
}) => {
  return (
    <Link
      className={cn('underline hover:opacity-70', linkStyle)}
      href={href}
      target={target}
      rel={target === '_blank' ? 'noreferrer' : undefined}
      aria-label={areaLabel}
    >
      <Image
        src={src}
        className={cn('object-fill', iconStyle)}
        width={width}
        height={height}
        alt={alt}
        loading='lazy'
        decoding='async'
      />
    </Link>
  )
}
