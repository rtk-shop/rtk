import { type ReactNode } from 'react'
import { cva } from 'cva'

const msg = cva('h-6 select-none pl-2.5 text-[13px] font-medium leading-none text-red-600', {
  variants: {
    show: {
      true: 'duration-300 animate-in fade-in'
    }
  }
})

export function ErrorMessage({ show, children }: { show: boolean; children: ReactNode }) {
  return <p className={msg({ show })}>{children}</p>
}
