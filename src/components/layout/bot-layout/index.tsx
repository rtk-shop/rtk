'use client'

import { type ReactNode, useCallback, useEffect, useState } from 'react'
import { Navigation } from '@/components/layout/navigation'
import { Cart } from '@/components/layout/cart'
import { Sidebar } from '@/components/layout/sidebar'
import { useCartStore } from '@/providers/cart-store-provider'

export function BotLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [isCartOpen, setCartOpen] = useState(false)

  const [_, storeApi] = useCartStore((state) => state)

  // INFO: I'll keep persistent client state
  // until it get implemented on back-end
  useEffect(() => {
    storeApi.persist.rehydrate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <main>
      <Cart isOpen={isCartOpen} onClose={handleCartClose} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseDrawer} />
      <Navigation onCartOpen={handleCartOpen} onSidebarOpen={handleOpenDrawer} />
      {children}
    </main>
  )
}
