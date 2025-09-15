'use client'

import { Link } from 'next-view-transitions'
import { css } from 'styled-system/css'
import { ENTRIES } from '@/constants'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { Logo } from './fragments/Logo'
import { NavItems } from './fragments/NavItems'

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
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '40px',
          w: 'max-content',
          px: { base: '1rem', md: '1.5rem' },
          py: '0.5rem',
          bg: 'rgba(250, 248, 255, 0.9)',
          backdropFilter: 'blur(8px)',
          borderRadius: '1rem',
          border: '1px solid rgba(124, 58, 237, 0.2)',
          boxShadow: '0 8px 32px rgba(124, 58, 237, 0.1), 0 2px 8px rgba(255, 255, 255, 0.5) inset',
          background:
            'linear-gradient(135deg, rgba(250, 248, 255, 0.95) 0%, rgba(241, 240, 255, 0.9) 100%)',
        })}
      >
        <Link href={'/'}>
          <Logo />
        </Link>
        <NavItems entries={ENTRIES} />
      </div>
    </header>
  )
}
