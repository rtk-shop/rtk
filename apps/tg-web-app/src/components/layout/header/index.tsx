import { memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { routeNames } from '@/lib/routes'
import { Cap } from './cap'
import { Icon } from '@/components/ui/icon'
import { Badge } from '@repo/ui'
import { IconButton } from '@/components/ui/icon-button'
import { Search } from './search'

interface HeaderProps {
  currency: number
  onDrawerOpen(): void
  onCartOpen(): void
}

export const Header = memo(function Header({ currency, onDrawerOpen, onCartOpen }: HeaderProps) {
  const t = (s: string) => s

  const cartAmount = 0
  const favoriteAmount = 0

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
          <IconButton onClick={onDrawerOpen}>
            <Icon name="common/menu" className="text-[27px] text-slate-100 lg:text-black" />
          </IconButton>
          <Link href={routeNames.root} className="mr-8 ml-10 hidden w-36 lg:block">
            {/* temp */}
            <Image
              width={75}
              height={50}
              src="/svg-icons/common/logo.svg"
              alt="логотип"
              priority={true}
            />
          </Link>
          <nav>
            <ul className="hidden items-center *:px-4 *:py-2 lg:flex">
              <li>
                <Link
                  href={routeNames.root}
                  className="header-nav-link relative text-sm font-semibold text-black uppercase no-underline"
                >
                  {t('header.catalog')}
                </Link>
              </li>
            </ul>
          </nav>
          {/*  */}
          <Search />
          {/*  */}
          <IconButton className="hidden p-3 md:block" onClick={handleFavoritesClick}>
            <Badge content={favoriteAmount}>
              <Icon
                name="common/heart"
                className="fill-none stroke-slate-100 text-[24px] transition duration-200 hover:scale-110 lg:stroke-black"
              />
            </Badge>
          </IconButton>
          <IconButton className="hidden p-3 md:block" onClick={handleProfileClick}>
            <Badge content={0} max={5}>
              <Icon
                name="common/user"
                className="fill-slate-100 text-[24px] transition duration-200 hover:scale-110 lg:fill-black"
              />
            </Badge>
          </IconButton>
          <IconButton onClick={handleCartClick}>
            <Badge content={cartAmount}>
              <Icon
                name="common/cart"
                className="fill-slate-100 stroke-slate-100 text-[28px] transition duration-300 hover:scale-125 md:text-[24px] lg:fill-black lg:stroke-black"
              />
            </Badge>
          </IconButton>
        </div>
      </header>
    </div>
  )
})
