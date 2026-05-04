import type { Metadata } from 'next'
import { styled } from 'styled-system/jsx'
import { IntroBlock, PostList } from '@/components/home'
import { fetchPosts } from '@/services/post'
import { createMetadata } from '@/utils/metadata'

export const metadata: Metadata = createMetadata({
  title: 'Home',
  path: '/',
})

export default async function Home() {
  const { posts } = await fetchPosts({ limit: 1000 })

  return (
    <styled.div
      w='full'
      maxW='720px'
      mx='auto'
      display='flex'
      flexDir='column'
      gap={{ base: '4xl', md: '5rem' }}
    >
      <IntroBlock />
      <PostList posts={posts} />
    </styled.div>
  )
}
