import type { FC } from 'react'
import rehypeHighlight from 'rehype-highlight'
import rehypeParse from 'rehype-parse'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import { css } from 'styled-system/css'
import { unified } from 'unified'
import type { ExtractedLink } from '@/libs/extractLinks'
import { extractLinksFromHtml } from '@/libs/extractLinks'
import type { LinkMetadata } from '@/libs/linkCardMeta'
import { getLinkMetadataByUrls } from '@/utils/linkMetaLoader'
import { PostContainerClient } from './PostContainerClient'

type Props = {
  postContent: string
}

const highlight = async (content: string) => {
  const divRegex =
    /<div data-filename="([^"]*)">\s*(<pre><code class="language-.*?">[\s\S]*?<\/code><\/pre>)\s*<\/div>/g
  let divMatch: RegExpExecArray | null
  const divMatches = []

  while ((divMatch = divRegex.exec(content)) !== null) {
    divMatches.push({
      fullMatch: divMatch[0],
      filename: divMatch[1],
      codeBlock: divMatch[2],
    })
  }

  for (const divMatch of divMatches) {
    const matchLanguage = divMatch.codeBlock.match(/language-(.*?)"/)
    const language = matchLanguage ? matchLanguage[1] : 'plaintext'

    const file = await unified()
      .use(rehypeParse, { fragment: true })
      .use(rehypeSanitize)
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(`<pre><code class="language-${language}">${divMatch.codeBlock}</code></pre>`)

    const highlighted = String(file)
    const wrappedWithFilename = `<div class="code-block-wrapper"><div class="code-block-header"><span class="code-block-filename">${divMatch.filename}</span></div>${highlighted}</div>`
    content = content.replace(divMatch.fullMatch, wrappedWithFilename)
  }

  const regex = /(<pre><code class="language-.*?">[\s\S]*?<\/code><\/pre>)/g
  let match: RegExpExecArray | null
  const matches = []

  while ((match = regex.exec(content)) !== null) {
    matches.push(match[1])
  }

  for (const match of matches) {
    const matchLanguage = match.match(/language-(.*?)"/)
    const language = matchLanguage ? matchLanguage[1] : 'plaintext'

    const file = await unified()
      .use(rehypeParse, { fragment: true })
      .use(rehypeSanitize)
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(`<pre><code class="language-${language}">${match}</code></pre>`)

    const highlighted = String(file)
    content = content.replace(match, highlighted)
  }
  return content
}

const processLinkCards = async (content: string) => {
  try {
    const { links, processedHtml } = await extractLinksFromHtml(content)

    if (links.length === 0) {
      return processedHtml
    }

    const urls = links.map((link) => link.url)
    const linkMetadata = await getLinkMetadataByUrls(urls)
    let finalHtml = processedHtml

    links.forEach((link, index) => {
      const metadata = linkMetadata[link.url]
      const placeholder = `__LINK_CARD_${index}__`

      const linkCardHtml = generateLinkCardHtml(link, metadata, index)
      finalHtml = finalHtml.replace(new RegExp(`<p[^>]*>${placeholder}</p>`, 'g'), linkCardHtml)
    })

    return finalHtml
  } catch (error) {
    console.error('リンクカード処理エラー:', error)
    return content
  }
}

const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

const generateLinkCardHtml = (
  link: ExtractedLink,
  metadata: LinkMetadata | undefined,
  _index: number,
): string => {
  const title = escapeHtml(metadata?.title || extractTitleFromUrl(link.url))
  const description = metadata?.description ? escapeHtml(metadata.description) : ''
  const thumbnail = metadata?.image || ''
  const siteName = metadata?.siteName || extractDomainFromUrl(link.url)
  const domain = escapeHtml(extractDomainFromUrl(link.url))
  const escapedUrl = escapeHtml(link.url)

  return `
    <div class="link-card-wrapper" data-url="${escapedUrl}">
      <a href="${escapedUrl}" target="_blank" rel="noopener noreferrer" class="link-card">
        <div class="link-card-content">
          <div class="link-card-text">
            <div>
              <h3 class="link-card-title">${title}</h3>
              ${description ? `<p class="link-card-description" style="-webkit-box-orient: vertical;">${description}</p>` : ''}
            </div>
            <span class="link-card-domain">${domain}</span>
          </div>
          ${
            thumbnail
              ? `
            <div class="link-card-thumbnail">
              <img src="${thumbnail}" alt="${escapeHtml(metadata?.title || 'サイトのサムネイル画像')}" loading="lazy" />
            </div>
          `
              : `
            <div class="link-card-thumbnail link-card-fallback">
              <span class="link-card-fallback-text">${siteName ? escapeHtml(siteName.charAt(0).toUpperCase()) : '🔗'}</span>
            </div>
          `
          }
        </div>
      </a>
    </div>
  `
}

const extractTitleFromUrl = (url: string): string => {
  try {
    const urlObj = new URL(url)
    const pathname = urlObj.pathname
    const segments = pathname.split('/').filter(Boolean)
    const lastSegment = segments[segments.length - 1]

    if (lastSegment) {
      const title = lastSegment.replace(/\.[^.]+$/, '')
      return title.replace(/[-_]/g, ' ')
    }

    return urlObj.hostname.replace('www.', '')
  } catch {
    return url
  }
}

const extractDomainFromUrl = (url: string): string => {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return url
  }
}

export const PostContainerWithLinkCards: FC<Props> = async ({ postContent }) => {
  const processedHtml = await processLinkCards(postContent)
  const highlightedContent = await highlight(processedHtml)

  return (
    <PostContainerClient>
      <div
        className={`${postContainer} ${linkCardStyles}`}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: コンテンツは内部で処理・サニタイズされており、rehype-sanitizeを使用してXSS対策を実装済み
        dangerouslySetInnerHTML={{ __html: highlightedContent }}
      />
    </PostContainerClient>
  )
}

