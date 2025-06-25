'use client'

import type { FC } from 'react'
import { useEffect } from 'react'

type Props = {
  children: React.ReactNode
}

export const PostContainerClient: FC<Props> = ({ children }) => {
  useEffect(() => {
    const addCopyButtons = () => {
      const codeBlocks = document.querySelectorAll('pre code')

      for (const codeBlock of codeBlocks) {
        const pre = codeBlock.parentElement
        if (!pre || pre.parentElement?.querySelector('.copy-button-wrapper')) continue

        // ラッパーを作成
        const wrapper = document.createElement('div')
        wrapper.className = 'copy-button-wrapper'
        wrapper.style.cssText = `
          position: relative;
        `

        // コピーボタンを作成
        const button = document.createElement('button')
        button.className = 'copy-button'
        button.setAttribute('aria-label', 'コードをコピー')
        button.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <title>コピー</title>
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" stroke-width="2" fill="none"/>
            <path d="m5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="2" fill="none"/>
          </svg>
        `

        // ボタンのスタイルを適用
        button.style.cssText = `
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border-radius: 0.25rem;
          border: none;
          background: rgba(255, 255, 255, 0.1);
          color: currentColor;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 10;
          opacity: 0;
          pointer-events: none;
        `

        // preをラッパーで包む
        pre.parentNode?.insertBefore(wrapper, pre)
        wrapper.appendChild(pre)

        // レスポンシブ対応
        const isLargeScreen = () => window.matchMedia('(min-width: 1024px)').matches

        // ホバーイベント（lg以上）
        const handleMouseEnter = () => {
          if (isLargeScreen()) {
            button.style.opacity = '1'
            button.style.pointerEvents = 'auto'
          }
        }

        const handleMouseLeave = () => {
          if (isLargeScreen()) {
            button.style.opacity = '0'
            button.style.pointerEvents = 'none'
          }
        }

        // クリックイベント（lg未満）
        const handleWrapperClick = (e: Event) => {
          if (!isLargeScreen() && e.target === wrapper) {
            const isVisible = button.style.opacity === '1'
            button.style.opacity = isVisible ? '0' : '1'
            button.style.pointerEvents = isVisible ? 'none' : 'auto'
          }
        }

        // コピー機能
        const handleCopy = async () => {
          const code = codeBlock.textContent || ''
          try {
            await navigator.clipboard.writeText(code)
            // コピー成功時の視覚的フィードバック
            button.innerHTML = `
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <title>コピー完了</title>
                <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            `
            setTimeout(() => {
              button.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <title>コピー</title>
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" stroke-width="2" fill="none"/>
                  <path d="m5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
              `
            }, 2000)
          } catch {
            // フォールバック
            const textArea = document.createElement('textarea')
            textArea.value = code
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand('copy')
            document.body.removeChild(textArea)
          }
        }

        // イベントリスナーを追加
        wrapper.addEventListener('mouseenter', handleMouseEnter)
        wrapper.addEventListener('mouseleave', handleMouseLeave)
        wrapper.addEventListener('click', handleWrapperClick)
        button.addEventListener('click', handleCopy)

        // ホバー効果
        button.addEventListener('mouseenter', () => {
          button.style.background = 'rgba(255, 255, 255, 0.2)'
          button.style.transform = 'scale(1.05)'
        })
        button.addEventListener('mouseleave', () => {
          button.style.background = 'rgba(255, 255, 255, 0.1)'
          button.style.transform = 'scale(1)'
        })

        wrapper.appendChild(button)
      }
    }

    // DOMが完全に読み込まれた後に実行
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', addCopyButtons)
    } else {
      addCopyButtons()
    }

    // クリーンアップ
    return () => {
      document.removeEventListener('DOMContentLoaded', addCopyButtons)
    }
  }, [])

  return <>{children}</>
}
