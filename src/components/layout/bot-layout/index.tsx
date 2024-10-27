'use client'

import { type ReactNode, useCallback, useMemo, useState } from 'react'
import { Navigation } from '../navigation'
import { Sidebar } from '../sidebar'
import { UrqlProvider, ssrExchange, cacheExchange, fetchExchange, createClient } from '@urql/next'

export function BotLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  const [isCartOpen, setCartOpen] = useState(false)

  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange({
      isClient: typeof window !== 'undefined'
    })
    const client = createClient({
      url: process.env.NEXT_PUBLIC_API_HOST + '/graphql',
      exchanges: [cacheExchange, ssr, fetchExchange],
      suspense: true
    })

    return [client, ssr]
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
    <UrqlProvider client={client} ssr={ssr}>
      {/* <Cart isOpen={isCartOpen} currency={10} onClose={handleCartClose} /> */}
      <Sidebar isOpen={isSidebarOpen} currency={10} onClose={handleCloseDrawer} />
      <Navigation onCartOpen={handleCartOpen} onSidebarOpen={handleOpenDrawer} />
      {children}
    </UrqlProvider>
  )
}
