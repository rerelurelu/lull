import { Link } from 'next-view-transitions'
import type { FC } from 'react'
import { css } from 'styled-system/css'
import type { Tag } from '@/types/post'

type Props = {
  title: string
  href: string
  createdAt: string
  tags: Tag[]
  key: string
}

export const PostCard: FC<Props> = ({ title, href, createdAt, tags }) => {
  const dateText = new Date(createdAt).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div
      className={css({
        pos: 'relative',
        display: 'flex',
        flexDir: 'column',
        borderRadius: '1rem',
        h: '14rem',
        overflow: 'hidden',
        bg: 'postCard.bg',
      })}
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
            <Link
              className={css({
                _hover: {
                  color: 'postCard.title.hover',
                  cursor: 'pointer',
                },
              })}
              href={href}
            >
              {title}
            </Link>
          </h2>
        </header>
        <div
          className={css({
            display: 'flex',
            flexDir: 'column',
            justifyContent: 'end',
          })}
        >
          <time className={css({ fontSize: '0.6875rem', color: '#6b7280' })} dateTime={createdAt}>
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
                  bg: '#e0d9ff',
                  px: '0.75rem',
                  py: '0.375rem',
                  borderRadius: '9999px',
                  border: '1px solid #c4b5fd',
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
