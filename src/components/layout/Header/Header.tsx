'use client'

import Link from 'next/link'
import { css, cx } from 'styled-system/css'
import { gradient } from 'styled-system/recipes'
import { ENTRIES } from '@/constants'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { Logo } from './Logo'
import { NavItems } from './NavItems'

export const Header = () => {
  const scrollDirection = useScrollDirection()

  return (
    <header
      className={css({
        w: 'fit-content',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        placeSelf: 'center',
        pt: { base: '0.5rem', md: '1rem' },
        mb: { base: '1rem', md: '2rem' },
        transform: scrollDirection === 'down' ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.3s ease-in-out',
        position: 'sticky',
        top: '0',
        zIndex: '50',
      })}
    >
      <div
        className={cx(
          gradient({ type: 'header' }),
          css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '40px',
            w: 'max-content',
            px: { base: '1rem', md: '1.5rem' },
            py: '0.5rem',
            backdropFilter: 'blur(8px)',
            borderRadius: '1rem',
            border: '1px solid {colors.overlay.brand.20}',
            boxShadow:
              '0 8px 32px {colors.overlay.brand.10}, 0 2px 8px {colors.overlay.white.50} inset',
          }),
        )}
      >
        <Link href={'/'}>
          <Logo />
        </Link>
        <NavItems entries={ENTRIES} />
      </div>
    </header>
  )
}
