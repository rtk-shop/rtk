import { ElementType } from 'react'
import clsx from 'clsx'
import HomeIcon from '../../../../../public/icons/eye.svg'
import UserIcon from '../../../../../public/icons/user.svg'
import HeartIcon from '../../../../../public/icons/heart_2.svg'
import ListIcon from '../../../../../public/icons/list.svg'
import EyeIcon from '../../../../../public/icons/eye.svg'
import useTranslation from 'next-translate/useTranslation'
import { Badge } from '@/components/ui/badge'
import { ConditionalRender } from '@/components/layout/conditional-render'
import { routeNames } from '@/utils/navigation'
import { useUserStore } from '@/store/user'
import { useFavoriteStore } from '@/store/favorite'
import { useRouter } from 'next/router'

import styles from './styles.module.scss'

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
    icon: HomeIcon,
    to: routeNames.root,
    i18n: 'home'
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
    to: '/favorite', // TODO: add route
    i18n: 'favorite',
    withBadge: true
  },

  {
    icon: ListIcon,
    to: routeNames.catalog,
    i18n: 'catalog'
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
    <ul className={styles.navList}>
      {drawerItems.map((item) => (
        <li key={item.to} onClick={() => goTo(item.to)} className={styles.listItem}>
          <ConditionalRender
            condition={!!item.withBadge}
            wrap={(children) => <Badge content={favoriteAmount}>{children}</Badge>}
          >
            <div className={clsx('svg-icon', styles.icon)}>
              <item.icon />
            </div>
          </ConditionalRender>
          <div className={styles.text}>
            <p>{t(`drawer.${item.i18n}`)}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
