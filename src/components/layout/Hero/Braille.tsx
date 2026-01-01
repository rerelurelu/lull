import { cva, cx } from 'styled-system/css'
import { flex } from 'styled-system/patterns'
import { gradient } from 'styled-system/recipes'

export type Props = {
  tl: boolean
  tr: boolean
  ml: boolean
  mr: boolean
  bl: boolean
  br: boolean
}

export const Braille = ({ tl, tr, ml, mr, bl, br }: Props) => {
  return (
    <div
      className={flex({
        flexWrap: 'wrap',
        w: { base: '56px', md: '76px' },
        h: 'fit-content',
        gap: { base: 'md', md: 'lg' },
      })}
    >
      <div
        className={cx(tl && gradient({ type: 'primary' }), braille({ visual: tl ? 'on' : 'off' }))}
      />
      <div
        className={cx(tr && gradient({ type: 'primary' }), braille({ visual: tr ? 'on' : 'off' }))}
      />
      <div
        className={cx(ml && gradient({ type: 'primary' }), braille({ visual: ml ? 'on' : 'off' }))}
      />
      <div
        className={cx(mr && gradient({ type: 'primary' }), braille({ visual: mr ? 'on' : 'off' }))}
      />
      <div
        className={cx(bl && gradient({ type: 'primary' }), braille({ visual: bl ? 'on' : 'off' }))}
      />
      <div
        className={cx(br && gradient({ type: 'primary' }), braille({ visual: br ? 'on' : 'off' }))}
      />
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
        boxShadow:
          'inset 0 0 12px {colors.overlay.braille.inner}, 0 0 24px {colors.overlay.braille.outer}, 0 0 48px {colors.overlay.braille.glow}',
        filter: 'brightness(1.1)',
        transform: 'translateZ(4px)',
        _hover: {
          transform: 'translateZ(4px) scale(1.05)',
          boxShadow:
            'inset 0 0 16px {colors.overlay.braille.innerHover}, 0 0 32px {colors.overlay.braille.outerHover}, 0 0 56px {colors.overlay.braille.glowHover}',
        },
      },
      off: {
        border: '2px solid {colors.overlay.braille.border}',
        bg: 'overlay.white.50',
        backdropFilter: 'blur(8px)',
        transform: 'translateZ(0px)',
      },
    },
  },
})
