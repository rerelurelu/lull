import { type FC, ViewTransition } from 'react'
import { css, cx } from 'styled-system/css'
import { PostCard } from '@/components/features'
import type { Post } from '@/types/post'

type Pros = {
  posts: Post[]
  className?: string
}

export const PostArea: FC<Pros> = ({ posts, className }) => {
  return (
    <section
      className={cx(
        css({
          pos: 'relative',
          display: 'grid',
          w: '100%',
          maxW: '1024px',
          gap: { base: '2rem', md: '2.5rem' },
          gridTemplateColumns: {
            sm: 'repeat(1, minmax(0, 1fr))',
            md: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(3, minmax(0, 1fr))',
          },
          _before: {
            content: '""',
            pos: 'absolute',
            top: '-4rem',
            left: '0',
            right: '0',
            h: '1px',
            background:
              'linear-gradient(90deg, transparent 0%, {colors.divider} 50%, transparent 100%)',
          },
        }),
        className,
      )}
    >
      {posts.map((post) => (
        <ViewTransition key={post.id} name={`post-${post.id}`}>
          <PostCard
            createdAt={post.publishedAt.slice(0, 10)}
            href={`/post/${post.id}`}
            key={post.id}
            postId={post.id}
            tags={post.tags.map((tag) => tag)}
            title={post.title}
          />
        </ViewTransition>
      ))}
    </section>
  )
}
