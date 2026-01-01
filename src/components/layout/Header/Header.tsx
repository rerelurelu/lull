'use client'

import Link from 'next/link'
import { styled } from 'styled-system/jsx'
import { gradient } from 'styled-system/recipes'
import { ENTRIES } from '@/constants'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { Logo } from './Logo'
import { NavItems } from './NavItems'

export const Header = () => {
  const scrollDirection = useScrollDirection()

  return (
    <styled.header
      w='fit-content'
      display='flex'
      alignItems='center'
      justifyContent='center'
      placeSelf='center'
      pt={{ base: 'md', md: 'xl' }}
      mb={{ base: 'xl', md: '3xl' }}
      transform={scrollDirection === 'down' ? 'translateY(-100%)' : 'translateY(0)'}
      transition='transform 0.3s ease-in-out'
      position='sticky'
      top='0'
      zIndex='50'
    >
      <styled.div
        className={gradient({ type: 'header' })}
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        gap='40px'
        w='max-content'
        px={{ base: 'xl', md: '2xl' }}
        py='md'
        backdropFilter='blur(8px)'
        borderRadius='lg'
        border='1px solid {colors.overlay.brand.20}'
        boxShadow='0 8px 32px {colors.overlay.brand.10}, 0 2px 8px {colors.overlay.white.50} inset'
      >
        <Link href={'/'}>
          <Logo />
        </Link>
        <NavItems entries={ENTRIES} />
      </styled.div>
    </styled.header>
  )
}
