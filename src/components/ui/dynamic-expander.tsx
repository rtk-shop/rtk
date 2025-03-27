import { type ReactNode } from 'react'
import { cva } from 'cva'
import { useElementSize } from '@/hooks'

const container = cva(
  'transition-expand duration-expand delay-expand h-0 overflow-hidden will-change-[height]',
  {
    variants: {
      open: {
        true: '',
        false: ''
      },
      withOpacity: {
        true: '',
        false: ''
      }
    },
    compoundVariants: [
      {
        open: true,
        withOpacity: true,
        className: 'opacity-100'
      },
      {
        open: false,
        withOpacity: true,
        className: 'opacity-0'
      }
    ]
  }
)

export function DynamicExpander({
  open,
  children,
  withOpacity = false
}: {
  open: boolean
  children: ReactNode
  withOpacity?: boolean
}) {
  const [animatedRef, animatedEl] = useElementSize()

  return (
    <div
      className={container({ open, withOpacity })}
      style={{ height: open ? animatedEl.height : 0 }}
    >
      <div ref={animatedRef}>{children}</div>
    </div>
  )
}
