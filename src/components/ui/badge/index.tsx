import { ReactNode } from 'react'
import { cva } from 'cva'

interface BadgeProps {
  max?: number
  color?: string
  children: ReactNode
  content?: string | number
  className?: string
  dotClassName?: string
}

const container = cva('inline-flex relative shrink-0 align-middle')

const dot = cva(
  'text-white size-5 flex z-10 px-1.5 absolute flex-wrap rounded-full items-center font-medium text-xs leading-none content-center justify-center top-0 right-0 flex-row origin-center transition-transform',
  {
    variants: {
      intent: {
        in: ['scale-100', 'translate-x-2/4', '-translate-y-2/4'],
        out: ['scale-0', 'translate-x-2/4', '-translate-y-2/4']
      }
    }
  }
)

export function Badge({
  children,
  content,
  color = '#ff2727',
  max = 100,
  className,
  dotClassName
}: BadgeProps) {
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
    <span className={container({ className })}>
      {children}
      <span
        className={dot({ intent: content ? 'in' : 'out', className: dotClassName })}
        style={{
          backgroundColor: color
        }}
      >
        {show}
      </span>
    </span>
  )
}
