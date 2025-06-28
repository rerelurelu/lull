## 🎯 概要

microCMS から取得した記事コンテンツ内の `<p><a>URL</a></p>` パターンを自動検出し、OGP メタデータを事前取得してリンクカードとして表示する機能です。

## 🗂️ ファイル構成

```
src/
├── components/ui/link-card/
│   ├── LinkCard.tsx          # メインのリンクカードコンポーネント
│   └── index.ts              # エクスポート定義
├── libs/
│   ├── extractLinks.ts       # HTML パース・リンク抽出
│   └── linkCardMeta.ts       # OGP メタデータ取得
├── components/features/PostContainer/
│   └── PostContainerWithLinkCards.tsx  # 統合コンポーネント
scripts/
└── generateLinkMeta.ts       # ビルド時メタデータ生成
.generated/
└── link-meta.json           # 生成されたメタデータ（自動生成）
```

## 🚀 導入手順

### 1. 基本セットアップ

既存の PostContainer を新しいリンクカード対応版に置き換えます：

```tsx
// src/app/post/[postId]/page.tsx
import { PostContainerWithLinkCards } from '@/components/features/PostContainer'

export default async function PostPage({ params }: Props) {
  const post = await getPostById(params.postId)

  return (
    <main>
      <PostContainerWithLinkCards postContent={post.content} />
    </main>
  )
}
```

### 2. ビルドスクリプト設定

`package.json` にすでに追加済みのスクリプト：

```json
{
  "scripts": {
    "prebuild": "bun run generate:link-meta",
    "generate:link-meta": "bun run scripts/generateLinkMeta.ts",
    "link-meta:stats": "bun -e \"import('./scripts/generateLinkMeta.ts').then(m => m.logMetadataStats())\""
  }
}
```

### 3. 環境変数設定

microCMS の設定が必要です（既存の設定を利用）：

```bash
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
MICROCMS_ENDPOINT=your-endpoint
```

### 4. リンクカード動作確認

開発環境でテスト：

```bash
# メタデータ生成
bun run generate:link-meta

# 統計情報確認
bun run link-meta:stats

# 開発サーバー起動
bun run dev
```

## 🎨 カスタマイズ

### リンクカードスタイルの調整

`src/components/ui/link-card/LinkCard.tsx` の `cva` スタイルを編集：

```tsx
const linkCardStyles = cva({
  base: {
    // ここでスタイルをカスタマイズ
    borderRadius: '1rem',       // 角丸を変更
    boxShadow: 'custom-shadow', // カスタムシャドウ
    // ...
  },
})
```

### フォールバック画像の変更

サムネイルが取得できない場合のデザインを調整：

```tsx
const FallbackThumbnail: FC<{ siteName?: string }> = ({ siteName }) => {
  return (
    <div className={thumbnailContainerStyles()}>
      {/* カスタムアイコンやデザインを追加 */}
    </div>
  )
}
```

## 🔧 トラブルシューティング

### よくある問題

#### 1. メタデータが生成されない

**症状**: リンクカードが表示されない、またはフォールバック状態

**解決方法**:
```bash
# 1. 手動でメタデータ生成
bun run generate:link-meta

# 2. 生成されたファイルを確認
cat .generated/link-meta.json

# 3. 記事にリンクカード対象のリンクがあるか確認
# microCMS で <p><a href="URL">URL</a></p> 形式になっているか
```

#### 2. ビルド時にタイムアウトエラー

**症状**: OGP 取得時にネットワークタイムアウト

**解決方法**:
```tsx
// src/libs/linkCardMeta.ts の fetchLinkMetadata で調整
const timeoutId = setTimeout(() => controller.abort(), 15000) // 15秒に延長
```

#### 3. Vercel でビルドが失敗

**症状**: デプロイ時にメタデータ生成でエラー

**解決方法**:
```bash
# .generated ディレクトリを .gitignore に追加
echo ".generated/" >> .gitignore

# Vercel の環境変数設定を確認
# MICROCMS_* 変数が正しく設定されているか
```

## ⚡ パフォーマンス最適化

### 1. 並列取得数の調整

大量のリンクがある場合：

```tsx
// scripts/generateLinkMeta.ts
const linkMetadata = await fetchMultipleLinkMetadata(uniqueLinks, 5) // 並列数を5に増加
```

### 2. キャッシュ戦略

Vercel Edge Functions を活用：

```tsx
// next.config.ts に追加
export default {
  experimental: {
    ppr: true,
  },
  // ISR でメタデータを部分的に更新
  revalidate: 3600, // 1時間
}
```

### 3. 画像最適化

```tsx
// LinkCard.tsx で next/image の設定調整
<Image
  src={thumbnail}
  alt={title || 'サイトのサムネイル画像'}
  width={80}
  height={80}
  unoptimized={false} // Vercel の画像最適化を利用
  placeholder="blur"  // ぼかしプレースホルダー
  blurDataURL="data:image/..." // 小さなベース64画像
/>
```

## 🔄 運用フロー

### microCMS 記事更新時

1. **記事を更新** - microCMS 管理画面で記事を編集
2. **再ビルド** - Vercel で自動ビルドまたは手動ビルド
3. **メタデータ更新** - 新しいリンクのOGP情報を自動取得
4. **デプロイ** - 更新されたリンクカードで公開

### 新しいリンクの追加

```html
<!-- microCMS の記事内で以下の形式で記述 -->
<p><a href="https://example.com/article" target="_blank" rel="noopener noreferrer">https://example.com/article</a></p>
```

### メタデータの手動更新

```bash
# 特定のURLのメタデータを確認
bun run link-meta:stats

# 全体を再生成
bun run generate:link-meta
```

## 🔒 セキュリティ考慮事項

### CSP（Content Security Policy）設定

```tsx
// next.config.ts
const cspHeader = `
  img-src 'self' data: https: blob:;
  connect-src 'self' https:;
`
```

### XSS 対策

- HTML サニタイゼーション（rehype-sanitize 使用済み）
- URL バリデーション（URL コンストラクタで検証）
- 外部画像の unoptimized 指定

## 🌟 今後の拡張案

### Twitter Cards 対応強化

```tsx
// libs/linkCardMeta.ts に追加
const twitterMeta = extractTwitterCardData(html)
```

### キャッシュ層の追加

```tsx
// Redis や Upstash でメタデータキャッシュ
const cachedMeta = await redis.get(`link:${url}`)
```

### 動的リンクカード更新

```tsx
// ISR + Webhook でリアルタイム更新
export const revalidate = 3600 // 1時間キャッシュ
```
