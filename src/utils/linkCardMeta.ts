// OGP メタデータの型定義
export type LinkMetadata = {
  href: string
  title?: string
  description?: string
  image?: string
  siteName?: string
  type?: string
}

// OGP取得の結果型
export type LinkMetadataResult = {
  success: boolean
  metadata?: LinkMetadata
  error?: string
}

/**
 * 指定されたURLからOGPメタデータを取得
 * ビルド時に実行される想定
 *
 * @param url - メタデータを取得するURL
 * @returns OGPメタデータまたはエラー情報
 */
export const fetchLinkMetadata = async (url: string): Promise<LinkMetadataResult> => {
  try {
    console.log(`🔍 OGP取得開始: ${url}`)

    // URL の妥当性チェック
    const urlObj = new URL(url)
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      throw new Error('サポートされていないプロトコルです')
    }

    // fetch でHTMLを取得（タイムアウト設定）
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10秒タイムアウト

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LinkCard Bot)',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ja,en-US;q=0.7,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate',
        'Cache-Control': 'no-cache',
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const html = await response.text()
    const metadata = parseHtmlForMetadata(html, url)

    console.log(`✅ OGP取得完了: ${metadata.title || 'タイトルなし'}`)

    return {
      success: true,
      metadata,
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error(`❌ OGP取得失敗: ${url} - ${errorMessage}`)

    // フォールバック用の基本情報を返す
    return {
      success: false,
      error: errorMessage,
      metadata: {
        href: url,
        title: extractTitleFromUrl(url),
        siteName: extractDomainFromUrl(url),
      },
    }
  }
}

/**
 * HTMLからOGPメタデータをパース
 *
 * @param html - 取得したHTMLコンテンツ
 * @param url - 元のURL（相対パス解決用）
 * @returns パースされたメタデータ
 */
const parseHtmlForMetadata = (html: string, url: string): LinkMetadata => {
  const metadata: LinkMetadata = { href: url }

  // HTMLから<head>部分を抽出
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)
  const headContent = headMatch ? headMatch[1] : html

  // OGPタグのパース（og:で始まるプロパティ）
  const ogTags = extractMetaTags(headContent, 'property', /^og:(.+)$/)
  metadata.title = ogTags['og:title']
  metadata.description = ogTags['og:description']
  metadata.image = resolveUrl(ogTags['og:image'], url)
  metadata.siteName = ogTags['og:site_name']
  metadata.type = ogTags['og:type']

  // Twitter Cardのパース（twitter:で始まるname）
  const twitterTags = extractMetaTags(headContent, 'name', /^twitter:(.+)$/)
  if (!metadata.title) metadata.title = twitterTags['twitter:title']
  if (!metadata.description) metadata.description = twitterTags['twitter:description']
  if (!metadata.image) metadata.image = resolveUrl(twitterTags['twitter:image'], url)

  // 通常のmetaタグからフォールバック
  const metaTags = extractMetaTags(headContent, 'name', /^(description|keywords)$/)
  if (!metadata.description) metadata.description = metaTags.description

  // より広範囲なdescription検索
  if (!metadata.description) {
    const descMatch =
      headContent.match(
        /<meta[^>]+name=["']description["'][^>]*content=["']([^"']*?)["'][^>]*>/i,
      ) ||
      headContent.match(/<meta[^>]+content=["']([^"']*?)["'][^>]*name=["']description["'][^>]*>/i)
    if (descMatch) {
      metadata.description = decodeHtmlEntities(descMatch[1].trim())
    }
  }

  // <title>タグからタイトルを取得
  if (!metadata.title) {
    const titleMatch = headContent.match(/<title[^>]*>(.*?)<\/title>/i)
    if (titleMatch) {
      metadata.title = decodeHtmlEntities(titleMatch[1].trim())
    }
  }

  // サイト名が設定されていない場合、URLからドメインを抽出
  if (!metadata.siteName) {
    metadata.siteName = extractDomainFromUrl(url)
  }

  // タイトルが設定されていない場合、URLから推測
  if (!metadata.title) {
    metadata.title = extractTitleFromUrl(url)
  }

  return metadata
}

/**
 * metaタグを抽出してオブジェクトに変換
 */
const extractMetaTags = (
  html: string,
  attrName: 'property' | 'name',
  pattern: RegExp,
): Record<string, string> => {
  const tags: Record<string, string> = {}

  // metaタグのパターンマッチング
  const metaRegex = new RegExp(
    `<meta[^>]+${attrName}=["']([^"']+)["'][^>]*content=["']([^"']*)["'][^>]*>|` +
      `<meta[^>]+content=["']([^"']*)["'][^>]*${attrName}=["']([^"']+)["'][^>]*>`,
    'gi',
  )

  let match: RegExpExecArray | null
  while ((match = metaRegex.exec(html)) !== null) {
    const propName = match[1] || match[4]
    const content = match[2] || match[3]

    if (propName && content && pattern.test(propName)) {
      tags[propName] = decodeHtmlEntities(content.trim())
    }
  }

  return tags
}

/**
 * 相対URLを絶対URLに解決
 */
const resolveUrl = (url: string | undefined, baseUrl: string): string | undefined => {
  if (!url) return undefined

  try {
    // すでに絶対URLの場合はそのまま返す
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url
    }

    // 相対URLを絶対URLに変換
    return new URL(url, baseUrl).href
  } catch {
    return undefined
  }
}

/**
 * HTMLエンティティをデコード
 */
const decodeHtmlEntities = (text: string): string => {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&#x27;': "'",
    '&apos;': "'",
  }

  return text.replace(/&[#\w]+;/g, (entity) => {
    return entities[entity] || entity
  })
}

/**
 * URLからドメイン名を抽出
 */
const extractDomainFromUrl = (url: string): string => {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return url
  }
}

