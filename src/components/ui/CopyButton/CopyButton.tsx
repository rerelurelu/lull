'use client'

import { useState } from 'react'
import { css } from 'styled-system/css'

type Props = {
  code: string
  className?: string
}

export const CopyButton = ({ code, className }: Props) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  return (
    <button
      type='button'
      onClick={handleCopy}
      className={`${copyButton} ${className || ''}`}
      aria-label='コードをコピー'
    >
      {copied ? (
        <svg
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <title>コピー完了</title>
          <path
            d='M20 6L9 17L4 12'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      ) : (
        <svg
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <title>コピー</title>
          <rect
            x='9'
            y='9'
            width='13'
            height='13'
            rx='2'
            ry='2'
            stroke='currentColor'
            strokeWidth='2'
            fill='none'
          />
          <path
            d='m5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'
            stroke='currentColor'
            strokeWidth='2'
            fill='none'
          />
        </svg>
      )}
    </button>
  )
}

const copyButton = css({
  position: 'absolute',
  top: '0.5rem',
  right: '0.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  w: '2rem',
  h: '2rem',
  borderRadius: '0.25rem',
  border: 'none',
  bg: 'overlay.white.10',
  color: 'post.code',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  zIndex: 10,

  _hover: {
    bg: 'overlay.white.20',
    transform: 'scale(1.05)',
  },

  _active: {
    transform: 'scale(0.95)',
  },
})
