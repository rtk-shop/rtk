import { useState, useEffect, useCallback, ReactNode } from 'react'
import { Header } from '../header'
import { Footer } from '../footer'
import { Sidebar } from '@/components/layout/sidebar'
import { Cart } from '../cart'
import { useCartStore } from '@/store/cart'
import { useFavoriteStore } from '@/store/favorite'
import { useUiStore } from '@/store/ui'
import { useUserStore } from '@/store/user'
import { useGlobalDataQuery } from '@/graphql/global/_gen_/globalData.query'

interface AppLayoutProps {
  children: ReactNode
  currency?: number
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [isCartOpen, setCartOpen] = useState(false)

  const { data, error } = useGlobalDataQuery()

  const currency = data?.globalData.usdCourse || 0

  if (error) {
    console.log(error.message)
  }

  useEffect(() => {
    useCartStore.persist.rehydrate()
    useFavoriteStore.persist.rehydrate()
    useUiStore.persist.rehydrate()
    useUserStore.persist.rehydrate()
  }, [])

  const handleOpenDrawer = useCallback(() => {
    setSidebarOpen(true)
  }, [])

  const handleCloseDrawer = useCallback(() => {
    setSidebarOpen(false)
  }, [])

  const handleCartOpen = useCallback(() => {
    setCartOpen(true)
  }, [])

  const handleCartClose = useCallback(() => {
    setCartOpen(false)
  }, [])

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} currency={currency} onClose={handleCloseDrawer} />
      <Cart isOpen={isCartOpen} currency={currency} onClose={handleCartClose} />
      <Header currency={currency} onCartOpen={handleCartOpen} onDrawerOpen={handleOpenDrawer} />
      <main>{children}</main>
      <Footer />
    </>
  )
}
