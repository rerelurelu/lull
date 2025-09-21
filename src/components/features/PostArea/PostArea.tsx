import type { FC } from 'react'
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
          display: 'grid',
          w: '100%',
          maxW: '1024px',
          gap: '2rem',
          gridTemplateColumns: {
            sm: 'repeat(1, minmax(0, 1fr))',
            md: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(3, minmax(0, 1fr))',
          },
        }),
        className,
      )}
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
    </section>
  )
}
