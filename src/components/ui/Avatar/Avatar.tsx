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
        width={144}
        height={144}
        alt={alt}
        className={css({
          w: '9rem',
          h: '9rem',
          borderRadius: 'full',
          overflow: 'hidden',
          border: '1px solid {colors.border.subtle}',
        })}
      />
    </styled.div>
  )
}
