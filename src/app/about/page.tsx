import type { Metadata } from 'next'
import { css, cx } from 'styled-system/css'
import { grid } from 'styled-system/patterns'
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
    <div className={grid({ placeItems: 'center', px: '1.5rem' })}>
      <Avatar src={'/images/avatar.webp'} alt={`Relu's avatar`} />
      <span
        className={cx(
          gradient({ type: 'dark' }),
          css({
            fontSize: '2.25rem',
            lineHeight: '2.5rem',
            mt: '2.5rem',
            backgroundClip: 'text',
            color: 'transparent',
            fontWeight: '600',
          }),
        )}
      >
        Relu
      </span>
      <ul
        className={css({
          mt: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          listStyle: 'none',
          '& a': {
            transition: 'all 0.3s ease',
            _hover: {
              transform: 'scale(1.1) translateY(-2px)',
              filter: 'drop-shadow(0 4px 8px {colors.overlay.brand.30})',
            },
          },
        })}
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
      </ul>
      <div
        className={css({
          mt: '3rem',
          display: 'grid',
          w: '100%',
          maxW: '56rem',
          placeItems: 'center',
          lineHeight: '1.5rem',
        })}
      >
        <p>{intro.para1}</p>
      </div>
    </div>
  )
}
