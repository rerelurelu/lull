import type { Metadata } from 'next'
import { css } from 'styled-system/css'
import { grid } from 'styled-system/patterns'
import { Hero, PostArea } from '@/components/features'
import { TextLink } from '@/components/ui'
import { fetchPosts } from '@/services/post'
import { createMetadata } from '@/utils/metadata'

export const metadata: Metadata = createMetadata({
  title: 'Home',
  path: '/',
})

export default async function Home() {
  const { posts } = await fetchPosts({ limit: 3 })

  return (
    <div
      className={grid({
        h: 'full',
        gridTemplateRows: 'auto 1fr',
        justifyItems: 'center',
        gap: { base: '4rem', md: '6rem' },
      })}
    >
      <Hero className={css({ py: { base: '4rem', md: '6rem' } })} />
      <div
        className={grid({
          gridTemplateRows: 'auto auto 1fr',
          justifyItems: 'center',
          gap: { base: '2.5rem', md: '3.75rem' },
        })}
      >
        <h2
          className={css({
            pos: 'relative',
            fontSize: { base: '1.25rem', md: '1.875rem' },
            fontWeight: '600',
            lineHeight: { base: '1.75rem', md: '2.25rem' },
            textAlign: 'center',
            background: 'linear-gradient(135deg, #2C3269 0%, #3F4C9C 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            _after: {
              content: '""',
              display: 'block',
              w: '60px',
              h: '3px',
              background: 'linear-gradient(90deg, #3F4C9C, #5B6FD8)',
              m: '1rem auto 0',
              borderRadius: '999px',
            },
          })}
        >
          Recent Posts
        </h2>
        <PostArea posts={posts} />
        <TextLink text='See all posts →' href={'/posts/1'} />
      </div>
    </div>
  )
}
