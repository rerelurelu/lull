'use client'

import { useEffect } from 'react'

// bfcache 復元時は CSS animation が finished のままになるので、明示的に再生し直す
export const RevealReplay = () => {
  useEffect(() => {
    const replay = () => {
      const targets = document.querySelectorAll<HTMLElement>('[data-reveal]')
      for (const el of targets) {
        const animations = el.getAnimations()
        for (const anim of animations) {
          anim.cancel()
          anim.play()
        }
      }
    }

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        replay()
      }
    }

    window.addEventListener('pageshow', handlePageShow)
    return () => window.removeEventListener('pageshow', handlePageShow)
  }, [])

  return null
}
