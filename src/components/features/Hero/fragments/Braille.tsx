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
  },
  variants: {
    visual: {
      on: {
        bg: 'linear-gradient(135deg, #a855f7, #ec4899)',
        boxShadow: '0 0 20px rgba(168, 85, 247, 0.6), 0 0 40px rgba(236, 72, 153, 0.4)',
        animation: 'pulse 2s ease-in-out infinite alternate',
      },
      off: {
        border: '2px solid rgba(168, 85, 247, 0.4)',
        bg: 'rgba(168, 85, 247, 0.1)',
      },
    },
  },
})
