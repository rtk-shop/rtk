'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar
} from '@/components/ui/shadcn/sidebar'
import { sidebarData } from './data/sidebar-data'
import { NavGroup } from './nav-group'
import { AppLogo } from '@/components/ui/logo'
import { cva } from 'class-variance-authority'

const head = cva('max-w-20', {
  variants: {
    open: {
      true: 'mb-6 p-4',
      false: 'mb-2 p-2'
    }
  }
})

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar()

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader className={head({ open })}>
        <AppLogo size="max" />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter> */}
    </Sidebar>
  )
}
