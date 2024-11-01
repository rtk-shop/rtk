import { useEffect, ReactNode } from 'react'

interface AppLayoutProps {
  children: ReactNode
  currency?: number
}

export function AppLayout({ children }: AppLayoutProps) {
  return <main>{children}</main>
}
