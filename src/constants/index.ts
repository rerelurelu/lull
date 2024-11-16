import type { Entry } from '@/types/entry'
import { ImageResponse } from 'next/og'

export const PER_PAGE = 9

export const VIEWPORT_OFFSET = '32px'

export const TOAST_WIDTH = 360

export const GAP = 14

export const TOAST_LIFETIME = 5000 // 5s default;

export const TIME_BEFORE_UNMOUNT = 200 // animation duration;

export const ENTRIES: Entry[] = [
  { href: '/', content: 'home' },
  { href: '/about/', content: 'about' },
  { href: '/posts/1/', content: 'post' },
]

export const OGP_FONT = 'M PLUS 1p'
export const MAX_OGP_TEXT_LENGTH = 59
export const OGP_IMAGE_SIZE = {
  WIDTH: 1200,
  HEIGHT: 630,
} as const
