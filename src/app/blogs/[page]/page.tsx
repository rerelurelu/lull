import { BlogArea } from '@/components/BlogArea/BlogArea'
import { Heading } from '@/components/Heading/Heading'
import { Pagination } from '@/components/Pagination/Pagination'
import { PER_PAGE } from '@/constants'
import { fetchPosts } from '@/services/post'
import { css } from 'styled-system/css'
import { grid } from 'styled-system/patterns'

export const experimental_ppr = true

export async function generateStaticParams() {
  const { totalCount } = await fetchPosts()
  const maxPageIndex = Math.ceil(totalCount / PER_PAGE)
  const paths = [...Array(maxPageIndex).keys()].map((i) => (i + 1).toString())

  return paths.map((path) => ({
    page: path,
  }))
}

export default async function BlogsPage({ params }: { params: { page: string } }) {
  const { page } = await params
  const { posts, totalCount } = await fetchPosts()
  const currentIndex = Number(page)

  return (
    <div className={grid({ placeItems: 'center' })}>
      <Heading title='Blog' />
      <BlogArea posts={posts} style={css({ mt: '5rem' })} />
      <Pagination totalCount={totalCount} currentIndex={currentIndex} />
    </div>
  )
}
