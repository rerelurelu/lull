# Next.js View Transition 実装ガイド

## 概要

Next.js 15で導入されたView Transition機能の実装方法と注意点をまとめたドキュメントです。
ページ遷移時にスムーズなアニメーションを実現できます。

## 前提条件

- Next.js 15.0以降
- `next.config.ts`で`viewTransition: true`が設定済み

```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    viewTransition: true,
  },
}
```

## 基本実装

### 1. 基本的なView Transition

```typescript
'use client'

import { unstable_ViewTransition as ViewTransition } from 'react'

export function PostCard({ title, postId, href }) {
  return (
    <ViewTransition name={`post-title-${postId}`}>
      <Link href={href}>
        {title}
      </Link>
    </ViewTransition>
  )
}
```

### 2. 遷移先での対応

```typescript
// 記事詳細ページ
export default function PostDetail({ postId, title }) {
  return (
    <ViewTransition name={`post-title-${postId}`}>
      <h1>{title}</h1>
    </ViewTransition>
  )
}
```

## 実装パターン

### パターン1: 要素の継続遷移

同じ要素が異なるページ間で継続して表示される場合に使用

```typescript
// 記事一覧ページ
<ViewTransition name={`post-title-${postId}`}>
  <Link href={`/post/${postId}`}>
    {title}
  </Link>
</ViewTransition>

// 記事詳細ページ
<ViewTransition name={`post-title-${postId}`}>
  <h1>{title}</h1>
</ViewTransition>
```

### パターン2: カード全体の遷移

```typescript
// PostCard全体をView Transitionで包む
<ViewTransition name={`post-card-${postId}`}>
  <div className="post-card">
    <ViewTransition name={`post-title-${postId}`}>
      <Link href={href}>{title}</Link>
    </ViewTransition>

    <ViewTransition name={`post-date-${postId}`}>
      <time dateTime={createdAt}>{dateText}</time>
    </ViewTransition>
  </div>
</ViewTransition>
```

### パターン3: 複数要素の組み合わせ

```typescript
// 複数の要素を個別に遷移
<div className="post-card">
  <ViewTransition name={`post-image-${postId}`}>
    <img src={imageUrl} alt={title} />
  </ViewTransition>

  <ViewTransition name={`post-title-${postId}`}>
    <Link href={href}>{title}</Link>
  </ViewTransition>

  <ViewTransition name={`post-meta-${postId}`}>
    <div className="post-meta">
      <time>{createdAt}</time>
      <span>{category}</span>
    </div>
  </ViewTransition>
</div>
```

## ブラウザナビゲーション対応

### ViewTransitionHandlerコンポーネント

ブラウザのback/forwardボタンでもView Transitionを動作させるために必要

```typescript
'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, use } from 'react'

export function ViewTransitionHandler() {
  const pathname = usePathname()
  const [currentViewTransition, setCurrentViewTransition] = useState<[Promise<void>, () => void] | null>(null)
  const transitionRef = useRef<[Promise<void>, () => void] | null>(null)

  // useフックでレンダリングをブロック
  if (currentViewTransition) {
    use(currentViewTransition[0])
  }

  useEffect(() => {
    if (!('startViewTransition' in document)) {
      return
    }

    const onPopState = () => {
      let pendingViewTransitionResolve = () => {}
      const pendingViewTransition = new Promise<void>((resolve) => {
        pendingViewTransitionResolve = resolve
      })

      let pendingStartViewTransitionResolve = () => {}
      const pendingStartViewTransition = new Promise<void>((resolve) => {
        pendingStartViewTransitionResolve = resolve
      })

      // View Transitionを開始
      // @ts-ignore
      document.startViewTransition(() => {
        // View Transitionが開始されたことを知らせる
        pendingStartViewTransitionResolve()
        return pendingViewTransition
      })

      const transitionState: [Promise<void>, () => void] = [
        pendingStartViewTransition,
        pendingViewTransitionResolve
      ]
      transitionRef.current = transitionState
      setCurrentViewTransition(transitionState)
    }

    window.addEventListener('popstate', onPopState)

    return () => {
      window.removeEventListener('popstate', onPopState)
    }
  }, [])

  useEffect(() => {
    if (transitionRef.current) {
      transitionRef.current[1]()
      transitionRef.current = null
      setCurrentViewTransition(null)
    }
  }, [pathname])

  return null
}
```

### layout.tsxでの統合

```typescript
// app/layout.tsx
import { ViewTransitionHandler } from '@/components/features'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ViewTransitionHandler />
      </body>
    </html>
  )
}
```

## 実装時の注意点

### ❌ よくある間違い

#### 1. ViewTransitionコンポーネントの配置

```typescript
// ❌ 間違い：要素の内側に配置
<Link href={href}>
  <ViewTransition name={`post-title-${postId}`}>
    {title}
  </ViewTransition>
</Link>

// ✅ 正解：要素全体を包む
<ViewTransition name={`post-title-${postId}`}>
  <Link href={href}>
    {title}
  </Link>
</ViewTransition>
```

#### 2. Server Componentでの使用

