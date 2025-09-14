import Image from 'next/image'
import type { FC } from 'react'
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
        className={css({
          filter: 'drop-shadow(0 0 5px #00ffff) drop-shadow(0 0 10px #ff00ff)',
          _hover: {
            filter: 'drop-shadow(0 0 8px #00ffff) drop-shadow(0 0 15px #ff00ff)',
          },
          transition: 'all 0.3s ease-in-out',
        })}
      />
    </div>
  )
}
