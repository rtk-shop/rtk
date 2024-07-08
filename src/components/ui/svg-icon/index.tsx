import { ReactNode } from 'react'
import clsx from 'clsx'

export function SvgIcon({ children, className }: { className?: string; children: ReactNode }) {
  return <div className={clsx('svg-icon', className)}>{children}</div>
}
