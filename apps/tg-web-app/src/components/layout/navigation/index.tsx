import { routeNames } from '@/lib/constants'
import { Badge } from '@repo/ui'
import { IconButton } from '@/components/ui/icon-button'
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
    <div className="fixed -bottom-px z-40 w-screen">
      <header className="bg-black/80 backdrop-blur-md">
        <nav className="px-3 pt-1">
          <ul className="flex w-full justify-between">
            <li>
              <IconButton onClick={openSidebar} className="text-[24px] text-white">
                <Icon name="common/menu" />
              </IconButton>
            </li>
            {/*  */}
            <li>
              <IconButton className="" onClick={handleFavoritesClick}>
                <Badge content={favoriteAmount}>
                  <Icon
                    name="common/heart"
                    className="bg-sl fill-transparent stroke-white text-[22px]"
                  />
                </Badge>
              </IconButton>
            </li>
            {/*  */}
            <li>
              <IconButton onClick={openCart} className="text-[24px]">
                <Badge content={cartAmount}>
                  <Icon name="common/cart" className="fill-white stroke-white" />
                </Badge>
              </IconButton>
            </li>
            {/*  */}
            <li>
              <IconButton onClick={handleCatalogClick} className="text-[24px] text-white">
                <Icon name="common/grid" />
              </IconButton>
            </li>
            {/*  */}
            <li>
              <IconButton className="text-[24px] text-white" onClick={handleProfileClick}>
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
}
