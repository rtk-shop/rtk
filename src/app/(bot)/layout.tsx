'use client'

import localFont from 'next/font/local'
import { Navigation } from '@/components/layout/navigation'
import { useCallback, useState, useMemo, type ReactNode } from 'react'

import { UrqlProvider, ssrExchange, cacheExchange, fetchExchange, createClient } from '@urql/next'

import '@/styles/globals.scss'

const proximanova = localFont({
  display: 'optional',
  variable: '--font-proximanova',
  src: [
    {
      path: '../../../font/ProximaNova-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../../font/ProximaNova-Semibold.woff2',
      weight: '500',
      style: 'normal'
    }
  ]
})

export default function BotLayout({ children }: { children: ReactNode }) {
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
    <html lang="en">
      {/* <Sidebar isOpen={isSidebarOpen} currency={10} onClose={handleCloseDrawer} /> */}
      {/* <Cart isOpen={isCartOpen} currency={10} onClose={handleCartClose} /> */}
      <UrqlProvider client={client} ssr={ssr}>
        <body className={proximanova.variable}>
          <Navigation onCartOpen={handleCartOpen} onSidebarOpen={handleOpenDrawer} />
          <main>{children}</main>
        </body>
      </UrqlProvider>
    </html>
  )
}
