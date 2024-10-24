import { ElementType } from 'react'
// import HomeIcon from '../../../../../public/icons/home.svg'
import UserIcon from '../../../../../public/icons/user-bar.svg'
import HeartIcon from '../../../../../public/icons/heart-2.svg'
import ListIcon from '../../../../../public/icons/list.svg'
import EyeIcon from '../../../../../public/icons/eye.svg'
import useTranslation from 'next-translate/useTranslation'
import { Badge } from '@/components/ui/badge'
import { SvgIcon } from '@/components/ui/svg-icon'
import { ConditionalRender } from '@/components/layout/conditional-render'
import { routeNames } from '@/lib/navigation'
import { useUserStore } from '@/store/user'
import { useFavoriteStore } from '@/store/favorite'
import { useRouter } from 'next/router'

interface SidebarNavListProps {
  onClose(): void
}

const drawerItems: {
  icon: ElementType
  to: string
  i18n: string
  withBadge?: boolean
}[] = [
  {
    icon: ListIcon,
    to: routeNames.root,
    i18n: 'catalog'
  },
  // {
  //   icon: SaleIcon,
  //   to: '/discounts',
  //   i18n: 'sales'
  // },
  {
    icon: UserIcon,
    to: routeNames.profile,
    i18n: 'profile'
  },
  {
    icon: HeartIcon,
    to: '/favorite',
    i18n: 'favorite',
    withBadge: true
  },
  {
    icon: EyeIcon,
    to: '#',
    i18n: 'history'
  }
]

export function Navigation({ onClose }: SidebarNavListProps) {
  const router = useRouter()

  const isAuthenticated = useUserStore((state) => state.isAuthenticated)
  const favoriteAmount = useFavoriteStore((state) => state.amount())
  const { t } = useTranslation('common')

  const goTo = (path: string): void => {
    onClose()

    if (path === '/profile') {
      if (!isAuthenticated) return
    }

    router.push(path)
  }

  return (
    <ul className="pl-4 text-white md:pl-7">
      {drawerItems.map((item) => (
        <li
          key={item.to}
          onClick={() => goTo(item.to)}
          className="flex cursor-pointer items-center py-3 hover:text-gray-300 md:py-4"
        >
          <ConditionalRender
            condition={!!item.withBadge}
            wrap={(children) => <Badge content={favoriteAmount}>{children}</Badge>}
          >
            <SvgIcon className="fill-white text-3xl transition-all">
              <item.icon />
            </SvgIcon>
          </ConditionalRender>
          <div className="ml-4">
            <p className="text-lg font-medium transition-colors md:text-2xl">
              {t(`drawer.${item.i18n}`)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
