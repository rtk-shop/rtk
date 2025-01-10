import { cva } from 'cva'
import { useRef, useState, type ReactNode } from 'react'

const container = cva('no-scrollbar h-[inherit] overflow-auto', {
  variants: {
    showRightMask: {
      true: 'gradient-mask-r-10',
      false: ''
    },
    showLeftMask: {
      true: 'gradient-mask-l-70',
      false: ''
    },
    showBottomMask: {
      true: 'gradient-mask-b-60',
      false: ''
    }
  }
})

// DOCS: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft
//       https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop

export function ScrollMask({
  direction = 'horizontal',
  children
}: {
  direction?: 'vertical' | 'horizontal'
  children: ReactNode
}) {
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
        showLeftMask: direction === 'horizontal' && scrollPosition.scrollLeft > 0,
        showRightMask: direction === 'horizontal' && scrollPosition.scrollLeft === 0,
        showBottomMask: direction === 'vertical' && scrollPosition.scrollTop === 0
      })}
      onScroll={handleScroll}
    >
      {children}
    </div>
  )
}
