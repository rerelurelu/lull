import { IconLink } from '@/components/Link/IconLink'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import type { Metadata } from 'next'
import { css } from 'styled-system/css'
import { grid } from 'styled-system/patterns'

const TITLE = 'About'
const DESCRIPTION = 'Reluの自己紹介'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
  },
}

const sns = {
  github: { href: 'https://github.com/rerelurelu' },
  zenn: { href: 'https://zenn.dev/astrologian' },
} as const

const intro = {
  para1: 'ふろんとえんどえんじにあ',
} as const

export default function AboutPage() {
  return (
    <div className={grid({ placeItems: 'center', px: '1.5rem' })}>
      <Avatar className='w-[192px] h-[192px] border-3 border-purple-300'>
        <AvatarImage src='/images/avatar.webp' alt='Avatar image' />
      </Avatar>
      <span className='text-4xl mt-8'>Relu</span>
      <ul className='flex flex-wrap gap-4 list-none mt-6'>
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
      </ul>
      <div className='mt-12 grid w-full max-w-[56rem] place-items-center leading-6'>
        <p>{intro.para1}</p>
      </div>
    </div>
  )
}
