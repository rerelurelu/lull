import { css } from 'styled-system/css'

export const Footer = () => {
  return (
    <footer
      className={css({
        borderTop: '1px solid token(colors.border.section)',
        py: '3rem',
        letterSpacing: 'widest',
        textAlign: 'center',
      })}
    >
      <p>© 2024 Relu</p>
    </footer>
  )
}
