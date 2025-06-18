import type { FC } from 'react'
import rehypeHighlight from 'rehype-highlight'
import rehypeParse from 'rehype-parse'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import { css } from 'styled-system/css'
import { unified } from 'unified'
import '@/styles/syntax-highlighting.css'

type Props = {
  postContent: string
}

const addLineNumbers = (codeHtml: string): string => {
  // codeタグの中身を取得
  const codeMatch = codeHtml.match(/<code[^>]*>([\s\S]*?)<\/code>/)
  if (!codeMatch) return codeHtml

  const codeContent = codeMatch[1]
  const lines = codeContent.split('\n')

  // 最後の行が空の場合は削除
  if (lines[lines.length - 1] === '') {
    lines.pop()
  }

  const numberedLines = lines
    .map((line, index) => {
      const lineNumber = index + 1
      return `<span class="line-number">${lineNumber}</span><span class="line-content">${line}</span>`
    })
    .join('\n')

  return codeHtml.replace(codeMatch[1], numberedLines)
}

const highlight = async (content: string) => {
  // data-filename属性を持つdiv要素を処理
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
    const withLineNumbers = addLineNumbers(highlighted)
    const wrappedWithFilename = `<div class="code-block-wrapper"><div class="code-block-header"><span class="code-block-filename">${divMatch.filename}</span></div>${withLineNumbers}</div>`
    content = content.replace(divMatch.fullMatch, wrappedWithFilename)
  }

  // 通常のcode blockも処理
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
    const withLineNumbers = addLineNumbers(highlighted)
    content = content.replace(match, withLineNumbers)
  }
  return content
}

export const PostContainer: FC<Props> = async ({ postContent }) => {
  const highlightedContent = await highlight(postContent)

  // biome-ignore lint/security/noDangerouslySetInnerHtml: This contents from microcms
  return <div className={postContainer} dangerouslySetInnerHTML={{ __html: highlightedContent }} />
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
    p: '0.25rem 0.5rem',
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
      lineHeight: '1.6',

      '& .line-number': {
        display: 'inline-block',
        w: '3rem',
        textAlign: 'right',
        pr: '1rem',
        mr: '0.5rem',
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: '0.875rem',
        userSelect: 'none',
      },

      '& .line-content': {
        display: 'inline-block',
        minH: '1.25rem',
      },
    },
  },

  '& .code-block-wrapper pre': {
    mb: 0,
    borderRadius: 0,
    bg: 'transparent',
  },
})
