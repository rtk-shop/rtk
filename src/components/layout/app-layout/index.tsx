import { useEffect, ReactNode } from 'react'
import { useUiStore } from '@/store/ui'
import { useUserStore } from '@/store/user'

interface AppLayoutProps {
  children: ReactNode
  currency?: number
}

export function AppLayout({ children }: AppLayoutProps) {
  useEffect(() => {
    useUiStore.persist.rehydrate()
    useUserStore.persist.rehydrate()
  }, [])

  return <main>{children}</main>
}
