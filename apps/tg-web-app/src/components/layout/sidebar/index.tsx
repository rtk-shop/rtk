'use client'

import { Drawer } from '@/components/ui/drawer'
import { SidebarHead } from './head'
import { Categories } from './categories'
import { useAppState } from '@/stores/app/store'

export function Sidebar() {
  const isSidebarOpen = useAppState((state) => state.isSidebarOpen)
  const closeSidebar = useAppState((state) => state.closeSidebar)

  return (
    <Drawer open={isSidebarOpen} position="left" onClose={closeSidebar}>
      <div className="h-full w-80">
        <div className="flex h-full flex-col overflow-y-auto bg-black/60 backdrop-blur-lg">
          {/*  */}
          <SidebarHead onClose={closeSidebar} />
          {/*  */}
          <Categories />
          {/*  */}
          {process.env.NODE_ENV === 'development' && (
            <a className="mt-2 text-center font-medium text-white underline" href="/sandbox">
              SANDBOX
            </a>
          )}
        </div>
      </div>
    </Drawer>
  )
}
