import type { Entry } from '@/types/entry'

export const PER_PAGE = 12

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
