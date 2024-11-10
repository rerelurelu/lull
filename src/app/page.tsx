import { BlogArea } from '@/components/BlogArea/BlogArea'
import { Hero } from '@/components/Hero/Hero'
import { fetchPosts } from '@/services/post'
import { css } from 'styled-system/css'
import { grid } from 'styled-system/patterns'

export const experimental_ppr = true

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
      <BlogArea posts={posts} />
    </div>
  )
}
