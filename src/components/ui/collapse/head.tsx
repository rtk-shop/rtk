import { type ReactNode } from 'react'
import { cva } from 'cva'
import { Icon } from '../icon'

interface CollapseHeadProps {
  collapsed: boolean
  title: string | ReactNode
  onCollapse(): void
}

const expandIcon = cva('ml-auto text-[26px] transition-all duration-300', {
  variants: {
    collapsed: {
      true: 'rotate-0',
      false: 'rotate-180'
    }
  }
})

export function CollapseHead({ title, collapsed, onCollapse }: CollapseHeadProps) {
  return (
    <div
      onClick={onCollapse}
      className="flex cursor-pointer select-none items-center justify-between px-2.5 py-2 font-medium"
    >
      <span>{title}</span>
      <Icon name="common/arrow" className={expandIcon({ collapsed })} />
    </div>
  )
}
