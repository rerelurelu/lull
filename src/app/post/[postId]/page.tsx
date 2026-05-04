import type { Metadata } from 'next'
import Link from 'next/link'
import { ViewTransition } from 'react'
import { css } from 'styled-system/css'
import { styled } from 'styled-system/jsx'
import { reveal } from 'styled-system/recipes'
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

const formatPublishedDate = (iso: string) => {
  const d = new Date(iso)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}.${mm}.${dd}`
}

export default async function PostPage({ params }: Props) {
  const postId = (await params).postId
  const post = await fetchPost(postId)
  const dateText = formatPublishedDate(post.publishedAt)

  return (
    <styled.div
      maxW='48rem'
      display='flex'
      flexDir='column'
      alignItems='center'
      justifyContent='center'
      pb='4rem'
    >
      <styled.header display='grid' justifyItems='center' gap='xl' mb='2xl'>
        <ViewTransition name={`post-${postId}`} share='morph' default='none'>
          <styled.h1
            fontSize={{ base: '1.875rem', md: '2.25rem' }}
            lineHeight='1.3'
            fontWeight='500'
            textWrap='pretty'
            textAlign='center'
            color='head'
            letterSpacing='0.005em'
          >
            {post.title}
          </styled.h1>
        </ViewTransition>

        <styled.div display='flex' flexDir='column' alignItems='center' gap='sm' color='muted'>
          <styled.span
            fontSize='0.625rem'
            letterSpacing='0.24em'
            textTransform='uppercase'
            opacity={0.75}
          >
            Published
          </styled.span>
          <styled.time dateTime={post.publishedAt} fontSize='0.875rem' letterSpacing='0.06em'>
            {dateText}
          </styled.time>
        </styled.div>
      </styled.header>
      <styled.div
        className={reveal({ delay: '60' })}
        data-reveal
        mt='4xl'
        w='100%'
        fontSize='1rem'
        lineHeight='1.85'
        letterSpacing='0.01em'
      >
        <PostContainerWithLinkCards postContent={post.content} />
      </styled.div>
      <styled.nav
        className={reveal({ delay: '120' })}
        data-reveal
        mt='4xl'
        w='100%'
        display='flex'
        justifyContent='center'
      >
        <Link
          href='/'
          className={css({
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'sm',
            fontSize: '0.875rem',
            letterSpacing: '0.05em',
            color: 'muted',
            textDecoration: 'none',
            transition: 'color 0.25s ease, transform 0.25s ease',
            _hover: {
              color: 'head',
              transform: 'translateX(-2px)',
            },
          })}
        >
          <span aria-hidden='true'>←</span>
          <span>All posts</span>
        </Link>
      </styled.nav>
    </styled.div>
  )
}
