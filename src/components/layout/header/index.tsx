import { memo } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import { routeNames } from '@/utils/navigation'
import { usePathname } from 'next/navigation'
import { useCartStore } from '@/store/cart'
import { useFavoriteStore } from '@/store/favorite'
import { Badge } from '@/components/ui/badge'
import { IconButton } from '@/components/ui/icon-button'
import { Search } from './search'
import { SvgIcon } from '@/components/ui/svg-icon'
import useTranslation from 'next-translate/useTranslation'
import MenuIcon from '../../../../public/icons/menu.svg'
import HeartIcon from '../../../../public/icons/heart.svg'
import ProfileIcon from '../../../../public/icons/profile.svg'
import CartIcon from '../../../../public/icons/header_cart.svg'

import styles from './styles.module.scss'

interface HeaderProps {
  onDrawerOpen(): void
  onCartOpen(): void
}

export const Header = memo(function Header({ onDrawerOpen, onCartOpen }: HeaderProps) {
  const pathname = usePathname()
  const { t } = useTranslation('common')

  const cartAmount = useCartStore((state) => state.cartAmount())
  const favoriteAmount = useFavoriteStore((state) => state.amount())

  const handleCartClick = (): void => {
    onCartOpen()
  }

  const handleFavoritesClick = (): void => {
    // history.push(routes.favorite)
  }

  const handleProfileClick = (): void => {
    console.log('profile click')
  }

  return (
    <header className={styles.header}>
      <div
        className={clsx(
          styles.wrapper,
          pathname === routeNames.catalog && styles['wrapper-expand']
        )}
      >
        <IconButton disableRipple onClick={onDrawerOpen}>
          <SvgIcon className={styles['menu-icon']}>
            <MenuIcon />
          </SvgIcon>
        </IconButton>
        <Link href={routeNames.root} className={styles.logo}>
          <Image width={150} height={40} src="/assets/logo.svg" alt="логотип" priority={true} />
        </Link>
        <nav>
          <ul className={styles.navlist}>
            <li>
              <Link href={routeNames.root} className={styles['nav-link']}>
                {t('header.home')}
              </Link>
            </li>
            <li>
              <Link href={routeNames.catalog} className={styles['nav-link']}>
                {t('header.catalog')}
              </Link>
            </li>
          </ul>
        </nav>
        {/*  */}
        <Search />
        {/*  */}
        <IconButton className={styles.dynamic} onClick={handleFavoritesClick} disableRipple>
          <Badge content={favoriteAmount}>
            <SvgIcon className={styles['heart-icon']}>
              <HeartIcon />
            </SvgIcon>
          </Badge>
        </IconButton>
        <IconButton className={styles.dynamic} onClick={handleProfileClick} disableRipple>
          <Badge content={0} max={5}>
            <SvgIcon className={styles['profile-icon']}>
              <ProfileIcon />
            </SvgIcon>
          </Badge>
        </IconButton>
        <IconButton className={styles['cart-button']} onClick={handleCartClick} disableRipple>
          <Badge content={cartAmount}>
            <SvgIcon className={styles['cart-icon']}>
              <CartIcon />
            </SvgIcon>
          </Badge>
        </IconButton>
      </div>
    </header>
  )
})
