import { type ReactNode } from 'react'
import { cva } from 'cva'
import { useElementSize } from '@/hooks'

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

export function DynamicExpander({ open, children }: { open: boolean; children: ReactNode }) {
  const [animatedRef, animatedEl] = useElementSize()

  return (
    <div className={container({ open })} style={{ height: open ? animatedEl.height : 0 }}>
      <div ref={animatedRef}>{children}</div>
    </div>
  )
}