```typescript
// ❌ 間違い：Server Componentで使用
export default function PostCard() {
  return (
    <ViewTransition name="post-title">
      <div>Title</div>
    </ViewTransition>
  )
}

// ✅ 正解：Client Componentで使用
'use client'

export default function PostCard() {
  return (
    <ViewTransition name="post-title">
      <div>Title</div>
    </ViewTransition>
  )
}
```

#### 3. 同じnameの重複

```typescript
// ❌ 間違い：同じnameを複数の要素で使用
<ViewTransition name="post-title">
  <div>Title 1</div>
</ViewTransition>
<ViewTransition name="post-title">
  <div>Title 2</div>
</ViewTransition>

// ✅ 正解：ユニークなnameを使用
<ViewTransition name={`post-title-${post1.id}`}>
  <div>Title 1</div>
</ViewTransition>
<ViewTransition name={`post-title-${post2.id}`}>
  <div>Title 2</div>
</ViewTransition>
```

### ✅ 実装時のベストプラクティス

#### 1. 命名規則

```typescript
// 一貫した命名規則を使用
`post-title-${postId}`
`post-card-${postId}`
`post-image-${postId}`
`post-date-${postId}`
`user-avatar-${userId}`
```

#### 2. Client Componentの最小化

```typescript
// ViewTransitionが必要な部分のみClient Component化
'use client'

function PostTitle({ title, postId, href }) {
  return (
    <ViewTransition name={`post-title-${postId}`}>
      <Link href={href}>{title}</Link>
    </ViewTransition>
  )
}

// 親コンポーネントはServer Componentのまま
export default function PostCard({ post }) {
  return (
    <div className="post-card">
      <PostTitle title={post.title} postId={post.id} href={`/post/${post.id}`} />
      <p>{post.excerpt}</p>
    </div>
  )
}
```

#### 3. 型安全性の確保

```typescript
type ViewTransitionProps = {
  name: string
  children: React.ReactNode
}

function SafeViewTransition({ name, children }: ViewTransitionProps) {
  return (
    <ViewTransition name={name}>
      {children}
    </ViewTransition>
  )
}
```

#### 4. 条件付きレンダリング

```typescript
function PostCard({ post, enableTransition = true }) {
  const content = <Link href={`/post/${post.id}`}>{post.title}</Link>

  if (enableTransition) {
    return (
      <ViewTransition name={`post-title-${post.id}`}>
        {content}
      </ViewTransition>
    )
  }

  return content
}
```

## デバッグ方法

### 1. ブラウザサポートの確認

```typescript
useEffect(() => {
  if ('startViewTransition' in document) {
    console.log('View Transitions supported')
  } else {
    console.log('View Transitions not supported')
  }
}, [])
```

### 2. View Transitionの動作確認

```typescript
// Chrome DevToolsのConsoleで確認
document.startViewTransition(() => {
  console.log('View Transition started')
})
```

### 3. nameの重複チェック

```typescript
// 開発環境でのみ動作するチェック
if (process.env.NODE_ENV === 'development') {
  const usedNames = new Set()

  function checkDuplicateName(name: string) {
    if (usedNames.has(name)) {
      console.warn(`Duplicate ViewTransition name: ${name}`)
    }
    usedNames.add(name)
  }
}
```

## パフォーマンス最適化

### 1. 不要なView Transitionの回避

```typescript
// 同一ページ内の要素には使用しない
// 異なるページ間での遷移にのみ使用
```

### 2. アニメーション対象の最小化

```typescript
// 必要最小限の要素にのみ適用
// 大きな要素全体ではなく、重要な部分のみ
```

### 3. Suspenseとの組み合わせ

```typescript
<Suspense fallback={<Loading />}>
  <ViewTransition name={`content-${id}`}>
    <AsyncComponent />
  </ViewTransition>
</Suspense>
```

## トラブルシューティング

### 問題1: アニメーションが動作しない

**原因**: ViewTransitionコンポーネントの配置が間違っている
**解決**: 要素全体をViewTransitionで包む

### 問題2: ブラウザback/forwardで動作しない

**原因**: ViewTransitionHandlerが実装されていない
**解決**: layout.tsxにViewTransitionHandlerを追加

### 問題3: TypeScriptエラー

**原因**: 変数の初期化が不十分
**解決**: Promise resolverに初期値を設定

```typescript
let pendingViewTransitionResolve = () => {}
```

### 問題4: CSSエラー

**原因**: View TransitionのCSS疑似要素構文
**解決**: カスタムCSSは基本的に不要（デフォルトアニメーションを使用）

## まとめ

- ViewTransitionは要素全体を包むように配置
- Client Componentでのみ使用可能
- ユニークなname属性を使用
- ブラウザナビゲーション対応にはViewTransitionHandlerが必要
- デフォルトアニメーションで十分美しい遷移が実現可能

## 参考資料

- [Next.js View Transitions Documentation](https://nextjs.org/docs/app/api-reference/next-config-js/viewTransition)
- [Web API View Transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
- [shuding/next-view-transitions](https://github.com/shuding/next-view-transitions)
