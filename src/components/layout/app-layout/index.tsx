import { useEffect, ReactNode } from 'react'
import { useCartStore } from '@/store/cart'
import { useUiStore } from '@/store/ui'
import { useUserStore } from '@/store/user'

interface AppLayoutProps {
  children: ReactNode
  currency?: number
}

export function AppLayout({ children }: AppLayoutProps) {
  useEffect(() => {
    useCartStore.persist.rehydrate()
    useUiStore.persist.rehydrate()
    useUserStore.persist.rehydrate()
  }, [])

  return <main>{children}</main>
}
