import type { FC } from 'react'
import Image from 'next/image'
import { css } from 'styled-system/css'

export const Logo: FC = () => {
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        textDecoration: 'none',
        px: '0.5rem',
        py: '0.5rem',
      })}
    >
      <Image
        src='/images/Logo.svg'
        alt='Logo'
        width={32}
        height={32}
        priority
      />
    </div>
  )
}
