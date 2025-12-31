import { describe, expect, test } from 'vitest'
import { getPathname } from '../getPathname'

describe('現在開いているページのパス（ディレクトリ名）を取得できること', () => {
  const paths = {
    home: '/',
    posts: '/posts/1/',
    postDetail: '/post/renewal-my-portfolio-site/',
    about: '/about/',
    contact: '/contact/',
    noMatch: 'noMatch',
  }

  test('開いているページがHomeの場合', () => {
    expect(getPathname(paths.home)).toBe('home')
  })

  test('開いているページがPost一覧の場合', () => {
    expect(getPathname(paths.posts)).toBe('post')
  })

  test('開いているページがPost詳細の場合', () => {
    expect(getPathname(paths.postDetail)).toBe('post')
  })

  test('開いているページがAboutの場合', () => {
    expect(getPathname(paths.about)).toBe('about')
  })

  test('開いているページがContactの場合', () => {
    expect(getPathname(paths.contact)).toBe('contact')
  })

  test('正規表現でマッチしなかった場合', () => {
    expect(getPathname(paths.noMatch)).toBe('')
  })
})
