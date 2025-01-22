'use client'

import { type ReactNode, useCallback, useEffect, useState } from 'react'
import { routeNames } from '@/lib/constants'
import { Navigation } from '@/components/layout/navigation'
import { Cart } from '@/components/layout/cart'
import { Sidebar } from '@/components/layout/sidebar'
import { useCartStore } from '@/providers/cart-store-provider'
import { useFavoriteStore } from '@/providers/favorite-store-provider'
import { usePathname } from 'next/navigation'

export function BotLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [isCartOpen, setCartOpen] = useState(false)

  const [, storeApi] = useCartStore((state) => state)
  const [, favoriteApi] = useFavoriteStore((state) => state)

  const noNavbarPaths = [routeNames.root] as string[]

  const shouldShowNavbar = !noNavbarPaths.includes(pathname)

  // INFO: I'll keep persistent client state
  // until it get implemented on back-end
  useEffect(() => {
    storeApi.persist.rehydrate()
    favoriteApi.persist.rehydrate()
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
    <div>
      <Cart isOpen={isCartOpen} onClose={handleCartClose} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseDrawer} />
      {shouldShowNavbar && (
        <Navigation onCartOpen={handleCartOpen} onSidebarOpen={handleOpenDrawer} />
      )}
      {children}
    </div>
  )
}
