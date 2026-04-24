import { Navigation } from './navigation'
import { CartButton } from './navigation/cart-button'
import { FavoritesBadge } from './navigation/favorites-badge'
import { MenuButton } from './navigation/menu-button'

export function Navbar() {
  return <Navigation cart={<CartButton />} menu={<MenuButton />} favorites={<FavoritesBadge />} />
}
