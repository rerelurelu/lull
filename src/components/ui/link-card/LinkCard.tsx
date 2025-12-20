'use client'

import Image from 'next/image'
import { useState } from 'react'
import { FiLink } from 'react-icons/fi'
import { cva, cx } from 'styled-system/css'
import { gradient } from 'styled-system/recipes'
export type LinkCardProps = {
  href: string
  title?: string
  description?: string
  thumbnail?: string
  siteName?: string
}

const linkCardStyles = cva({
  base: {
    display: 'block',
    w: '100%',
    maxW: '640px',
    mx: 'auto',
    my: '2rem',
    borderRadius: '0.75rem',
    border: '1px solid token(colors.divider)',
    backdropFilter: 'blur(8px)',
    transition: 'background 0.3s ease',
    textDecoration: 'none',
    cursor: 'pointer',
    overflow: 'hidden',

    _focus: {
      outline: '2px solid token(colors.link)',
      outlineOffset: '2px',
    },
  },
})

const cardHeaderStyles = cva({
  base: {
    display: 'flex',
    alignItems: 'stretch',
    h: '120px',
  },
})

const thumbnailContainerStyles = cva({
  base: {
    flexShrink: 0,
    h: '120px',
    borderRadius: '0 0.75rem 0.75rem 0',
    overflow: 'hidden',
    bg: 'linear-gradient(135deg, token(colors.postCard.bg))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    order: 2,
  },
})

const contentStyles = cva({
  base: {
    flex: 1,
    minW: 0,
    order: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    p: '1rem',
    pr: '0.75rem',
  },
})

const titleStyles = cva({
  base: {
    fontSize: '0.875rem',
    fontWeight: '600',
    lineHeight: '1.4',
    color: 'token(colors.postCard.title.base)',
    mb: '0.25rem',
    overflow: 'hidden',
    maxW: '100%',
    display: '-webkit-box',
    WebkitLineClamp: '2',
    // Use custom CSS property for WebkitBoxOrient
    '--webkit-box-orient': 'vertical',

    _groupHover: {
      color: 'token(colors.postCard.title.hover)',
    },
  },
})

const descriptionStyles = cva({
  base: {
    fontSize: '0.75rem',
    color: 'token(colors.post.base)',
    lineHeight: '1.4',
    mb: '0.25rem',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: '1',
    // Use custom CSS property for WebkitBoxOrient
    '--webkit-box-orient': 'vertical',
  },
})

const domainStyles = cva({
  base: {
    fontSize: '0.8rem',
    color: 'token(colors.link)',
    fontFamily: 'monospace',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxW: '100%',
  },
})

const iconStyles = cva({
  base: {
    w: '1rem',
    h: '1rem',
    color: 'token(colors.icon)',
  },
})

const FallbackThumbnail = ({ siteName }: { siteName?: string }) => {
  const displayChar = siteName?.charAt(0).toUpperCase() || '🔗'

  return (
    <div className={thumbnailContainerStyles()}>
      {siteName ? (
        <span
          style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: 'white',
          }}
        >
          {displayChar}
        </span>
      ) : (
        <FiLink className={iconStyles()} size={32} />
      )}
    </div>
  )
}

export const LinkCard = ({ href, title, description, thumbnail, siteName }: LinkCardProps) => {
  const domain = (() => {
    try {
      return new URL(href).hostname.replace('www.', '')
    } catch {
      return href
    }
  })()

  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className={cx(gradient({ type: isHovered ? 'linkCardHover' : 'linkCard' }), linkCardStyles())}
      aria-label={`外部リンク: ${title || href}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cardHeaderStyles()}>
        {thumbnail ? (
          <div className={thumbnailContainerStyles()}>
            <Image
              src={thumbnail}
              alt={title || 'サイトのサムネイル画像'}
              width={240}
              height={120}
              unoptimized={true}
              style={{
                height: '120px',
                width: 'auto',
                minWidth: '120px',
                maxWidth: '240px',
                objectFit: 'cover',
              }}
            />
          </div>
        ) : (
          <FallbackThumbnail siteName={siteName} />
        )}

        <div className={contentStyles()}>
          <div>
            {title && <h3 className={titleStyles()}>{title}</h3>}
            {description && <p className={descriptionStyles()}>{description}</p>}
          </div>
          <span className={domainStyles()}>{domain}</span>
        </div>
      </div>
    </a>
  )
}
