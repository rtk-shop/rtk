import { memo } from 'react'
import { routeNames } from '@/lib/constants'
import { Badge } from '@/components/ui/badge'
import { IconButton } from '@/components/ui/icon-button'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/providers/cart-store-provider'
import { useFavoriteStore } from '@/providers/favorite-store-provider'
import { Icon } from '@/components/ui/icon'

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
              <IconButton disableRipple onClick={onSidebarOpen} className="text-[32px] text-white">
                <Icon name="common/menu" />
              </IconButton>
            </li>
            {/*  */}
            <li>
              <IconButton className="" onClick={handleFavoritesClick} disableRipple>
                <Badge content={favoriteAmount}>
                  <Icon name="common/heart" className="fill-transparent stroke-white text-[28px]" />
                </Badge>
              </IconButton>
            </li>
            {/*  */}
            <li>
              <IconButton onClick={onCartOpen} disableRipple className="text-[28px] text-white">
                <Badge content={cartAmount}>
                  <Icon name="common/cart" className="stroke-white" />
                </Badge>
              </IconButton>
            </li>
            {/*  */}
            <li>
              <IconButton
                onClick={handleCatalogClick}
                disableRipple
                className="text-[28px] text-white"
              >
                <Icon name="common/grid" />
              </IconButton>
            </li>
            {/*  */}
            <li>
              <IconButton
                className="text-[28px] text-white"
                onClick={handleProfileClick}
                disableRipple
              >
                <Badge content={0} max={5}>
                  <Icon name="common/user" />
                </Badge>
              </IconButton>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
})
