'use client'

import { type ReactNode, useCallback, useState } from 'react'
// import { routeNames } from '@/lib/constants'
import { Navigation } from '@/components/layout/navigation'
import { Cart } from '@/components/layout/cart'
import { Sidebar } from '@/components/layout/sidebar'

// const noNavbarPaths = [routeNames.checkout] as string[]

export function BotLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [isCartOpen, setCartOpen] = useState(false)

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
    <div>
      <Cart isOpen={isCartOpen} onClose={handleCartClose} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseDrawer} />
      <Navigation onCartOpen={handleCartOpen} onSidebarOpen={handleOpenDrawer} />
      {children}
    </div>
  )
}
