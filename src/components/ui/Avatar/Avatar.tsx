import Image from 'next/image'
import { css } from 'styled-system/css'
import { styled } from 'styled-system/jsx'

type Props = {
  src: string
  alt: string
}

export const Avatar = ({ src, alt }: Props) => {
  return (
    <styled.div pos='relative' display='inline-flex'>
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
    </styled.div>
  )
}
