import { Link } from 'next-view-transitions'
import type { FC } from 'react'
import { css, cx } from 'styled-system/css'
import { text } from 'styled-system/recipes'
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
        transition: 'all 0.3s ease-in-out',
        _hover: {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 32px rgba(255, 204, 0, 0.2)',
        },
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
              fontSize: '1.25rem',
              fontWeight: '600',
              lineHeight: '1.875rem',
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
          <time className={text({ size: 'sm' })} dateTime={createdAt}>
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
                  bg: 'rgba(255, 204, 0, 0.1)',
                  px: '0.5rem',
                  py: '0.25rem',
                  borderRadius: '0.375rem',
                  border: '1px solid rgba(255, 204, 0, 0.3)',
                })} 
                key={tag.id}
              >
                <span className={cx(css({ mr: '2px' }), text({ size: 'sm' }))}>#</span>
                <span className={text({ size: 'sm' })}>{tag.tagName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
