import { memo } from 'react'
import { routeNames } from '@/lib/constants'
import { Badge } from '@/components/ui/badge'
import { IconButton } from '@/components/ui/icon-button'
import { SvgIcon } from '@/components/ui/svg-icon'
import MenuIcon from '../../../../public/icons/menu.svg'
import HeartIcon from '../../../../public/icons/heart.svg'
import UserIcon from '../../../../public/icons/user.svg'
import CartIcon from '../../../../public/icons/cart.svg'
import GridIcon from '../../../../public/icons/grid.svg'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/providers/cart-store-provider'
import { useFavoriteStore } from '@/providers/favorite-store-provider'

interface NavigationProps {
  onSidebarOpen(): void
  onCartOpen(): void
}

export const Navigation = memo(function Navigation({ onSidebarOpen, onCartOpen }: NavigationProps) {
  const router = useRouter()

  const [cartAmount] = useCartStore((state) => state.cartAmount())
  const [favoriteAmount] = useFavoriteStore((state) => state.amount())

  const handleFavoritesClick = () => {
    console.log('favorite click')
  }

  const handleCatalogClick = () => {
    router.push(routeNames.catalog)
  }

  const handleProfileClick = () => {
    router.push(routeNames.profile)
  }

  return (
    <div className="fixed bottom-0 z-40 w-screen">
      <header className="bg-black/90 backdrop-blur-md">
        <nav className="px-3 pb-1 pt-2">
          <ul className="flex w-full justify-between *:fill-white">
            <li>
              <IconButton disableRipple onClick={onSidebarOpen}>
                <SvgIcon className="text-[28px]">
                  <MenuIcon />
                </SvgIcon>
              </IconButton>
            </li>
            {/*  */}
            <li>
              <IconButton className="p-3" onClick={handleFavoritesClick} disableRipple>
                <Badge content={favoriteAmount}>
                  <SvgIcon className="fill-transparent stroke-white text-[28px]">
                    <HeartIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </li>
            {/*  */}
            <li>
              <IconButton onClick={onCartOpen} disableRipple>
                <Badge content={cartAmount}>
                  <SvgIcon className="stroke-white text-[28px]">
                    <CartIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </li>
            {/*  */}
            <li>
              <IconButton onClick={handleCatalogClick} disableRipple>
                <SvgIcon className="stroke-white text-[28px] text-white">
                  <GridIcon />
                </SvgIcon>
              </IconButton>
            </li>
            {/*  */}
            <li>
              <IconButton className="p-3" onClick={handleProfileClick} disableRipple>
                <Badge content={0} max={5}>
                  <SvgIcon className="text-[28px]">
                    <UserIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
})
