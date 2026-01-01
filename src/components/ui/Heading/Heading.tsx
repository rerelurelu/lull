import { styled } from 'styled-system/jsx'

type Props = {
  title: string
  style?: string
}

export const Heading = ({ title, style }: Props) => {
  return (
    <styled.h1
      color='head'
      textAlign='center'
      fontSize='2.25rem'
      lineHeight='2.5rem'
      fontWeight='400'
      letterSpacing='0.1em'
      className={style}
    >
      {title}
    </styled.h1>
  )
}
