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
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transformStyle: 'preserve-3d',
  },
  variants: {
    visual: {
      on: {
        background: 'linear-gradient(135deg, #3F4C9C 0%, #5B6FD8 100%)',
        boxShadow:
          'inset 0 0 12px rgba(123, 142, 255, 0.6), 0 0 24px rgba(63, 76, 156, 0.4), 0 0 48px rgba(91, 111, 216, 0.2)',
        filter: 'brightness(1.1)',
        transform: 'translateZ(4px)',
        _hover: {
          transform: 'translateZ(4px) scale(1.05)',
          boxShadow:
            'inset 0 0 16px rgba(123, 142, 255, 0.7), 0 0 32px rgba(63, 76, 156, 0.5), 0 0 56px rgba(91, 111, 216, 0.3)',
        },
      },
      off: {
        border: '2px solid rgba(63, 76, 156, 0.3)',
        bg: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(8px)',
        transform: 'translateZ(0px)',
      },
    },
  },
})
