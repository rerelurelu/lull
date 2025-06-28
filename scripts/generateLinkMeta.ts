import { promises as fs } from 'fs'
import { join } from 'path'
import { extractLinksFromHtml } from '../src/libs/extractLinks'
import { fetchMultipleLinkMetadata, type LinkMetadata } from '../src/libs/linkCardMeta'
import { fetchPosts } from '../src/services/post'

// 生成されるメタデータファイルの型定義
export type GeneratedLinkMeta = {
  generatedAt: string
  totalLinks: number
  metadata: Record<string, LinkMetadata> // URL をキーとしたマップ
}

/**
 * microCMS から全記事を取得し、リンクカード用メタデータを生成
 * ビルド時に実行される
 */
export const generateLinkCardMetadata = async (): Promise<void> => {
  console.log('🚀 リンクカードメタデータ生成を開始します...')
  
  try {
    // 全記事を取得
    console.log('📚 microCMS から記事を取得中...')
    const { posts: allPosts } = await fetchPosts({ limit: 100 })
    console.log(`✅ ${allPosts.length} 件の記事を取得しました`)
    
    // 全記事からリンクを抽出
    console.log('🔍 記事からリンクを抽出中...')
    const allLinks = new Set<string>()
    
    for (const post of allPosts) {
      try {
        const { links } = await extractLinksFromHtml(post.content)
        links.forEach(link => allLinks.add(link.url))
      } catch (error) {
        console.warn(`⚠️  記事 ${post.id} のリンク抽出中にエラー:`, error)
      }
    }
    
    const uniqueLinks = Array.from(allLinks)
    console.log(`✅ ${uniqueLinks.length} 件のユニークなリンクを抽出しました`)
    
    if (uniqueLinks.length === 0) {
      console.log('ℹ️  リンクカード対象のリンクが見つかりませんでした')
      await saveEmptyMetadata()
      return
    }
    
    // OGP メタデータを取得
    console.log('🌐 OGP メタデータを取得中...')
    const linkMetadata = await fetchMultipleLinkMetadata(uniqueLinks, 3)
    
    // メタデータをマップ形式に変換
    const metadataMap: Record<string, LinkMetadata> = {}
    linkMetadata.forEach(meta => {
      metadataMap[meta.href] = meta
    })
    
    // 結果をJSONファイルに保存
    await saveLinkMetadata({
      generatedAt: new Date().toISOString(),
      totalLinks: uniqueLinks.length,
      metadata: metadataMap,
    })
    
    console.log('✅ リンクカードメタデータの生成が完了しました')
    
  } catch (error) {
    console.error('❌ リンクカードメタデータ生成中にエラーが発生しました:', error)
    process.exit(1)
  }
}

/**
 * 空のメタデータファイルを保存
 */
const saveEmptyMetadata = async (): Promise<void> => {
  const emptyMeta: GeneratedLinkMeta = {
    generatedAt: new Date().toISOString(),
    totalLinks: 0,
    metadata: {},
  }
  
  await saveLinkMetadata(emptyMeta)
}

/**
 * メタデータをJSONファイルに保存
 */
const saveLinkMetadata = async (data: GeneratedLinkMeta): Promise<void> => {
  const outputDir = join(process.cwd(), '.generated')
  const outputFile = join(outputDir, 'link-meta.json')
  
  try {
    // 出力ディレクトリを作成
    await fs.mkdir(outputDir, { recursive: true })
    
    // JSONファイルとして保存
    const jsonData = JSON.stringify(data, null, 2)
    await fs.writeFile(outputFile, jsonData, 'utf-8')
    
    console.log(`📄 メタデータファイルを保存しました: ${outputFile}`)
    console.log(`   - 総リンク数: ${data.totalLinks}`)
    console.log(`   - 生成日時: ${data.generatedAt}`)
    
  } catch (error) {
    console.error('❌ メタデータファイルの保存に失敗しました:', error)
    throw error
  }
}

/**
 * 生成されたメタデータファイルからデータを読み込み
 */
export const loadLinkMetadata = async (): Promise<GeneratedLinkMeta | null> => {
  const metadataFile = join(process.cwd(), '.generated', 'link-meta.json')
  
  try {
    const jsonData = await fs.readFile(metadataFile, 'utf-8')
    return JSON.parse(jsonData) as GeneratedLinkMeta
  } catch (error) {
    console.warn('⚠️  リンクメタデータファイルが見つかりません:', metadataFile)
    return null
  }
}

/**
 * 特定のURLのメタデータを取得
 */
export const getLinkMetadataByUrl = async (url: string): Promise<LinkMetadata | null> => {
  const metadata = await loadLinkMetadata()
  return metadata?.metadata[url] || null
}

/**
 * 複数URLのメタデータを一括取得
 */
export const getLinkMetadataByUrls = async (urls: string[]): Promise<Record<string, LinkMetadata>> => {
  const metadata = await loadLinkMetadata()
  const result: Record<string, LinkMetadata> = {}
  
  if (metadata) {
    urls.forEach(url => {
      if (metadata.metadata[url]) {
        result[url] = metadata.metadata[url]
      }
    })
  }
  
  return result
}

/**
 * メタデータの統計情報を出力
 */
export const logMetadataStats = async (): Promise<void> => {
  const metadata = await loadLinkMetadata()
  
  if (!metadata) {
    console.log('📊 メタデータファイルが存在しません')
    return
  }
  
  console.log('📊 リンクカードメタデータ統計:')
  console.log(`   - 総リンク数: ${metadata.totalLinks}`)
  console.log(`   - 生成日時: ${metadata.generatedAt}`)
  
  // サイト別統計
  const siteStats: Record<string, number> = {}
  Object.values(metadata.metadata).forEach(meta => {
    const domain = meta.siteName || 'Unknown'
    siteStats[domain] = (siteStats[domain] || 0) + 1
  })
  
  console.log('   - サイト別リンク数:')
  Object.entries(siteStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10) // 上位10サイト
    .forEach(([site, count]) => {
      console.log(`     ${site}: ${count}件`)
    })
}

/**
 * スクリプトとして直接実行された場合の処理
 */
if (import.meta.main) {
  generateLinkCardMetadata().catch(error => {
    console.error('❌ スクリプト実行中にエラーが発生しました:', error)
    process.exit(1)
  })
}