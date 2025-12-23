import { type ReactNode } from 'react'
import { cva } from 'cva'

const container = cva(
  'transition-expand-grid delay-expand-grid duration-expand-grid grid ease-out',
  {
    variants: {
      expanded: {
        true: 'grid-rows-height-open',
        false: 'grid-rows-height-closed'
      },
      withOpacity: {
        true: '',
        false: ''
      }
    },
    compoundVariants: [
      {
        expanded: true,
        withOpacity: true,
        className: 'opacity-100'
      },
      {
        expanded: false,
        withOpacity: true,
        className: 'opacity-0'
      }
    ]
  }
)

export function HeightExpander({
  expanded,
  children,
  withOpacity = false
}: {
  expanded: boolean
  children: ReactNode
  withOpacity?: boolean
}) {
  return (
    <div className={container({ expanded, withOpacity })}>
      <div className="overflow-hidden">{children}</div>
    </div>
  )
}
