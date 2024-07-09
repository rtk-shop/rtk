import React, { useState, useEffect, useCallback } from 'react'
import { Header } from '../header'
import { Footer } from '../footer'
// import { Sidebar } from '@/components/Sidebar'
// import { Cart } from '../Cart'
import { useCartStore } from '@/store/cart'
import { useFavoriteStore } from '@/store/favorite'
import { useUiStore } from '@/store/ui'
import { useUserStore } from '@/store/user'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [isCartOpen, setCartOpen] = useState(false)

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
      {/* <Sidebar isOpen={isSidebarOpen} onClose={handleCloseDrawer} /> */}
      {/* <Cart isOpen={isCartOpen} onClose={handleCartClose} /> */}
      <Header onCartOpen={handleCartOpen} onDrawerOpen={handleOpenDrawer} />
      <main>{children}</main>
      <Footer />
    </>
  )
}
