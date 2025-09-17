'use client'

import { useEffect, type ReactNode } from 'react'
import { Navigation } from '@/components/layout/navigation'
import { Cart } from '@/components/layout/cart'
import { Sidebar } from '@/components/layout/sidebar'
import { checkNoPannelRoutes } from '@/lib/routes'
import { usePathname } from 'next/navigation'

export function BotLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram) {
      Telegram.WebApp.setHeaderColor('#ffffff')

      window.Telegram.WebApp.ready()
      window.Telegram.WebApp.expand()
      window.Telegram.WebApp.disableVerticalSwipes()
      // window.Telegram.WebApp.lockOrientation()
      window.Telegram.WebApp.enableClosingConfirmation()
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
        <div>
          {withPannel && <Cart />}
          <Sidebar />
          {children}
        </div>
      </main>
      {withPannel && <Navigation />}
    </>
  )
}
