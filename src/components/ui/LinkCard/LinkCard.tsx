import Image from 'next/image'
import { FiLink } from 'react-icons/fi'
import { cva } from 'styled-system/css'

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
    my: '3xl',
    borderRadius: 'lg',
    border: '1px solid {colors.divider}',
    bg: 'bg.base',
    transition: 'border-color 0.2s ease, background 0.2s ease',
    textDecoration: 'none',
    cursor: 'pointer',
    overflow: 'hidden',

    _hover: {
      borderColor: 'sage.400',
      bg: 'bg.subtle',
    },

    _focusVisible: {
      outline: '2px solid {colors.brand.primary}',
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
    w: '120px',
    borderRadius: '0 lg lg 0',
    overflow: 'hidden',
    bg: 'bg.subtle',
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
    p: 'xl',
    pr: 'lg',
  },
})

const titleStyles = cva({
  base: {
    fontSize: '0.875rem',
    fontWeight: '600',
    lineHeight: '1.4',
    color: 'head',
    mb: 'sm',
    overflow: 'hidden',
    maxW: '100%',
    display: '-webkit-box',
    WebkitLineClamp: '2',
    '--webkit-box-orient': 'vertical',
  },
})

const descriptionStyles = cva({
  base: {
    fontSize: '0.75rem',
    color: 'base',
    lineHeight: '1.4',
    mb: 'sm',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: '1',
    '--webkit-box-orient': 'vertical',
  },
})

const domainStyles = cva({
  base: {
    fontSize: '0.8rem',
    color: 'link',
    fontFamily: 'monospace',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxW: '100%',
  },
})

const iconStyles = cva({
  base: {
    w: 'xl',
    h: 'xl',
    color: 'icon',
  },
})

const fallbackCharStyles = cva({
  base: {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'head',
  },
})

const FallbackThumbnail = ({ siteName }: { siteName?: string }) => {
  const displayChar = siteName?.charAt(0).toUpperCase() || '🔗'

  return (
    <div className={thumbnailContainerStyles()}>
      {siteName ? (
        <span className={fallbackCharStyles()}>{displayChar}</span>
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

  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className={linkCardStyles()}
      aria-label={`外部リンク: ${title || href}`}
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
