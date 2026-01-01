import Image from 'next/image'
import { styled } from 'styled-system/jsx'

export const Logo = () => {
  return (
    <styled.div display='flex' alignItems='center' gap='md' textDecoration='none' px='md' py='md'>
      <Image src='/images/Logo.svg' alt='Logo' width={32} height={32} priority />
    </styled.div>
  )
}
