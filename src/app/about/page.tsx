import type { Metadata } from 'next'
import { styled } from 'styled-system/jsx'
import { gradient } from 'styled-system/recipes'
import { Avatar, IconLink } from '@/components/ui'
import { createMetadata } from '@/utils/metadata'

export const metadata: Metadata = createMetadata({
  title: 'About',
  description: 'Reluの自己紹介',
  path: '/about',
})

const sns = {
  github: { href: 'https://github.com/rerelurelu' },
  zenn: { href: 'https://zenn.dev/astrologian' },
} as const

const intro = {
  para1: 'ふろんとえんどめいん',
} as const

export default function AboutPage() {
  return (
    <styled.div display='grid' placeItems='center' px='2xl'>
      <Avatar src={'/images/avatar.webp'} alt={`Relu's avatar`} />
      <styled.span
        className={gradient({ type: 'dark' })}
        fontSize='2.25rem'
        lineHeight='2.5rem'
        mt='2.5rem'
        backgroundClip='text'
        color='transparent'
        fontWeight='600'
      >
        Relu
      </styled.span>
      <styled.ul
        mt='2xl'
        display='flex'
        flexWrap='wrap'
        gap='xl'
        listStyle='none'
        css={{
          '& a': {
            transition: 'all 0.3s ease',
            _hover: {
              transform: 'scale(1.1) translateY(-2px)',
              filter: 'drop-shadow(0 4px 8px {colors.overlay.brand.30})',
            },
          },
        }}
      >
        <li>
          <IconLink
            href={sns.github.href}
            areaLabel={'Link to GitHub'}
            src={'/images/github-icon.webp'}
            width={24}
            height={24}
            alt={'GitHub icon'}
          />
        </li>
        <li>
          <IconLink
            href={sns.zenn.href}
            areaLabel={'Link to Zenn'}
            src={'/images/zenn-icon.webp'}
            width={24}
            height={24}
            alt={'Zenn icon'}
          />
        </li>
      </styled.ul>
      <styled.div
        mt='4xl'
        display='grid'
        w='100%'
        maxW='56rem'
        placeItems='center'
        lineHeight='1.5rem'
      >
        <p>{intro.para1}</p>
      </styled.div>
    </styled.div>
  )
}
