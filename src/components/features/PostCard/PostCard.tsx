'use client'

import Link from 'next/link'
import type { FC } from 'react'
import { css, cx } from 'styled-system/css'
import { gradient } from 'styled-system/recipes'
import type { Tag } from '@/types/post'

type Props = {
  title: string
  href: string
  createdAt: string
  tags: Tag[]
  postId: string
}

export const PostCard: FC<Props> = ({ title, href, createdAt, tags }) => {
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
          borderRadius: '1rem',
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
          p: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          flex: '1 1 auto',
          flexDir: 'column',
          gap: '0.75rem',
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
                gap: '0.5rem',
                mb: '0.5rem',
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
              mt: '0.75rem',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              columnGap: '0.5rem',
              rowGap: '0.25rem',
            })}
          >
            {tags.map((tag) => (
              <div
                className={css({
                  color: 'postCard.tag',
                  bg: 'surface.light',
                  px: '0.75rem',
                  py: '0.375rem',
                  borderRadius: '9999px',
                  border: '1px solid {colors.divider}',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.125rem',
                  fontSize: '0.6875rem',
                  fontWeight: '500',
                })}
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
