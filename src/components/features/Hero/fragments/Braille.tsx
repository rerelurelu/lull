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
        w: { base: '56px', md: '76px' },
        h: 'fit-content',
        gap: { base: '8px', md: '12px' },
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
    borderRadius: 'full',
    h: { base: '20px', md: '28px' },
    w: { base: '20px', md: '28px' },
  },
  variants: {
    visual: {
      on: {
        bg: '#7c3aed',
      },
      off: {
        border: '2px solid #7c3aed',
      },
    },
  },
})
