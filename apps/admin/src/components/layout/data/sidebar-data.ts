import { routeNames } from '@/lib/routes'
import { LayoutDashboard, Boxes, Users, PackagePlus } from 'lucide-react'

interface BaseNavItem {
  title: string
  badge?: string
  icon?: React.ElementType
}

export type NavLink = BaseNavItem & {
  url: string
  items?: never
}

export type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: string })[]
  url?: never
}

export type NavItem = NavCollapsible | NavLink

export interface NavGroup {
  title: string
  items: NavItem[]
}

export interface SidebarData {
  navGroups: NavGroup[]
}

// <SquareLibrary /> products

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: 'Общее',
      items: [
        {
          title: 'Панель',
          url: routeNames.dashboard,
          icon: LayoutDashboard
        },
        {
          title: 'Заказы',
          url: routeNames.orders,
          icon: Boxes
        },
        {
          title: 'Пользователи',
          url: '#',
          icon: Users
        },
        {
          title: 'Создание продукта',
          url: routeNames.createProduct,
          icon: PackagePlus
        }
      ]
    }
  ]
}
