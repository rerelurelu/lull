'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type FC, ViewTransition } from 'react'
import { css, cva, cx } from 'styled-system/css'
import type { Entry } from '@/types/entry'
import { getPathname } from '@/utils/getPathname'

type Props = {
  entries: Entry[]
}

export const NavItems: FC<Props> = ({ entries }) => {
  const pathname = getPathname(usePathname())

  return (
    <ul
      className={css({
        w: 'max-content',
        display: 'inline-flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        listStyle: 'none',
        m: '0',
        p: '0',
      })}
    >
      {entries.map(({ href, content }) => {
        return (
          <li key={content}>
            <Link
              className={css({
                bg: { _hover: 'transparent', _focus: 'transparent' },
                gap: '0.75rem',
                color: { base: '#2d1b69' },
                alignItems: 'center',
                userSelect: 'none',
              })}
              href={href}
              id={content}
            >
              <ViewTransition>
                <span
                  className={cx(
                    gradationRecipe(content === pathname ? { visual: 'active' } : undefined),
                  )}
                >
                  {content}
                </span>
              </ViewTransition>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

const gradationRecipe = cva({
  base: {
    fontSize: 'xl',
    p: '0.5rem 0.7rem',
    textTransform: 'capitalize',
    fontSmoothing: 'antialiased',
    transition: 'all 0.2s ease',
    _hover: {
      fontWeight: '500',
      color: '#8b5cf6',
    },
  },
  variants: {
    visual: {
      active: {
        color: '#a78bfa',
        fontWeight: '600',
        _hover: {
          color: '#a78bfa',
          fontWeight: '600',
        },
      },
    },
  },
})
