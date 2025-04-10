import { type ReactNode } from 'react'
import { cva } from 'cva'

const msg = cva('h-6 select-none pl-2.5 text-[13px] font-medium leading-none text-red-600', {
  variants: {
    show: {
      true: 'visible duration-300 animate-in fade-in',
      false: 'invisible'
    },
    align: {
      start: 'text-start',
      center: 'text-center',
      end: 'text-end'
    }
  }
})

export function ErrorMessage({
  show,
  align = 'start',
  children
}: {
  show: boolean
  align?: 'start' | 'center' | 'end'
  children: ReactNode
}) {
  return <p className={msg({ show, align })}>{children}</p>
}
