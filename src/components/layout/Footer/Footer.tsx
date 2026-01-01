import { styled } from 'styled-system/jsx'
import { gradient } from 'styled-system/recipes'

export const Footer = () => {
  return (
    <styled.footer
      className={gradient({ type: 'footer' })}
      display='flex'
      alignItems='center'
      justifyContent='center'
      borderTop='1px solid token(colors.border.section)'
      py='3xl'
      letterSpacing='widest'
      textAlign='center'
      mt='auto'
    >
      <p>© 2024 Relu</p>
    </styled.footer>
  )
}
