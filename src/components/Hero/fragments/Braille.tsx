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
  },
  variants: {
    visual: {
      on: {
        bg: '#fde047',
      },
      off: {
        border: '2px solid #fde047',
      },
    },
  },
})
