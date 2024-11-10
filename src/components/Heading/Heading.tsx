import type { FC } from 'react'
import { css, cx } from 'styled-system/css'

type Props = {
  title: string
  style?: string
}

export const Heading: FC<Props> = ({ title, style }) => {
  return (
    <h1
      className={cx(
        css({
          color: 'head',
          textAlign: 'center',
          fontSize: '2.25rem',
          lineHeight: '2.5rem',
          fontWeight: '400',
          letterSpacing: '0.1em',
        }),
        style,
      )}
    >
      {title}
    </h1>
  )
}
