'use client'

import Link from 'next/link'
import { css, cx } from 'styled-system/css'
import { badge, gradient } from 'styled-system/recipes'
import type { Tag } from '@/types/post'

type Props = {
  title: string
  href: string
  createdAt: string
  tags: Tag[]
  postId: string
}

export const PostCard = ({ title, href, createdAt, tags }: Props) => {
  const dateText = new Date(createdAt).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div
      className={cx(
        gradient({ type: 'postCard' }),
        css({
          pos: 'relative',
          display: 'flex',
          flexDir: 'column',
          borderRadius: 'lg',
          h: '14rem',
          overflow: 'hidden',
          border: '1px solid {colors.overlay.brand.10}',
          boxShadow: '0 4px 12px {colors.overlay.brand.10}, 0 1px 4px {colors.overlay.brand.10}',
        }),
      )}
    >
      <div
        className={css({
          color: 'postCard.title.base',
          p: '2xl',
          display: 'flex',
          justifyContent: 'space-between',
          flex: '1 1 auto',
          flexDir: 'column',
          gap: 'lg',
        })}
      >
        <header
          className={css({
            pb: 'auto',
          })}
        >
          <Link
            className={css({
              _hover: {
                color: 'postCard.title.hover',
                cursor: 'pointer',
              },
            })}
            href={href}
          >
            <h2
              className={css({
                fontSize: '1rem',
                fontWeight: '600',
                lineHeight: '1.75rem',
                textWrap: 'pretty',
                display: 'flex',
                alignItems: 'center',
                gap: 'md',
                mb: 'md',
              })}
            >
              {title}
            </h2>
          </Link>
        </header>
        <div
          className={css({
            display: 'flex',
            flexDir: 'column',
            justifyContent: 'end',
          })}
        >
          <time
            className={css({
              fontSize: '0.6875rem',
              color: 'surface.muted',
            })}
            dateTime={createdAt}
          >
            {dateText}
          </time>
          <div
            className={css({
              mt: 'lg',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              columnGap: 'md',
              rowGap: 'sm',
            })}
          >
            {tags.map((tag) => (
              <div
                className={cx(
                  badge({ variant: 'tag', size: 'md' }),
                  css({
                    gap: 'xs',
                  }),
                )}
                key={tag.id}
              >
                <span className={css({ opacity: 0.8 })}>#</span>
                <span>{tag.tagName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
