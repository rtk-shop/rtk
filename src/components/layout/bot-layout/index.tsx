'use client'

import { useEffect } from 'react'
import { Cart } from '@/components/layout/cart'
import { Sidebar } from '@/components/layout/sidebar'
import { checkNoPannelRoutes } from '@/lib/routes'
import { usePathname } from 'next/navigation'

export function BotLayout({
  children,
  navbar
}: {
  children: React.ReactNode
  navbar: React.ReactNode
}) {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram) {
      Telegram.WebApp.setHeaderColor('#ffffff')

      window.Telegram.WebApp.ready()
      window.Telegram.WebApp.expand()
      window.Telegram.WebApp.disableVerticalSwipes()
      window.Telegram.WebApp.lockOrientation()
    }
  }, [])

  const withPannel = !checkNoPannelRoutes(pathname)

  return (
    <>
      <main
        style={{
          paddingBottom: `calc(${withPannel ? 48 : 0}px + var(--tg-safe-area-inset-bottom, 0px))`
        }}
      >
        {withPannel && <Cart />}
        <Sidebar />
        {children}
      </main>
      {withPannel && navbar}
    </>
  )
}
