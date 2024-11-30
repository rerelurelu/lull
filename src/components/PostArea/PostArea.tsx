'use client'

import type { Post } from '@/types/post'
import { getPathname } from '@/utils/getPathname'
import { usePathname } from 'next/navigation'
import type { FC } from 'react'
import { css, cx } from 'styled-system/css'
import { TextLink } from '../Link/TextLink'
import { PostCard } from '../PostCard/PostCard'

type Pros = {
  posts: Post[]
  className?: string
}

export const PostArea: FC<Pros> = ({ posts, className }) => {
  const isHome = getPathname(usePathname()) === 'home'

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
      {isHome && (
        <h2
          className={css({
            mb: { base: '1.5rem', md: '3rem' },
            fontSize: { base: '1.25rem', md: '1.875rem' },
            lineHeight: { base: '1.75rem', md: '2.25rem' },
            textAlign: 'left',
            color: 'head',
          })}
        >
          Recent Posts
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
          mt: { base: isHome ? '2rem' : '6rem', md: isHome ? '3rem' : '8rem' },
        })}
      >
        {posts.map((post) => (
          <PostCard
            createdAt={post.publishedAt.slice(0, 10)}
            href={`/post/${post.id}`}
            key={post.id}
            tags={post.tags.map((tag) => tag)}
            title={post.title}
          />
        ))}
      </div>
      {isHome && (
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
