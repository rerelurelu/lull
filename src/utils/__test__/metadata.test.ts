import { describe, expect, test, vi } from 'vitest'
import { createArticleMetadata, createMetadata } from '../metadata'

vi.mock('@/constants', () => ({
  SITE_CONFIG: {
    title: 'Relu',
    description: 'Reluの個人ブログ・技術記事',
    url: 'https://example.com',
    language: 'ja',
    author: { name: 'Relu' },
  } as const,
}))

describe('createMetadata', () => {
  const defaultSiteConfig = {
    title: 'Relu',
    description: 'Reluの個人ブログ・技術記事',
    url: 'https://example.com',
    language: 'ja',
  }

  test('引数なしでデフォルトのメタデータを生成', () => {
    const metadata = createMetadata()

    expect(metadata.title).toBe(defaultSiteConfig.title)
    expect(metadata.description).toBe(defaultSiteConfig.description)
    expect(metadata.openGraph?.title).toBe(defaultSiteConfig.title)
    expect(metadata.openGraph?.description).toBe(defaultSiteConfig.description)
    expect(metadata.openGraph?.url).toBe(defaultSiteConfig.url)
    expect(metadata.openGraph?.siteName).toBe(defaultSiteConfig.title)
    expect(metadata.openGraph?.locale).toBe(defaultSiteConfig.language)
    expect(metadata.twitter?.title).toBe(defaultSiteConfig.title)
    expect(metadata.twitter?.description).toBe(defaultSiteConfig.description)
    expect(metadata.alternates?.canonical).toBe(defaultSiteConfig.url)
  })

  test('カスタムタイトルでメタデータを生成', () => {
    const metadata = createMetadata({ title: 'About' })

    expect(metadata.title).toBe('About | Relu')
    expect(metadata.openGraph?.title).toBe('About | Relu')
    expect(metadata.twitter?.title).toBe('About | Relu')
  })

  test('カスタムディスクリプションでメタデータを生成', () => {
    const customDescription = 'カスタムな説明文'
    const metadata = createMetadata({ description: customDescription })

    expect(metadata.description).toBe(customDescription)
    expect(metadata.openGraph?.description).toBe(customDescription)
    expect(metadata.twitter?.description).toBe(customDescription)
  })

  test('カスタムパスでメタデータを生成', () => {
    const metadata = createMetadata({ path: '/about' })

    expect(metadata.openGraph?.url).toBe('https://example.com/about')
    expect(metadata.alternates?.canonical).toBe('https://example.com/about')
  })

  test('typeにarticleを指定してメタデータを生成', () => {
    const metadata = createMetadata({ type: 'article' })

    expect(metadata.openGraph).toBeDefined()
  })

  test('imagesを文字列で指定してメタデータを生成', () => {
    const imageUrl = 'https://example.com/image.jpg'
    const metadata = createMetadata({ images: imageUrl })

    expect(metadata.openGraph?.images).toBe(imageUrl)
    expect(metadata.twitter?.images).toBe(imageUrl)
  })

  test('imagesを配列で指定してメタデータを生成', () => {
    const imageUrls = ['https://example.com/image1.jpg', 'https://example.com/image2.jpg']
    const metadata = createMetadata({ images: imageUrls })

    expect(metadata.openGraph?.images).toEqual(imageUrls)
    expect(metadata.twitter?.images).toEqual(imageUrls)
  })

  test('imagesが未指定の場合はimagesプロパティが設定されない', () => {
    const metadata = createMetadata()

    expect(metadata.openGraph?.images).toBeUndefined()
    expect(metadata.twitter?.images).toBeUndefined()
  })

  test('全てのオプションを指定してメタデータを生成', () => {
    const options = {
      title: 'カスタムタイトル',
      description: 'カスタムな説明',
      path: '/custom-path',
      type: 'article' as const,
      images: 'https://example.com/custom.jpg',
    }
    const metadata = createMetadata(options)

    expect(metadata.title).toBe('カスタムタイトル | Relu')
    expect(metadata.description).toBe('カスタムな説明')
    expect(metadata.openGraph?.url).toBe('https://example.com/custom-path')
    expect(metadata.openGraph?.images).toBe('https://example.com/custom.jpg')
    expect(metadata.alternates?.canonical).toBe('https://example.com/custom-path')
  })
})

describe('createArticleMetadata', () => {
  test('記事用のメタデータを生成', () => {
    const metadata = createArticleMetadata(
      'テスト記事',
      'これはテスト記事です',
      '/posts/test-article',
    )

    expect(metadata.title).toBe('テスト記事 | Relu')
    expect(metadata.description).toBe('これはテスト記事です')
    expect(metadata.openGraph?.url).toBe('https://example.com/posts/test-article')
    expect(metadata.alternates?.canonical).toBe('https://example.com/posts/test-article')
  })

  test('createMetadataのラッパーとして正しく動作', () => {
    const title = '技術記事タイトル'
    const description = '技術記事の説明'
    const path = '/posts/tech-article'

    const metadata = createArticleMetadata(title, description, path)

    expect(metadata.title).toBe('技術記事タイトル | Relu')
    expect(metadata.description).toBe('技術記事の説明')
    expect(metadata.openGraph).toBeDefined()
    expect(metadata.twitter).toBeDefined()
  })
})
