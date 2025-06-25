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

        // CSSスタイルを動的に追加
        if (!document.getElementById('copy-button-styles')) {
          const style = document.createElement('style')
          style.id = 'copy-button-styles'
          style.textContent = `
            .copy-button {
              position: absolute !important;
              top: 0.5rem !important;
              right: 0.5rem !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              width: 2rem !important;
              height: 2rem !important;
              border-radius: 0.25rem !important;
              border: none !important;
              background: rgba(255, 255, 255, 0.1) !important;
              color: currentColor !important;
              cursor: pointer !important;
              transition: all 0.2s ease !important;
              z-index: 1000 !important;
              opacity: 0 !important;
              pointer-events: none !important;
            }
            .copy-button.visible {
              opacity: 1 !important;
              pointer-events: auto !important;
            }
          `
          document.head.appendChild(style)
        }

        // preをラッパーで包む
        pre.parentNode?.insertBefore(wrapper, pre)
        wrapper.appendChild(pre)

        // レスポンシブ対応
        const isLargeScreen = () => window.matchMedia('(min-width: 1024px)').matches

        // ホバーイベント（lg以上）
        const handleMouseEnter = () => {
          if (isLargeScreen()) {
            button.classList.add('visible')
          }
        }

        const handleMouseLeave = () => {
          if (isLargeScreen()) {
            button.classList.remove('visible')
          }
        }

        // クリックイベント（lg未満）
        const handleWrapperClick = (e: Event) => {
          if (!isLargeScreen()) {
            // ボタン自体のクリックは除外
            if (e.target === button || button.contains(e.target as Node)) {
              return
            }
            
            const isVisible = button.classList.contains('visible')
            if (isVisible) {
              button.classList.remove('visible')
            } else {
              button.classList.add('visible')
            }
            e.preventDefault()
            e.stopPropagation()
          }
        }

        // アイコンSVGを変数として定義
        const copyIcon = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <title>コピー</title>
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" stroke-width="2" fill="none"/>
            <path d="m5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="2" fill="none"/>
          </svg>
        `
        
        const checkIcon = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <title>コピー完了</title>
            <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `

        // コピー機能
        const handleCopy = async () => {
          const code = codeBlock.textContent || ''
          try {
            await navigator.clipboard.writeText(code)
            // コピー成功時の視覚的フィードバック
            button.innerHTML = ''
            button.insertAdjacentHTML('afterbegin', checkIcon)
            
            setTimeout(() => {
              button.innerHTML = ''
              button.insertAdjacentHTML('afterbegin', copyIcon)
            }, 2000)
          } catch {
            // フォールバック
            const textArea = document.createElement('textarea')
            textArea.value = code
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand('copy')
            document.body.removeChild(textArea)
            
            // フォールバック時も同様の視覚的フィードバック
            button.innerHTML = ''
            button.insertAdjacentHTML('afterbegin', checkIcon)
            
            setTimeout(() => {
              button.innerHTML = ''
              button.insertAdjacentHTML('afterbegin', copyIcon)
            }, 2000)
          }
        }

        // イベントリスナーを追加
        wrapper.addEventListener('mouseenter', handleMouseEnter)
        wrapper.addEventListener('mouseleave', handleMouseLeave)
        wrapper.addEventListener('click', handleWrapperClick)
        pre.addEventListener('click', handleWrapperClick)
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
