'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cva, cx } from 'styled-system/css'
import { styled } from 'styled-system/jsx'
import type { Entry } from '@/types/entry'
import { getPathname } from '@/utils/getPathname'

type Props = {
  entries: Entry[]
}

const StyledLink = styled(Link)

export const NavItems = ({ entries }: Props) => {
  const pathname = getPathname(usePathname())

  return (
    <styled.ul
      w='max-content'
      display='inline-flex'
      flexDirection='row'
      flexWrap='wrap'
      listStyle='none'
      m='0'
      p='0'
    >
      {entries.map(({ href, content }) => {
        return (
          <li key={content}>
            <StyledLink
              bg={{ _hover: 'transparent', _focus: 'transparent' }}
              gap='0.75rem'
              color={{ base: 'brand.dark' }}
              alignItems='center'
              userSelect='none'
              href={href}
              id={content}
            >
              <span
                className={cx(
                  gradationRecipe(content === pathname ? { visual: 'active' } : undefined),
                )}
              >
                {content}
              </span>
            </StyledLink>
          </li>
        )
      })}
    </styled.ul>
  )
}

const gradationRecipe = cva({
  base: {
    fontSize: 'xl',
    px: 'lg',
    py: 'md',
    textTransform: 'capitalize',
    fontSmoothing: 'antialiased',
    transition: 'all 0.2s ease',
    _hover: {
      fontWeight: '500',
      color: 'brand.primary',
    },
  },
  variants: {
    visual: {
      active: {
        color: 'brand.light',
        fontWeight: '600',
        _hover: {
          color: 'brand.light',
          fontWeight: '600',
        },
      },
    },
  },
})
