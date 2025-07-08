'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '@/components/ui/shadcn/sidebar'
import { sidebarData } from './data/sidebar-data'
import { NavGroup } from './nav-group'
// import { NavUser } from '@/components/layout/nav-user'
// import { TeamSwitcher } from '@/components/layout/team-switcher'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={sidebarData.teams} /> */}
        <h1>Hi!</h1>
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter> */}
      {/* <SidebarRail /> */}
    </Sidebar>
  )
}
