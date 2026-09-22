import { styled } from 'styled-system/jsx'

export const Footer = () => {
  return (
    <styled.footer
      bg='transparent'
      py='3xl'
      fontSize='0.75rem'
      letterSpacing='0.08em'
      color='muted'
      textAlign='center'
      mt='auto'
    >
      <p>© {new Date().getFullYear()} Relu</p>
    </styled.footer>
  )
}
