import { PostContainer } from '@/components/PostContainer/PostContainer'
import { fetchPost, fetchPosts } from '@/services/post'
import type { Metadata } from 'next'
import { css, cx } from 'styled-system/css'
import { divider } from 'styled-system/patterns'
import { text as textRecipe } from 'styled-system/recipes'

export const experimental_ppr = true

type Props = {
  params: Promise<{ postId: string }>
}

export async function generateStaticParams() {
  const data = await fetchPosts()

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

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
    },
  }
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
    <div
      className={css({
        w: '100%',
        maxW: { base: '18rem', lg: '48rem' },
        display: 'flex',
        flexDir: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      })}
    >
      <header
        className={css({
          display: 'grid',
          justifyItems: 'center',
          gap: '3rem',
        })}
      >
        <h1
          className={css({
            fontSize: '2.25rem',
            lineHeight: '2.5rem',
            fontWeight: '600',
            textWrap: 'pretty',
            textAlign: 'center',
          })}
        >
          {post.title}
        </h1>
        <div
          className={cx(
            css({
              display: 'grid',
              justifyItems: 'center',
              gap: '0.25rem',
              fontSmoothing: 'antialiased',
            }),
            textRecipe({ size: 'sm' }),
          )}
        >
          <p
            className={css({
              fontWeight: '600',
            })}
          >
            Published
          </p>
          <time dateTime={post.publishedAt}>{dateDisplay}</time>
        </div>
      </header>
      <div
        className={divider({
          mb: '0',
          mt: '5rem',
          orientation: 'horizontal',
          thickness: '0.125rem',
          color: 'divider',
        })}
      />
      <div
        className={css({
          mt: '5rem',
          w: '100%',
          fontSize: '1.125rem',
          lineHeight: '1.75rem',
          letterSpacing: '0.025rem',
        })}
      >
        <PostContainer postContent={post.content} />
      </div>
    </div>
  )
}
