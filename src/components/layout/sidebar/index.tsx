'use client'

import { Drawer } from '@/components/ui/drawer'
import { SidebarHead } from './head'
import { Categories } from './categories'
import { useAppState } from '@/stores/app/store'
import Link from 'next/link'
import { routeNames } from '@/lib/routes'

export function Sidebar() {
  const isSidebarOpen = useAppState((state) => state.isSidebarOpen)
  const closeSidebar = useAppState((state) => state.closeSidebar)

  return (
    <Drawer open={isSidebarOpen} position="left" onClose={closeSidebar}>
      <div className="h-full w-80">
        <div className="flex h-full flex-col overflow-y-auto bg-black/60 backdrop-blur-lg">
          <SidebarHead onClose={closeSidebar} />
          <Categories />
          <div className="mt-auto px-4 pb-4 text-sm text-white">
            <div className="">
              <Link
                href={routeNames.terms}
                onClick={closeSidebar}
                className="underline"
                prefetch={false}
              >
                Умови використання додатку
              </Link>
              <p className="mt-0.5">
                © 2025 Інтернет-магазин «{process.env.NEXT_PUBLIC_APP_NAME}»
              </p>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  )
}
