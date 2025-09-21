import type { Metadata } from 'next'
import { css } from 'styled-system/css'
import { grid } from 'styled-system/patterns'
import { Hero, PostArea } from '@/components/features'
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
        gridTemplateRows: '1fr auto',
        gap: { base: '6rem', md: '8rem' },
      })}
    >
      <div
        className={css({ w: 'full', h: 'fit-content', display: 'flex', justifyContent: 'center' })}
      >
        <Hero />
      </div>
      <PostArea posts={posts} heading='Recent Posts' />
    </div>
  )
}
