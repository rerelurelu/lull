import type { Metadata } from 'next'
import { css } from 'styled-system/css'
import { styled } from 'styled-system/jsx'
import { PostArea } from '@/components/post'
import { Heading } from '@/components/ui'
import { fetchPosts } from '@/services/post'

const TITLE = 'Posts'
const DESCRIPTION = 'Reluの投稿記事一覧'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
  },
}

export default async function PostsPage() {
  const { posts } = await fetchPosts({ limit: 1000 })

  return (
    <styled.div display='grid' placeItems='center' w='100%'>
      <Heading title='Post' />
      <PostArea posts={posts} className={css({ mt: '5rem' })} />
    </styled.div>
  )
}
