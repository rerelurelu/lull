import Link from 'next/link'
import type { FC } from 'react'
import { css, cx } from 'styled-system/css'
import { text as textRecipe } from 'styled-system/recipes'
import { UrlObject } from 'url'

type Props = {
  text: string
  href: UrlObject
  style?: string
}

export const TextLink: FC<Props> = ({ text, href, style }) => {
  return (
    <Link
      className={cx(
        css({
          display: 'inline-block',
          textDecoration: 'underline',
        }),
        textRecipe({ size: 'sm' }),
        style,
      )}
      href={href}
    >
      {text}
    </Link>
  )
}
