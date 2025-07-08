'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader
} from '@/components/ui/shadcn/sidebar'
import { sidebarData } from './data/sidebar-data'
import { NavGroup } from './nav-group'
// import { TeamSwitcher } from '@/components/layout/team-switcher'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>{/* <TeamSwitcher teams={sidebarData.teams} /> */}</SidebarHeader>
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
