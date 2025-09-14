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
        border: '1px solid #00ffff',
        boxShadow: '0 0 10px rgba(0, 255, 255, 0.3), 0 0 20px rgba(255, 0, 255, 0.2), 0 8px 32px rgba(0, 255, 255, 0.15)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        _hover: {
          transform: 'translateY(-4px)',
          border: '1px solid #ff00ff',
          boxShadow: '0 0 15px rgba(0, 255, 255, 0.5), 0 0 30px rgba(255, 0, 255, 0.4), 0 12px 40px rgba(0, 255, 255, 0.25)',
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
          <time className={css({ fontSize: '0.6875rem', color: '#8a7ca8' })} dateTime={createdAt}>
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
                  bg: 'rgba(0, 255, 255, 0.1)',
                  px: '0.75rem',
                  py: '0.375rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(0, 255, 255, 0.4)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.125rem',
                  fontSize: '0.6875rem',
                  fontWeight: '500',
                  transition: 'all 0.2s ease',
                  _hover: {
                    bg: 'rgba(0, 255, 255, 0.2)',
                    transform: 'scale(1.05)',
                    boxShadow: '0 0 8px rgba(0, 255, 255, 0.6), 0 0 15px rgba(255, 0, 255, 0.3)',
                  },
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
