import { css, cx } from 'styled-system/css'
import { gradient } from 'styled-system/recipes'

export const Footer = () => {
  return (
    <footer
      className={cx(
        gradient({ type: 'footer' }),
        css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTop: '1px solid token(colors.border.section)',
          py: '2rem',
          letterSpacing: 'widest',
          textAlign: 'center',
          mt: 'auto',
        }),
      )}
    >
      <p>© 2024 Relu</p>
    </footer>
  )
}
