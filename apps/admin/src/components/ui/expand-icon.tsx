import { cva } from 'cva'
import { ChevronUp } from 'lucide-react'

const expandIcon = cva('transition-all duration-300', {
  variants: {
    expanded: {
      true: 'rotate-0',
      false: 'rotate-180'
    }
  }
})

export function ExpandIcon({ size = 26, expanded }: { size?: number; expanded: boolean }) {
  return <ChevronUp strokeWidth={1.5} size={size} className={expandIcon({ expanded })} />
}
