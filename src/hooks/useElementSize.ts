import { useLayoutEffect, useState } from 'react'

type Size = {
  width: number
  height: number
}

export const useElementSize = <T extends HTMLElement = HTMLDivElement>(): [
  (node: T | null) => void,
  Size
] => {
  const [ref, setRef] = useState<T | null>(null)
  const [sizes, setSizes] = useState<Size>({
    width: 0,
    height: 0
  })

  useLayoutEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const { inlineSize, blockSize } = entries[0].borderBoxSize[0]

      setSizes({
        width: Math.round(inlineSize),
        height: Math.round(blockSize)
      })
    })

    if (ref) {
      observer.observe(ref)
    }

    return () => {
      observer.disconnect()
    }
  }, [ref])

  return [setRef, sizes]
}
