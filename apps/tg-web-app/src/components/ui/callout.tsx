import { type ReactNode } from 'react'
import { Icon } from '@/components/ui/icon'
import { cva } from 'cva'

export interface CalloutProps {
  type: 'info' | 'warn'
  children: ReactNode
}

const contaier = cva('flex rounded-lg px-2.5 py-3', {
  variants: {
    type: {
      info: 'bg-green-lime/30',
      warn: 'bg-amber-200'
    }
  }
})

const icons = {
  info: 'action/circle-info',
  warn: 'action/warning'
} as const

export function Callout({ type, children }: CalloutProps) {
  return (
    <div className={contaier({ type })}>
      <div className="shrink-0 basis-[10%]">
        <Icon name={icons[type]} className="text-2xl" />
      </div>
      <div>{children}</div>
    </div>
  )
}
