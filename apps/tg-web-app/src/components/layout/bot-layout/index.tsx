'use client'

import { useEffect, type ReactNode } from 'react'
import { Navigation } from '@/components/layout/navigation'
import { Cart } from '@/components/layout/cart'
import { Sidebar } from '@/components/layout/sidebar'
import { routeNames } from '@/lib/constants'
import { usePathname } from 'next/navigation'

const noNavbarPaths = [routeNames.root] as string[]

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

  return (
    <main
      style={{
        paddingBottom: 'calc(48px + var(--tg-safe-area-inset-bottom, 0px))'
      }}
    >
      <Cart />
      <Sidebar />
      {!noNavbarPaths.includes(pathname) && <Navigation />}
      {children}
    </main>
  )
}
