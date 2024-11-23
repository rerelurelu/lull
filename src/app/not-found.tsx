import type { Metadata } from 'next'
import { css } from 'styled-system/css'

export const metadata: Metadata = {
  title: '404 Page Not Found',
}

export default function Page() {
  return (
    <div
      className={css({
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
      })}
    >
      <p className={css({ fontSize: { base: '5rem', md: '9xl' }, fontWeight: 'bold' })}>404</p>
      <p className={css({ fontSize: { base: '3xl', md: '5xl' } })}>Page Not Found</p>
    </div>
  )
}
