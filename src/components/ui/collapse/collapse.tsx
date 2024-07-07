import React, { useEffect, useRef, useState } from 'react'

interface CollapseProps {
  open?: boolean
  children: React.ReactNode
}

export function Collapse({ open, children }: CollapseProps) {
  const [height, setHeight] = useState<number | undefined>(open ? undefined : 0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!height || !open || !ref.current) return undefined

    const resizeObserver = new ResizeObserver((el) => {
      setHeight(el[0].contentRect.height)
    })
    resizeObserver.observe(ref.current)
    return () => {
      resizeObserver.disconnect()
    }
  }, [height, open])

  useEffect(() => {
    if (open) setHeight(ref.current?.getBoundingClientRect().height)
    else setHeight(0)
  }, [open])

  return (
    <div>
      <div
        style={{
          overflow: 'hidden',
          transition: 'height 0.2s ease-in-out',
          height
        }}
      >
        <div ref={ref}>{children}</div>
      </div>
    </div>
  )
}
