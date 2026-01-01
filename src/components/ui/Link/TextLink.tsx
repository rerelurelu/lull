import Link from 'next/link'
import { css, cx } from 'styled-system/css'

type Props = {
  text: string
  href: string
  style?: string
}

export const TextLink = ({ text, href, style }: Props) => {
  return (
    <Link
      className={cx(
        css({
          display: 'inline-block',
          textDecoration: 'underline',
          textStyle: 'body.sm',
        }),
        style,
      )}
      href={href}
    >
      {text}
    </Link>
  )
}
