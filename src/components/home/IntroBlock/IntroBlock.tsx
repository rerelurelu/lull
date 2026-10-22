import { css } from 'styled-system/css'
import { styled } from 'styled-system/jsx'
import { reveal } from 'styled-system/recipes'
import { Avatar, IconLink } from '@/components/ui'

const sns = {
  github: { href: 'https://github.com/rerelurelu' },
  zenn: { href: 'https://zenn.dev/astrologian' },
} as const

const description = 'ふろんとえんどめいん'

const iconHover = css({
  transition: 'opacity 0.2s ease, transform 0.2s ease',
  '@media (hover: hover)': {
    _hover: { opacity: 0.6, transform: 'translateY(-1px)' },
  },
})

export const IntroBlock = () => {
  return (
    <styled.section
      display='flex'
      flexDir={{ base: 'column', md: 'row' }}
      alignItems='center'
      justifyContent='center'
      gap={{ base: '2xl', md: '4xl' }}
      w='full'
    >
      <styled.div className={reveal({ delay: '0' })} data-reveal>
        <Avatar src='/images/avatar.webp' alt="Relu's avatar" />
      </styled.div>

      <styled.div
        display='flex'
        flexDir='column'
        alignItems={{ base: 'center', md: 'flex-start' }}
        gap='lg'
        textAlign={{ base: 'center', md: 'left' }}
      >
        <styled.h1
          className={reveal({ delay: '30' })}
          data-reveal
          fontSize={{ base: '2.25rem', md: '2.5rem' }}
          lineHeight='1'
          fontWeight='300'
          letterSpacing='0.02em'
          color='head'
        >
          Relu
        </styled.h1>

        <styled.p
          className={reveal({ delay: '60' })}
          data-reveal
          color='muted'
          fontSize='0.9375rem'
          letterSpacing='0.04em'
        >
          {description}
        </styled.p>

        <styled.ul
          className={reveal({ delay: '90' })}
          data-reveal
          display='flex'
          gap='xl'
          listStyle='none'
          mt='sm'
        >
          <li>
            <IconLink
              href={sns.github.href}
              areaLabel='Link to GitHub'
              src='/images/github-icon.webp'
              width={22}
              height={22}
              alt='GitHub icon'
              linkStyle={iconHover}
            />
          </li>
          <li>
            <IconLink
              href={sns.zenn.href}
              areaLabel='Link to Zenn'
              src='/images/zenn-icon.webp'
              width={22}
              height={22}
              alt='Zenn icon'
              linkStyle={iconHover}
            />
          </li>
        </styled.ul>
      </styled.div>
    </styled.section>
  )
}
