import { type ReactNode } from 'react'
import { cva } from 'cva'

const container = cva('grid transition-all duration-300 ease-out', {
  variants: {
    expanded: {
      true: 'grid-rows-[1fr]',
      false: 'grid-rows-[0fr]'
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
