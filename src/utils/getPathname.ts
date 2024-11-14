export const getPathname = (url: string): string => {
  if (url === '/') return 'home'

  const regex = /\/([^/]+)(?=\/|$)/g
  const matches = url.match(regex)

  if (!matches) return ''

  const pathname = matches[0].replaceAll('/', '')

  if (pathname === 'posts') return 'post'

  return pathname
}
