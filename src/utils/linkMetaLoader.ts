import type { LinkMetadata } from '@/libs/linkCardMeta'

// 生成されたメタデータファイルの型定義
export type GeneratedLinkMeta = {
  generatedAt: string
  totalLinks: number
  metadata: Record<string, LinkMetadata>
}

/**
 * 静的に生成されたメタデータを読み込み（サーバーサイド専用）
 */
export const loadStaticLinkMetadata = async (): Promise<GeneratedLinkMeta | null> => {
  if (typeof window !== 'undefined') {
    // クライアントサイドでは実行しない
    return null
  }

  try {
    // 動的インポートでサーバーサイドでのみ実行
    const fs = await import('node:fs/promises')
    const path = await import('node:path')

    const metadataFile = path.join(process.cwd(), '.generated', 'link-meta.json')
    const jsonData = await fs.readFile(metadataFile, 'utf-8')
    return JSON.parse(jsonData) as GeneratedLinkMeta
  } catch (_error) {
    console.warn('⚠️  リンクメタデータファイルが見つかりません')
    return null
  }
}

/**
 * 特定のURLのメタデータを取得
 */
export const getLinkMetadataByUrl = async (url: string): Promise<LinkMetadata | null> => {
  const metadata = await loadStaticLinkMetadata()
  return metadata?.metadata[url] || null
}

/**
 * 複数URLのメタデータを一括取得
 */
export const getLinkMetadataByUrls = async (
  urls: string[],
): Promise<Record<string, LinkMetadata>> => {
  const metadata = await loadStaticLinkMetadata()
  const result: Record<string, LinkMetadata> = {}

  if (metadata) {
    urls.forEach((url) => {
      if (metadata.metadata[url]) {
        result[url] = metadata.metadata[url]
      }
    })
  }

  return result
}
