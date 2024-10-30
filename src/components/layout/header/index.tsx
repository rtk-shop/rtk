import { memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { routeNames } from '@/lib/constants'
import { useCartStore } from '@/store/cart'
import { useFavoriteStore } from '@/store/favorite'
import { Badge } from '@/components/ui/badge'
import { IconButton } from '@/components/ui/icon-button'
import { Search } from './search'
import { SvgIcon } from '@/components/ui/svg-icon'
import useTranslation from 'next-translate/useTranslation'
import { Cap } from './cap'
import MenuIcon from '../../../../public/icons/menu.svg'
import HeartIcon from '../../../../public/icons/heart.svg'
import ProfileIcon from '../../../../public/icons/user.svg'
import CartIcon from '../../../../public/icons/header_cart.svg'

interface HeaderProps {
  currency: number
  onDrawerOpen(): void
  onCartOpen(): void
}

export const Header = memo(function Header({ currency, onDrawerOpen, onCartOpen }: HeaderProps) {
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
    <div className="sticky top-0 z-40 lg:static">
      {/*  */}
      <Cap currency={currency} />
      {/*  */}
      <header className="flex-wrap bg-black shadow-md lg:bg-white">
        <div className="m-auto flex max-w-[1700px] items-center px-0 py-2.5 lg:px-4 xl:py-3">
          <IconButton disableRipple onClick={onDrawerOpen}>
            <SvgIcon className="fill-slate-100 lg:fill-black">
              <MenuIcon />
            </SvgIcon>
          </IconButton>
          <Link href={routeNames.root} className="ml-10 mr-8 hidden w-36 lg:block">
            <Image width={75} height={50} src="/assets/logo.svg" alt="логотип" priority={true} />
          </Link>
          <nav>
            <ul className="hidden items-center *:px-4 *:py-2 lg:flex">
              <li>
                <Link
                  href={routeNames.root}
                  className="header-nav-link relative text-[14px] font-semibold uppercase text-black no-underline"
                >
                  {t('header.catalog')}
                </Link>
              </li>
            </ul>
          </nav>
          {/*  */}
          <Search />
          {/*  */}
          <IconButton className="hidden p-3 md:block" onClick={handleFavoritesClick} disableRipple>
            <Badge content={favoriteAmount}>
              <SvgIcon className="fill-none stroke-slate-100 text-[24px] transition duration-200 hover:scale-110 lg:stroke-black">
                <HeartIcon />
              </SvgIcon>
            </Badge>
          </IconButton>
          <IconButton className="hidden p-3 md:block" onClick={handleProfileClick} disableRipple>
            <Badge content={0} max={5}>
              <SvgIcon className="fill-slate-100 text-[24px] transition duration-200 hover:scale-110 lg:fill-black">
                <ProfileIcon />
              </SvgIcon>
            </Badge>
          </IconButton>
          <IconButton onClick={handleCartClick} disableRipple>
            <Badge content={cartAmount}>
              <SvgIcon className="fill-slate-100 stroke-slate-100 text-[28px] transition duration-300 hover:scale-125 md:text-[24px] lg:fill-black lg:stroke-black">
                <CartIcon />
              </SvgIcon>
            </Badge>
          </IconButton>
        </div>
      </header>
    </div>
  )
})
