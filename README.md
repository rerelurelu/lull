# lull

[![Chromatic](https://img.shields.io/badge/Storybook-Chromatic-FF4785?logo=storybook)](https://69538c3b7926d3395590d0a1-yurlcdsdav.chromatic.com/)

Next.js 15 (App Router) + React 19で構築された個人ブログサイト

## 技術スタック

- **Framework**: Next.js 16, React 19
- **Styling**: Panda CSS
- **CMS**: microCMS
- **Component Development**: Storybook 10
- **Package Manager**: Bun

## 開発

```bash
# 依存関係のインストール
bun install

# 開発サーバー起動
bun run dev

# Storybook起動
bun run storybook

# ビルド
bun run build

# テスト実行
bun run test

# フォーマットチェック
bun run fmt:check
```

## Storybook

コンポーネントカタログは[Chromatic](https://69538c3b7926d3395590d0a1-yurlcdsdav.chromatic.com/)で公開されています。

ローカルで確認する場合:

```bash
bun run storybook
```

http://localhost:6006/ でStorybookが起動します。
