import Link from 'next/link'
import { ViewTransition } from 'react'
import { css, cx } from 'styled-system/css'
import { styled } from 'styled-system/jsx'
import { badge } from 'styled-system/recipes'
import type { Post } from '@/types/post'

type Props = {
  post: Post
}

const formatDate = (iso: string) => {
  const d = new Date(iso)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}.${mm}.${dd}`
}

export const PostListItem = ({ post }: Props) => {
  return (
    <styled.li listStyle='none' borderBottom='1px solid {colors.divider}'>
      <Link
        href={`/post/${post.id}`}
        className={css({
          display: 'grid',
          gridTemplateColumns: { base: '1fr', md: '6.5rem 1fr' },
          gap: { base: 'sm', md: '2xl' },
          alignItems: { base: 'flex-start', md: 'baseline' },
          py: { base: 'lg', md: '1.25rem' },
          px: { base: 'sm', md: 'md' },
          textDecoration: 'none',
          color: 'inherit',
          transition: 'background 0.25s ease, transform 0.25s ease',
          _hover: {
            bg: 'bg.subtle',
            transform: { md: 'translateX(2px)' },
            '& h3': { color: 'brand.primary' },
          },
        })}
      >
        <styled.time
          dateTime={post.publishedAt}
          color='muted'
          fontSize='0.75rem'
          letterSpacing='0.08em'
          flexShrink={0}
          mt={{ base: 0, md: 'xs' }}
        >
          {formatDate(post.publishedAt)}
        </styled.time>

        <styled.div display='flex' flexDir='column' gap='md'>
          <ViewTransition name={`post-${post.id}`} share='morph' default='none'>
            <styled.h3
              fontSize={{ base: '1rem', md: '1.0625rem' }}
              lineHeight='1.55'
              fontWeight='400'
              color='head'
              textWrap='pretty'
              transition='color 0.25s ease'
            >
              {post.title}
            </styled.h3>
          </ViewTransition>

          {post.tags.length > 0 && (
            <styled.div display='flex' flexWrap='wrap' columnGap='md' rowGap='sm'>
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className={cx(badge({ variant: 'tag', size: 'sm' }), css({ gap: 'xs' }))}
                >
                  <styled.span opacity={0.55}>#</styled.span>
                  <span>{tag.tagName}</span>
                </span>
              ))}
            </styled.div>
          )}
        </styled.div>
      </Link>
    </styled.li>
  )
}
