'use client'

import { usePathname } from 'next/navigation'
import { use, useEffect, useRef, useState } from 'react'

export function ViewTransitionHandler() {
  const pathname = usePathname()
  const currentPathname = useRef(pathname)

  // View Transitionの状態管理
  const [currentViewTransition, setCurrentViewTransition] = useState<
    | null
    | [
        // View Transitionが開始されるまで待つPromise
        Promise<void>,
        // View Transitionを完了させるResolver
        () => void,
      ]
  >(null)

  const transitionRef = useRef<[Promise<void>, () => void] | null>(null)

  useEffect(() => {
    // View Transitions APIがサポートされているかチェック
    if (!('startViewTransition' in document)) {
      return () => {}
    }

    const onPopState = () => {
      let pendingViewTransitionResolve: () => void = () => {}
      const pendingViewTransition = new Promise<void>((resolve) => {
        pendingViewTransitionResolve = resolve
      })

      let pendingStartViewTransitionResolve: () => void = () => {}
      const pendingStartViewTransition = new Promise<void>((resolve) => {
        pendingStartViewTransitionResolve = resolve
      })

      // View Transitionを開始
      document.startViewTransition(() => {
        // View Transitionが開始されたことを知らせる
        pendingStartViewTransitionResolve()
        return pendingViewTransition
      })

      const transitionState: [Promise<void>, () => void] = [
        pendingStartViewTransition,
        pendingViewTransitionResolve,
      ]
      transitionRef.current = transitionState
      setCurrentViewTransition(transitionState)
    }

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  // 新しいルートのレンダリングをブロック（View Transitionが開始されるまで）
  if (currentViewTransition && currentPathname.current !== pathname) {
    use(currentViewTransition[0])
  }

  // パスが変更されたらView Transitionを完了
  useEffect(() => {
    currentPathname.current = pathname
    if (transitionRef.current) {
      transitionRef.current[1]()
      transitionRef.current = null
      setCurrentViewTransition(null)
    }
  }, [pathname])

  // このコンポーネントは何もレンダリングしない
  return null
}
