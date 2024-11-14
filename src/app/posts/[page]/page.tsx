import { Heading } from '@/components/Heading/Heading'
import { Pagination } from '@/components/Pagination/Pagination'
import { PostArea } from '@/components/PostArea/PostArea'
import { PER_PAGE } from '@/constants'
import { fetchPosts } from '@/services/post'
import type { Metadata } from 'next'
import { css } from 'styled-system/css'
import { grid } from 'styled-system/patterns'

export const experimental_ppr = true

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

export async function generateStaticParams() {
  const { totalCount } = await fetchPosts()
  const maxPageIndex = Math.ceil(totalCount / PER_PAGE)
  const paths = [...Array(maxPageIndex).keys()].map((i) => (i + 1).toString())

  return paths.map((path) => ({
    page: path,
  }))
}

type Props = {
  params: Promise<{ page: string }>
}

export default async function PostsPage({ params }: Props) {
  const page = (await params).page
  const { posts, totalCount } = await fetchPosts()
  const currentIndex = Number(page)

  return (
    <div className={grid({ placeItems: 'center' })}>
      <Heading title='Post' />
      <PostArea posts={posts} style={css({ mt: '5rem' })} />
      <Pagination totalCount={totalCount} currentIndex={currentIndex} />
    </div>
  )
}
