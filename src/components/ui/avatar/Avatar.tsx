import Image from 'next/image'
import type { FC } from 'react'
import { css } from 'styled-system/css'

type Props = {
  src: string
  alt: string
}

export const Avatar: FC<Props> = ({ src, alt }) => {
  return (
    <div
      className={css({
        pos: 'relative',
        display: 'inline-flex',
      })}
    >
      <Image
        src={src}
        width={192}
        height={192}
        alt={alt}
        className={css({
          w: '12rem',
          h: '12rem',
          borderRadius: 'full',
          overflow: 'hidden',
          boxShadow: '0 0 0 3px token(colors.avatar.ring)',
        })}
      />
    </div>
  )
}