/**
 * URLからタイトルを推測（最後のパスセグメントから）
 */
const extractTitleFromUrl = (url: string): string => {
  try {
    const urlObj = new URL(url)
    const pathname = urlObj.pathname

    // パスの最後のセグメントを取得
    const segments = pathname.split('/').filter(Boolean)
    const lastSegment = segments[segments.length - 1]

    if (lastSegment) {
      // ファイル拡張子を除去
      const title = lastSegment.replace(/\.[^.]+$/, '')
      // ハイフンやアンダースコアをスペースに変換
      return title.replace(/[-_]/g, ' ')
    }

    return urlObj.hostname.replace('www.', '')
  } catch {
    return url
  }
}

/**
 * 複数のURLからメタデータを並列取得
 *
 * @param urls - 取得対象のURL配列
 * @param concurrency - 並列数（デフォルト: 3）
 * @returns メタデータの配列
 */
export const fetchMultipleLinkMetadata = async (
  urls: string[],
  concurrency = 3,
): Promise<LinkMetadata[]> => {
  const results: LinkMetadata[] = []

  // URLを指定された並列数で分割して処理
  for (let i = 0; i < urls.length; i += concurrency) {
    const batch = urls.slice(i, i + concurrency)

    const batchResults = await Promise.all(
      batch.map(async (url) => {
        const result = await fetchLinkMetadata(url)
        return (
          result.metadata ?? {
            href: url,
            title: url,
            description: '',
            image: '',
            siteName: '',
            type: 'website',
          }
        )
      }),
    )

    results.push(...batchResults)

    // 次のバッチ処理前に少し待機（レート制限対策）
    if (i + concurrency < urls.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }

  return results
}

/**
 * デバッグ用: メタデータの内容をログ出力
 */
export const logLinkMetadata = (metadata: LinkMetadata[]): void => {
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 取得されたメタデータ:')
    metadata.forEach((meta, index) => {
      console.log(`  ${index + 1}. ${meta.title} (${meta.href})`)
      if (meta.description) {
        console.log(`     説明: ${meta.description.slice(0, 100)}...`)
      }
    })
  }
}
