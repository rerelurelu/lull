import { promises as fs } from 'node:fs'
import { join } from 'node:path'
import { Feed } from 'feed'
import { SITE_CONFIG } from '../src/constants'
import { fetchPosts } from '../src/services/post'

// フィード用の拡張設定
const FEED_CONFIG = {
  ...SITE_CONFIG,
  id: SITE_CONFIG.url,
  link: SITE_CONFIG.url,
  favicon: `${SITE_CONFIG.url}icon.svg`,
  copyright: `All rights reserved 2024, ${SITE_CONFIG.author.name}`,
  author: {
    ...SITE_CONFIG.author,
    link: SITE_CONFIG.url,
  },
}

/**
 * HTMLからプレーンテキストを抽出する簡易関数
 */
const stripHtml = (html: string): string => {
  return html
    .replace(/<[^>]*>/g, '') // HTMLタグを削除
    .replace(/&nbsp;/g, ' ') // &nbsp;をスペースに変換
    .replace(/&amp;/g, '&') // &amp;を&に変換
    .replace(/&lt;/g, '<') // &lt;を<に変換
    .replace(/&gt;/g, '>') // &gt;を>に変換
    .replace(/&quot;/g, '"') // &quot;を"に変換
    .replace(/&#39;/g, "'") // &#39;を'に変換
    .replace(/\s+/g, ' ') // 連続する空白を単一スペースに
    .trim()
}

/**
 * Atom/RSS フィードを生成してpublic/feed.xmlに保存
 */
export const generateFeed = async (): Promise<void> => {
  console.log('🚀 Atom/RSS フィード生成を開始します...')

  try {
    // 全記事を取得
    console.log('📚 microCMS から記事を取得中...')
    const { posts: allPosts } = await fetchPosts({
      limit: 100,
      orders: '-publishedAt', // 公開日の降順
    })
    console.log(`✅ ${allPosts.length} 件の記事を取得しました`)

    if (allPosts.length === 0) {
      console.log('ℹ️  記事が見つかりませんでした')
      return
    }

    // Feedインスタンスを作成
    const feed = new Feed({
      title: FEED_CONFIG.title,
      description: FEED_CONFIG.description,
      id: FEED_CONFIG.id,
      link: FEED_CONFIG.link,
      language: FEED_CONFIG.language,
      favicon: FEED_CONFIG.favicon,
      copyright: FEED_CONFIG.copyright,
      updated: new Date(allPosts[0].publishedAt), // 最新記事の日付
      feedLinks: {
        atom: `${FEED_CONFIG.link}feed.xml`,
        rss: `${FEED_CONFIG.link}feed.xml`,
      },
      author: FEED_CONFIG.author,
    })

    // 各記事をフィードに追加
    console.log('📝 記事をフィードに追加中...')
    for (const post of allPosts) {
      try {
        const postUrl = `${FEED_CONFIG.link}post/${post.id}`
        const plainContent = stripHtml(post.content)

        feed.addItem({
          title: post.title,
          id: postUrl,
          link: postUrl,
          description: plainContent.substring(0, 200) + (plainContent.length > 200 ? '...' : ''),
          content: post.content,
          author: [FEED_CONFIG.author],
          date: new Date(post.publishedAt),
          category: post.tags.map((tag) => ({
            name: tag.tagName,
            term: tag.tagName,
          })),
        })
      } catch (error) {
        console.warn(`⚠️  記事 ${post.id} の追加中にエラー:`, error)
      }
    }

    // フィードファイルを保存
    const outputDir = join(process.cwd(), 'public')
    const outputFile = join(outputDir, 'feed.xml')

    // Atom形式でフィードを生成
    const atomFeed = feed.atom1()

    // ファイルに書き込み
    await fs.writeFile(outputFile, atomFeed, 'utf-8')

    console.log(`✅ Atom フィードを保存しました: ${outputFile}`)
    console.log(`   - 記事数: ${allPosts.length}`)
    console.log(`   - 生成日時: ${new Date().toISOString()}`)
    console.log(`   - アクセスURL: ${FEED_CONFIG.link}feed.xml`)
  } catch (error) {
    console.error('❌ フィード生成中にエラーが発生しました:', error)
    process.exit(1)
  }
}

/**
 * フィード統計情報を出力
 */
export const logFeedStats = async (): Promise<void> => {
  try {
    const feedFile = join(process.cwd(), 'public', 'feed.xml')
    const feedContent = await fs.readFile(feedFile, 'utf-8')

    // 簡易的な統計情報
    const entryCount = (feedContent.match(/<entry>/g) || []).length
    const lastUpdated = feedContent.match(/<updated>(.*?)<\/updated>/)?.[1] || 'Unknown'

    console.log('📊 フィード統計:')
    console.log(`   - エントリー数: ${entryCount}`)
    console.log(`   - 最終更新: ${lastUpdated}`)
  } catch (_error) {
    console.log('📊 フィードファイルが存在しません')
  }
}

// スクリプト実行
generateFeed().catch((error) => {
  console.error('❌ スクリプト実行中にエラーが発生しました:', error)
  process.exit(1)
})
