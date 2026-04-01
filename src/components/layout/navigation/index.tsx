'use client'

import { routeNames } from '@/lib/routes'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'
import { useFavoriteStore } from '@/providers/favorite-store-provider'
import { Icon } from '@/components/ui/icon'
import { useCartQuery } from '@/lib/api/hooks'
import { useAppState } from '@/stores/app/store'

export function Navigation() {
  const router = useRouter()

  const openCart = useAppState((state) => state.openCart)
  const openSidebar = useAppState((state) => state.openSidebar)

  const [result] = useCartQuery()
  const [favoriteAmount] = useFavoriteStore((state) => state.amount)

  const cartAmount = result.data?.cartProducts.reduce((acc, item) => item.quantity + acc, 0)

  const handleFavoritesClick = () => {
    router.push(routeNames.favourites)
  }

  const handleCatalogClick = () => {
    router.push(routeNames.catalog)
  }

  const handleProfileClick = () => {
    router.push(routeNames.profile)
  }

  return (
    <div className="fixed bottom-0 z-40 w-screen">
      <header
        className="bg-black/80 backdrop-blur-md"
        style={{
          paddingBottom: 'calc(var(--tg-safe-area-inset-bottom, 0px) - 10px)'
        }}
      >
        <nav className="px-3 pt-1">
          <ul className="flex w-full justify-between">
            <li>
              <Button
                color="ghost"
                size="lg"
                onClick={openSidebar}
                className="bg-transparent text-[24px] text-white"
              >
                <Icon name="common/menu" />
              </Button>
            </li>
            {/*  */}
            <li>
              <Button
                color="ghost"
                size="lg"
                className="bg-transparent"
                onClick={handleFavoritesClick}
              >
                <Badge content={favoriteAmount}>
                  <Icon
                    name="common/heart"
                    className="bg-sl fill-transparent stroke-white text-[22px]"
                  />
                </Badge>
              </Button>
            </li>
            {/*  */}
            <li>
              <Button
                color="ghost"
                size="lg"
                onClick={openCart}
                className="bg-transparent text-[24px]"
              >
                <Badge content={cartAmount}>
                  <Icon name="common/cart" className="fill-white stroke-white" />
                </Badge>
              </Button>
            </li>
            {/*  */}
            <li>
              <Button
                color="ghost"
                size="lg"
                onClick={handleCatalogClick}
                className="bg-transparent text-[24px] text-white"
              >
                <Icon name="common/grid" />
              </Button>
            </li>
            {/*  */}
            <li>
              <Button
                color="ghost"
                size="lg"
                className="bg-transparent text-[24px] text-white"
                onClick={handleProfileClick}
              >
                <Badge content={0} max={5}>
                  <Icon name="common/user" />
                </Badge>
              </Button>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}
