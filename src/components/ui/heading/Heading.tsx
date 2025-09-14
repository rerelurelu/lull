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
          textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
          animation: 'neonGlow 3s ease-in-out infinite',
          _hover: {
            textShadow: '0 0 15px currentColor, 0 0 30px currentColor, 0 0 45px currentColor',
          },
        }),
        style,
      )}
    >
      {title}
    </h1>
  )
}
