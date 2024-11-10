import { useLayoutEffect, useState } from 'react'

export const useWindowSize = () => {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  })
  useLayoutEffect(() => {
    const updateSize = (): void => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('resize', updateSize)
    updateSize()

    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return {
    width: size.width,
    height: size.height,
  }
}
