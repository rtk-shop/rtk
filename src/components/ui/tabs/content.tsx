import { type ReactNode } from 'react'

export interface TabContentProps {
  tabID: number
  value: number
  children: ReactNode
}

export function TabContent({ tabID, value, children }: TabContentProps) {
  if (tabID !== value) {
    return null
  }
  return <div>{children}</div>
}