const postContainer = css({
  w: '100%',
  fontWeight: '400',

  '& h1, h2, h3, h4, h5, h6': {
    mt: '4rem',
  },

  '& h1, h2': {
    mb: '0.5rem',
    py: '0.5rem',
    fontWeight: '600',
    borderBottom: '0.0625rem solid token(colors.divider)',
  },

  '& h1': {
    fontSize: '1.875rem',
    lineHeight: '2.25rem',
  },

  '& h2': {
    fontSize: '1.5rem',
    lineHeight: '2rem',
  },

  '& h3': {
    _before: {
      mr: '0.5rem',
      content: '"#"',
    },
  },

  '& h4': {
    _before: {
      mr: '0.5rem',
      content: '"##"',
    },
  },

  '& h5': {
    _before: {
      mr: '0.5rem',
      content: '"###"',
    },
  },

  '& h3, h4, h5, h6': {
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    mb: '0.75rem',
    fontWeight: '400',
  },

  '& a': {
    color: 'link',
    mx: '1px',
    textDecoration: 'underline',
  },

  '& figure': {
    '& img': {
      w: '100%',
      mx: 'auto',
      my: '2rem',
      borderRadius: '0.5rem',
    },
  },

  '& ul': {
    ml: '1.75rem',
    mb: '2rem',
    listStyleType: 'disc',

    '& li': {
      mx: '0',
      fontSize: '1rem',
      color: 'post.base',
    },
  },

  '& hr': {
    my: '2rem',
    h: '1px',
    border: 'none',
    bg: 'divider',
  },

  '& p': {
    mb: '2rem',
    fontSize: '1rem',
    color: 'post.base',
  },

  '& code': {
    p: '0.125rem 0.25rem',
    mx: '0.25rem',
    borderRadius: '0.25rem',
    fontSmoothing: 'antialiased',
    bg: 'bg.codeBlock',
    color: 'post.code',
  },

  '& .code-block-wrapper': {
    mb: '2rem',
    borderRadius: '0.5rem',
    bg: 'bg.codeBlock',
    overflow: 'hidden',
  },

  '& .code-block-header': {
    px: '1rem',
    py: '0.25rem',
    bg: 'rgba(255, 255, 255, 0.05)',
    borderBottom: '1px solid token(colors.divider)',
    fontSize: '0.875rem',
    fontWeight: '500',
  },

  '& .code-block-filename': {
    color: 'post.code',
  },

  '& pre': {
    w: '100%',
    mb: '2rem',
    overflowX: 'auto',
    borderRadius: '0.5rem',

    '& code': {
      display: 'block',
      w: 'max-content',
      minW: '100%',
      mx: 0,
      borderRadius: '0',
      fontSize: '1rem',
      p: '1rem',
    },
  },

  '& .code-block-wrapper pre': {
    mb: 0,
    borderRadius: 0,
    bg: 'transparent',
  },
})

const linkCardStyles = css({
  '& .link-card-wrapper': {
    w: '100%',
    maxW: '640px',
    mx: 'auto',
    my: '2rem',

    '& *': {
      boxSizing: 'border-box',
    },
  },

  '& .link-card': {
    display: 'block',
    w: '100%',
    borderRadius: '0.75rem',
    border: '1px solid token(colors.divider)',
    bg: 'linear-gradient(135deg, rgba(100, 125, 238, 0.1), rgba(127, 83, 172, 0.1))',
    backdropFilter: 'blur(8px)',
    transition: 'background 0.3s ease',
    textDecoration: 'none',
    cursor: 'pointer',
    overflow: 'hidden',

    _hover: {
      bg: 'linear-gradient(135deg, rgba(100, 125, 238, 0.15), rgba(127, 83, 172, 0.15))',
    },

    _focus: {
      outline: '2px solid token(colors.link)',
      outlineOffset: '2px',
    },
  },

  '& .link-card-content': {
    display: 'flex',
    alignItems: 'stretch',
    h: '120px',
  },

  '& .link-card-text': {
    flex: 1,
    minW: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    p: '1rem',
    pr: '0.75rem',
  },

  '& .link-card-title': {
    fontSize: '0.875rem',
    fontWeight: '600',
    lineHeight: '1.4',
    color: 'token(colors.postCard.title.base)',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    maxW: '100%',
    margin: '0 0 0.25rem 0 !important',
    padding: '0 !important',

    _before: {
      content: 'none !important',
    },
  },

  '& .link-card-description': {
    fontSize: '0.75rem',
    color: 'token(colors.post.base)',
    lineHeight: '1.4',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    margin: '0 0 0.25rem 0 !important',
    padding: '0 !important',
  },

  '& .link-card-domain': {
    fontSize: '0.8rem',
    color: 'token(colors.link)',
    fontFamily: 'monospace',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxW: '100%',
    margin: '0 !important',
    padding: '0 !important',
  },

  '& .link-card-thumbnail': {
    flexShrink: 0,
    h: '120px',
    borderRadius: '0 0.75rem 0.75rem 0',
    overflow: 'hidden',
    bg: 'linear-gradient(135deg, token(colors.postCard.bg))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    order: 2,

    '& img': {
      height: '120px',
      width: 'auto',
      minWidth: '120px',
      maxWidth: '240px',
      objectFit: 'cover',
    },
  },

  '& .link-card-fallback': {
    w: '120px',
  },

  '& .link-card-fallback-text': {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'white',
  },
})
