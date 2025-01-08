import { type ReactNode } from 'react'
import { cva } from 'cva'

const container = cva('grid transition-all duration-300 ease-out', {
  variants: {
    expanded: {
      true: 'grid-rows-height-open',
      false: 'grid-rows-height-closed'
    }
  }
})

export function HeightExpander({ expanded, children }: { expanded: boolean; children: ReactNode }) {
  return (
    <div className={container({ expanded })}>
      <div className="overflow-hidden">{children}</div>
    </div>
  )
}
