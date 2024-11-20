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
    document.documentElement.classList.toggle('dark')
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
      <header className="bg-slate-200/30 backdrop-blur-md dark:bg-black/90">
        <nav className="px-3 pb-1 pt-2">
          <ul className="flex w-full justify-between">
            <li>
              <IconButton
                disableRipple
                onClick={onSidebarOpen}
                className="text-[32px] text-teal-950 dark:text-white"
              >
                <Icon name="common/menu" />
              </IconButton>
            </li>
            {/*  */}
            <li>
              <IconButton className="" onClick={handleFavoritesClick} disableRipple>
                <Badge content={favoriteAmount}>
                  <Icon
                    name="common/heart"
                    className="bg-sl fill-transparent stroke-teal-950 text-[28px] dark:stroke-white"
                  />
                </Badge>
              </IconButton>
            </li>
            {/*  */}
            <li>
              <IconButton onClick={onCartOpen} disableRipple className="text-[28px]">
                <Badge content={cartAmount}>
                  <Icon
                    name="common/cart"
                    className="fill-teal-700 stroke-teal-700 dark:fill-white dark:stroke-white"
                  />
                </Badge>
              </IconButton>
            </li>
            {/*  */}
            <li>
              <IconButton
                onClick={handleCatalogClick}
                disableRipple
                className="text-[28px] text-teal-700 dark:text-white"
              >
                <Icon name="common/grid" />
              </IconButton>
            </li>
            {/*  */}
            <li>
              <IconButton
                className="text-[28px] text-teal-950 dark:text-white"
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
