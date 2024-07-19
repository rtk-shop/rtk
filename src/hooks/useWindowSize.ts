import { useState, useLayoutEffect } from 'react'

/*
  TODO: In mobile Chrome, it fires when autofilling fields
*/

export const useWindowSize = (): [number, number] => {
  const [dimensions, setDimensions] = useState<[number, number]>([0, 0])

  useLayoutEffect(() => {
    function updateSize() {
      const vh = (window.innerHeight * 0.01).toFixed(2)
      document.documentElement.style.setProperty('--vh', `${vh}px`)
      setDimensions([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return dimensions
}
