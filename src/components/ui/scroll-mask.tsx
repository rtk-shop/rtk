import { cva } from 'cva'
import { useRef, useState, type ReactNode } from 'react'

const container = cva('no-scrollbar overflow-x-auto', {
  variants: {
    showRightMask: {
      true: 'gradient-mask-r-10',
      false: ''
    },
    showLeftMask: {
      true: 'gradient-mask-l-70',
      false: ''
    }
  }
})

// DOCS: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft

export function ScrollMask({ children }: { children: ReactNode }) {
  const scrollDemoRef = useRef(null)

  const [scrollPosition, setScrollPosition] = useState({ scrollTop: 0, scrollLeft: 0 })

  const handleScroll = () => {
    if (scrollDemoRef.current) {
      const { scrollTop, scrollLeft } = scrollDemoRef.current
      setScrollPosition({ scrollTop, scrollLeft })
    }
  }

  return (
    <div
      ref={scrollDemoRef}
      className={container({
        showLeftMask: scrollPosition.scrollLeft > 0,
        showRightMask: scrollPosition.scrollLeft === 0
      })}
      onScroll={handleScroll}
    >
      {children}
    </div>
  )
}
