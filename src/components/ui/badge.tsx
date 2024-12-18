import { ReactNode } from 'react'
import { cva } from 'cva'

interface BadgeProps {
  max?: number
  children: ReactNode
  content?: string | number
  className?: string
  dotClassName?: string
}

const container = cva('relative inline-flex align-middle')

const dot = cva(
  'absolute right-0 top-0 z-10 flex size-5 origin-center flex-row flex-wrap content-center items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-medium leading-none text-white transition-transform',
  {
    variants: {
      intent: {
        in: ['scale-100', 'translate-x-2/4', '-translate-y-2/4'],
        out: ['scale-0', 'translate-x-2/4', '-translate-y-2/4']
      }
    }
  }
)

export function Badge({ children, content, max = 100, className, dotClassName }: BadgeProps) {
  let show = ''

  if (typeof content === 'number') {
    show = String(content)
    if (content > max) {
      show = max + '+'
    }
  } else {
    show = content || ''
    if (show.length > max) {
      show = max + '+'
    }
  }

  return (
    <div className={container({ className })}>
      {children}
      <span className={dot({ intent: content ? 'in' : 'out', className: dotClassName })}>
        {show}
      </span>
    </div>
  )
}
