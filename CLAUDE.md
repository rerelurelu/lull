Always respond in Japanese.

# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリでコードを扱う際のガイダンスを提供します。

## プロジェクト概要

このプロジェクトは、Next.js 15（App Router）とReact 19で構築された個人的なポートフォリオ/ブログサイトです。ブログ記事、プロジェクト、技術コンテンツを紹介する開発者のショーケースとして機能し、日本語コンテンツに重点を置いています。

## 開発コマンド

```bash
# 開発
bun run dev                # Turboモードで開発サーバーを起動
bun run build              # 本番環境用ビルド
bun run start              # 本番サーバーを起動

# コード品質
bun run lint               # Next.jsリンティング
bun run fmt:check          # Biomeでコードフォーマット
bun run test               # Vitestでテスト実行

# セットアップ
bun run prepare            # Panda CSS生成（自動実行）
```

# 技術スタック
- 技術スタックは `package.json` や `bun.lockb` を参照してください
- Next.jsではApp Routerを採用しています

## アーキテクチャ

### ディレクトリ構造
```
src/
├── app/                   # Next.js App Routerページ
│   ├── layout.tsx        # ルートレイアウト（Header/Footer）
│   ├── page.tsx          # ホームページ（Heroセクション付き）
│   ├── about/            # Aboutページ
│   ├── post/[postId]/    # 動的記事ページ
│   └── posts/[page]/     # ページネーション付き記事一覧
├── components/
│   ├── features/         # ドメイン固有コンポーネント
│   ├── layout/           # レイアウトコンポーネント（header/footer）
│   └── ui/               # 再利用可能UIコンポーネント
├── services/             # ビジネスロジックとデータ取得
├── libs/                 # 外部サービスクライアント（microCMS）
├── types/                # TypeScript型定義
├── utils/                # ユーティリティ関数
└── hooks/                # カスタムReactフック
```

### コンポーネントパターン
- デフォルトでServer Components、必要な場合のみ `'use client'` を使用
- 既存パターンに従う: features > layout > ui コンポーネント階層
- `interface` より `type` 定義を使用（コーディングガイドライン準拠）
- すべてのコンポーネントは関数型コンポーネント

### スタイリングシステム
- **Panda CSS** とデザイントークンによる一貫したテーマ設定
- 紫/青のグラデーションパレットを使用したダークテーマ
- モバイルファーストのレスポンシブデザイン
- コンポーネントバリアント用のカスタムレシピ

### コンテンツ管理
- ブログ記事と動的コンテンツに **microCMS** を使用
- Server Componentsでのサーバーサイドデータ取得
- 記事メタデータにはタグ、タイトル、リッチHTMLコンテンツを含む

## 主要設定ファイル

- `panda.config.ts` - カスタムテーマトークンを含むスタイリングシステム設定
- `biome.json` - コードフォーマットとリンティングルール
- `next.config.ts` - 実験的PPRが有効なNext.js設定
- `lefthook.yml` - コード品質管理用gitフック

## 必要な環境変数

```bash
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
MICROCMS_ENDPOINT=your-endpoint
```

## コードスタイルガイドライン

- strictモードを有効にしたTypeScriptを使用
- 型定義では `interface` より `type` を優先
- Biomeフォーマットルールに従う（シングルクォート、末尾カンマ、100文字行幅）
- try/catchブロックで適切なエラーハンドリングを実装
- デフォルトでServer Components、必要な場合のみClient Components
- 既存の命名規則とファイル構成パターンに従う
- `.cursor/rules/coding.mdc` の包括的なコーディングガイドラインに従う

## 重要な注意事項

- サイトは実験的なNext.js機能（PPR - Partial Prerendering）を使用
- スタイリングでは任意の値ではなくPanda CSSデザイントークンを使用
- すべてのテキストコンテンツは日本語をサポート
- Core Web Vitals最適化を優先したパフォーマンス重視
