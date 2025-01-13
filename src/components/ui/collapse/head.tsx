import { type ReactNode } from 'react'
import { ExpandIcon } from '../expand-icon'

interface CollapseHeadProps {
  collapsed: boolean
  title: string | ReactNode
  onCollapse(): void
}

export function CollapseHead({ title, collapsed, onCollapse }: CollapseHeadProps) {
  return (
    <div
      onClick={onCollapse}
      className="flex cursor-pointer select-none items-center justify-between px-2.5 py-2 font-medium"
    >
      <span>{title}</span>
      <div className="ml-auto">
        <ExpandIcon expanded={collapsed} />
      </div>
    </div>
  )
}
