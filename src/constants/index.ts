import type { Entry } from '@/types/entry'

export const PER_PAGE = 9

export const VIEWPORT_OFFSET = '32px'

export const TOAST_WIDTH = 360

export const GAP = 14

export const TOAST_LIFETIME = 5000 // 5s default;

export const TIME_BEFORE_UNMOUNT = 200 // animation duration;

export const ENTRIES: Entry[] = [
  { href: '/', content: 'home' },
  { href: '/about/', content: 'about' },
  { href: '/blogs/1/', content: 'blog' },
]

export const OG_IMAGE: Opengraph = {
  IMAGE:
    'https://github.com/rerelurelu/kilonova/assets/43092452/f9f07b5d-2bae-4c17-a95e-14a88dd93579',
  IMAGE_TYPE: 'image/png',
  WIDTH: '700',
  HEIGHT: '700',
}

export const BASE_META = [
  {
    name: 'type',
    content: 'website',
  },
  {
    property: 'og:type',
    content: 'website',
  },
  {
    property: 'og:image',
    content: OG_IMAGE.IMAGE,
  },
  {
    property: 'og:image:type',
    content: OG_IMAGE.IMAGE_TYPE,
  },
  {
    property: 'og:image:width',
    content: OG_IMAGE.WIDTH,
  },
  {
    property: 'og:image:height',
    content: OG_IMAGE.HEIGHT,
  },
]
