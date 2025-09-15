import { css } from 'styled-system/css'

export const Footer = () => {
  return (
    <footer
      className={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTop: '1px solid token(colors.border.section)',
        py: '2rem',
        letterSpacing: 'widest',
        textAlign: 'center',
        mt: 'auto',
      })}
    >
      <p>© 2024 Relu</p>
    </footer>
  )
}
