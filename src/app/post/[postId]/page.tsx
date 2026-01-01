import type { Metadata } from 'next'
import { ViewTransition } from 'react'
import { styled } from 'styled-system/jsx'
import { PostContainerWithLinkCards } from '@/components/post/PostContainer/PostContainerWithLinkCards'
import { fetchPost, fetchPosts } from '@/services/post'
import { createArticleMetadata } from '@/utils/metadata'

export const dynamicParams = false

type Props = {
  params: Promise<{ postId: string }>
}

export async function generateStaticParams() {
  const data = await fetchPosts({ limit: 1000 })

  const paths = data.posts.map((post) => {
    return post.id
  })

  return paths.map((path) => ({
    postId: path,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const postId = (await params).postId
  const post = await fetchPost(postId)
  const title = post.title
  const description = post.content
    .replace(/<[^>]*>/g, '')
    .slice(0, 80)
    .split('。')[0]

  return createArticleMetadata(title, description, `/post/${postId}`)
}

export default async function PostPage({ params }: Props) {
  const postId = (await params).postId
  const post = await fetchPost(postId)

  const dateDisplay = new Date(post.publishedAt).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <styled.div
      maxW='48rem'
      display='flex'
      flexDir='column'
      alignItems='center'
      justifyContent='center'
    >
      <ViewTransition name={`post-${postId}`}>
        <styled.header display='grid' justifyItems='center' gap='4xl'>
          <styled.h1
            fontSize='2.25rem'
            lineHeight='2.5rem'
            fontWeight='600'
            textWrap='pretty'
            textAlign='center'
          >
            {post.title}
          </styled.h1>
          <styled.div
            display='grid'
            justifyItems='center'
            gap='sm'
            fontSmoothing='antialiased'
            textStyle='body.sm'
          >
            <styled.p fontWeight='600'>Published</styled.p>
            <time dateTime={post.publishedAt}>{dateDisplay}</time>
          </styled.div>
        </styled.header>
      </ViewTransition>
      <styled.div
        mt='5rem'
        w='100%'
        fontSize='1.125rem'
        lineHeight='1.75rem'
        letterSpacing='0.025rem'
      >
        <PostContainerWithLinkCards postContent={post.content} />
      </styled.div>
    </styled.div>
  )
}
