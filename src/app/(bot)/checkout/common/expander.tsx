import { type ReactNode } from 'react'
import { cva } from 'cva'

interface ExpanderProps {
  open: boolean
  openHeightPx: number
  children: ReactNode
}

const container = cva(
  'transition-expand duration-expand delay-expand h-0 overflow-hidden will-change-[height]',
  {
    variants: {
      open: {
        true: 'opacity-100',
        false: 'opacity-0'
      }
    }
  }
)

export function Expander({ open, openHeightPx, children }: ExpanderProps) {
  return (
    <div className={container({ open })} style={{ height: open ? openHeightPx : 0 }}>
      {children}
    </div>
  )
}
