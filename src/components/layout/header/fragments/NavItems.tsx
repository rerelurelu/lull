'use client'

import { usePathname } from 'next/navigation'
import { Link } from 'next-view-transitions'
import type { FC } from 'react'
import { css, cva, cx } from 'styled-system/css'
import type { Entry } from '@/types/entry'
import { getPathname } from '@/utils/getPathname'

type Props = {
  entries: Entry[]
}

export const NavItems: FC<Props> = ({ entries }) => {
  const pathname = getPathname(usePathname())

  return (
    <>
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
                  color: { base: 'white' },
                  alignItems: 'center',
                  userSelect: 'none',
                })}
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
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

const gradationRecipe = cva({
  base: {
    fontSize: 'xl',
    p: '0.5rem 0.7rem',
    textTransform: 'capitalize',
    fontSmoothing: 'antialiased',
    bg: { _hover: 'header.active' },
    backgroundClip: { _hover: 'text' },
    WebkitTextFillColor: { _hover: 'transparent' },
  },
  variants: {
    visual: {
      active: {
        bg: 'header.active',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
    },
  },
})
