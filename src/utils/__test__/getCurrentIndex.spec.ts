import { describe, expect, test } from 'vitest'
import { getCurrentIndex } from '../getCurrentIndex'

describe('ブログ一覧のページインデックスを取得できるか', () => {
  test('ページインデックスが1の場合', () => {
    expect(getCurrentIndex('/post/')).toBe('1')
  })

  test('ページインデックスが2以上の場合', () => {
    expect(getCurrentIndex('/post/page/2/')).toBe('2')
  })
})
