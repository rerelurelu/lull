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
          bg: 'rgba(248, 232, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          borderRadius: '1rem',
          border: '1px solid rgba(200, 162, 255, 0.4)',
          boxShadow: '0 8px 32px rgba(200, 162, 255, 0.2), 0 0 20px rgba(255, 179, 230, 0.15)',
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
