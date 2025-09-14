import type { FC } from 'react'
import { cva } from 'styled-system/css'
import { flex } from 'styled-system/patterns'

export type Props = {
  tl: boolean
  tr: boolean
  ml: boolean
  mr: boolean
  bl: boolean
  br: boolean
}

export const Braille: FC<Props> = ({ tl, tr, ml, mr, bl, br }) => {
  return (
    <div
      className={flex({
        flexWrap: 'wrap',
        w: '3.5rem',
        h: 'fit-content',
        rowGap: 2,
        columnGap: 2,
      })}
    >
      <div className={braille({ visual: tl ? 'on' : 'off' })} />
      <div className={braille({ visual: tr ? 'on' : 'off' })} />
      <div className={braille({ visual: ml ? 'on' : 'off' })} />
      <div className={braille({ visual: mr ? 'on' : 'off' })} />
      <div className={braille({ visual: bl ? 'on' : 'off' })} />
      <div className={braille({ visual: br ? 'on' : 'off' })} />
    </div>
  )
}

const braille = cva({
  base: {
    h: '1rem',
    w: '1rem',
    borderRadius: 'full',
    transition: 'all 0.3s ease',
    animation: 'float 4s ease-in-out infinite',
  },
  variants: {
    visual: {
      on: {
        bg: '#00ffff',
        boxShadow: '0 0 12px rgba(0, 255, 255, 0.6)',
        _hover: {
          bg: '#ff00ff',
          transform: 'scale(1.15)',
          boxShadow: '0 0 20px rgba(255, 0, 255, 0.8)',
        },
      },
      off: {
        border: '2px solid #00ffff',
        boxShadow: '0 0 6px rgba(0, 255, 255, 0.3)',
        _hover: {
          borderColor: '#ff00ff',
          bg: 'rgba(0, 255, 255, 0.1)',
          transform: 'scale(1.1)',
          boxShadow: '0 0 12px rgba(255, 0, 255, 0.5)',
        },
      },
    },
  },
})
