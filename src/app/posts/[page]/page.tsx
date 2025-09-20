import type { Metadata } from 'next'
import { css } from 'styled-system/css'
import { grid } from 'styled-system/patterns'
import { Pagination, PostArea } from '@/components/features'
import { Heading } from '@/components/ui'
import { PER_PAGE } from '@/constants'
import { fetchPosts } from '@/services/post'

export const dynamicParams = false

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
  const { totalCount } = await fetchPosts({ limit: 1000 })
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
  const { posts, totalCount } = await fetchPosts({
    limit: PER_PAGE,
    offset: (Number(page) - 1) * PER_PAGE,
  })

  return (
    <div className={grid({ placeItems: 'center', w: '100%' })}>
      <Heading title='Post' />
      <PostArea posts={posts} className={css({ mt: '5rem' })} />
      <Pagination
        baseUrl='posts'
        count={totalCount}
        pageSize={PER_PAGE}
        siblingCount={1}
        defaultPage={Number(page)}
        className={css({ mt: '5rem' })}
      />
    </div>
  )
}
