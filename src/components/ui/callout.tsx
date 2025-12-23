import { type ReactNode } from 'react'
import { Icon } from '@/components/ui/icon'
import { cva } from 'cva'

export interface CalloutProps {
  type: 'info' | 'warn'
  invariant?: boolean
  children: ReactNode
}

const contaier = cva('flex rounded-lg px-2.5 py-3', {
  variants: {
    type: {
      info: 'bg-green-lime/30',
      warn: 'bg-amber-200'
    },
    invariant: {
      true: '!bg-black text-white',
      false: ''
    }
  }
})

const icons = {
  info: 'action/circle-info',
  warn: 'action/warning'
} as const

export function Callout({ type, invariant, children }: CalloutProps) {
  return (
    <div className={contaier({ type, invariant })}>
      <div className="shrink-0 basis-[10%]">
        <Icon name={icons[type]} className="text-2xl" />
      </div>
      <div>{children}</div>
    </div>
  )
}
