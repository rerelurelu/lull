'use client'

import { ENTRIES } from '@/constants'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { Link } from 'next-view-transitions'
import { css } from 'styled-system/css'
import { Logo } from './fragments/Logo'
import { NavItems } from './fragments/NavItems'

export const Header = () => {
  const scrollDirection = useScrollDirection()

  return (
    <header
      className={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: { base: '0.5rem', md: '1rem' },
        py: { base: '1rem', md: '2rem' },
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
          bg: 'rgba(26, 30, 46, 0.8)',
          backdropFilter: 'blur(8px)',
          borderRadius: '1rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(255, 255, 255, 0.05) inset',
          background: 'linear-gradient(135deg, rgba(26, 30, 46, 0.9) 0%, rgba(26, 30, 46, 0.7) 100%)',
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
