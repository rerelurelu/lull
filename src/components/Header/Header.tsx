import { ENTRIES } from '@/constants'
import { css } from 'styled-system/css'
import { NavItems } from './fragments/NavItems'

export const Header = () => {
  return (
    <header
      className={css({
        w: '100%',
        alignItems: 'center',
        h: '4rem',
        top: '0',
        left: '0',
        right: '0',
        px: { base: '0', md: '3rem' },
        zIndex: '50',
        display: 'flex',
        justifyContent: { base: 'center', md: 'end' },
        bg: 'header.bg',
        pos: 'sticky',
        backdropFilter: 'blur(8px)',
      })}
    >
      <NavItems entries={ENTRIES} />
    </header>
  )
}
