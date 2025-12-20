'use client'

import type { FC } from 'react'
import { useEffect, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'

type Slide = {
  src: string
  alt?: string
}

type Props = {
  children: React.ReactNode
}

export const PostContainerClient: FC<Props> = ({ children }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [slides, setSlides] = useState<Slide[]>([])

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
              background: var(--colors-overlay-white-10) !important;
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
          button.style.background = 'var(--colors-overlay-white-20)'
          button.style.transform = 'scale(1.05)'
        })
        button.addEventListener('mouseleave', () => {
          button.style.background = 'var(--colors-overlay-white-10)'
          button.style.transform = 'scale(1)'
        })

        wrapper.appendChild(button)
      }
    }

    const initLightbox = () => {
      const images = document.querySelectorAll('figure img')
      const imageSlides: Slide[] = []
      const listeners: Array<{
        element: HTMLImageElement
        event: string
        handler: () => void
      }> = []

      for (const img of images) {
        const htmlImg = img as HTMLImageElement
        const src = htmlImg.getAttribute('src')
        const alt = htmlImg.getAttribute('alt')

        if (src) {
          const index = imageSlides.length
          imageSlides.push({ src, alt: alt || undefined })

          htmlImg.style.cursor = 'zoom-in'
          htmlImg.style.transition = 'opacity 0.2s ease'

          const handleClick = () => {
            setLightboxIndex(index)
            setLightboxOpen(true)
          }

          const handleMouseEnter = () => {
            htmlImg.style.opacity = '0.9'
          }

          const handleMouseLeave = () => {
            htmlImg.style.opacity = '1'
          }

          htmlImg.addEventListener('click', handleClick)
          htmlImg.addEventListener('mouseenter', handleMouseEnter)
          htmlImg.addEventListener('mouseleave', handleMouseLeave)

          // クリーンアップ用に保存
          listeners.push(
            { element: htmlImg, event: 'click', handler: handleClick },
            { element: htmlImg, event: 'mouseenter', handler: handleMouseEnter },
            { element: htmlImg, event: 'mouseleave', handler: handleMouseLeave },
          )
        }
      }

      setSlides(imageSlides)

      return () => {
        for (const { element, event, handler } of listeners) {
          element.removeEventListener(event, handler)
        }
      }
    }

    // DOMが完全に読み込まれた後に実行
    const handleDOMContentLoaded = () => {
      addCopyButtons()
      initLightbox()
    }

    let cleanupLightbox: (() => void) | undefined

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleDOMContentLoaded)
    } else {
      addCopyButtons()
      cleanupLightbox = initLightbox()
    }

    // クリーンアップ
    return () => {
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded)
      if (cleanupLightbox) {
        cleanupLightbox()
      }
    }
  }, [])

  return (
    <>
      {children}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        controller={{ closeOnBackdropClick: true }}
        plugins={[Zoom]}
        zoom={{ maxZoomPixelRatio: 3 }}
        carousel={{ padding: '5%' }}
        styles={{
          container: {
            backgroundColor: 'rgba(25, 28, 55, 0.8)',
          },
          toolbar: {
            position: 'absolute',
            top: 'auto',
            bottom: '16px',
            right: '16px',
            left: 'auto',
            padding: '8px 12px',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            borderRadius: '8px',
          },
        }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />
    </>
  )
}
