import type { FC } from 'react'
import { css, cx } from 'styled-system/css'
import { PostCard } from '@/components/features'
import { TextLink } from '@/components/ui'
import type { Post } from '@/types/post'

type Pros = {
  posts: Post[]
  heading?: string
  className?: string
}

export const PostArea: FC<Pros> = ({ posts, heading, className }) => {
  return (
    <section
      className={cx(
        css({
          display: 'grid',
          justifyItems: 'center',
          w: '100%',
          mx: 'auto',
        }),
        className,
      )}
    >
      {heading && (
        <h2
          className={css({
            mb: { base: '1.5rem', md: '3rem' },
            fontSize: { base: '1.25rem', md: '1.875rem' },
            lineHeight: { base: '1.75rem', md: '2.25rem' },
            textAlign: 'left',
            color: 'head',
          })}
        >
          {heading}
        </h2>
      )}
      <div
        className={css({
          display: 'grid',
          w: '100%',
          maxW: '1024px',
          gap: '2rem',
          gridTemplateColumns: {
            sm: 'repeat(1, minmax(0, 1fr))',
            md: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(3, minmax(0, 1fr))',
          },
          mt: { base: heading ? '2rem' : '6rem', md: heading ? '3rem' : '8rem' },
        })}
      >
        {posts.map((post) => (
          <PostCard
            createdAt={post.publishedAt.slice(0, 10)}
            href={`/post/${post.id}`}
            key={post.id}
            postId={post.id}
            tags={post.tags.map((tag) => tag)}
            title={post.title}
          />
        ))}
      </div>
      {heading && (
        <TextLink
          text='See all posts →'
          href={'/posts/1'}
          style={css({
            mt: { base: '2rem', md: '3rem' },
            display: 'inline-block',
            textDecoration: 'underline',
          })}
        />
      )}
    </section>
  )
}
