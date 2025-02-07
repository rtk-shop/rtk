'use client'

import { type ReactNode } from 'react'
import { Navigation } from '@/components/layout/navigation'
import { Cart } from '@/components/layout/cart'
import { Sidebar } from '@/components/layout/sidebar'

// const noNavbarPaths = [routeNames.checkout] as string[]

export function BotLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Cart />
      <Sidebar />
      <Navigation />
      {children}
    </div>
  )
}
