import type { ReactNode } from 'react'
import { styled } from 'styled-system/jsx'

type Props = {
  children: ReactNode
}

export const OgpWrapper = ({ children }: Props) => {
  return (
    <styled.div
      w='100%'
      h='100%'
      display='flex'
      alignItems='center'
      justifyContent='center'
      background='linear-gradient(to right, {colors.brand.primary} 0%, {colors.brand.dark} 100%)'
      p='2xl'
      fontSize='72px'
    >
      <styled.div
        w='100%'
        h='100%'
        color='base'
        bg='bg.base'
        display='flex'
        justifyContent='space-between'
        flexDirection='column'
        borderRadius='lg'
        p='40px'
      >
        {children}
        <styled.div w='100%' display='flex'>
          <styled.div
            w='100%'
            display='flex'
            justifyContent='flex-start'
            alignItems='center'
            fontSize='56px'
            gap='20px'
          >
            <styled.div
              display='flex'
              borderRadius='full'
              overflow='hidden'
              boxShadow='0 0 0 3px {colors.brand.light}'
              alignItems='center'
              ml='md'
              w='56px'
              h='56px'
            >
              <img
                src='https://avatars.githubusercontent.com/u/43092452?v=4'
                alt="Relu's Icon"
                width={56}
                height={56}
                style={{ borderRadius: '9999px' }}
              />
            </styled.div>
            <styled.span pb='5px'>Relu</styled.span>
          </styled.div>
        </styled.div>
      </styled.div>
    </styled.div>
  )
}
