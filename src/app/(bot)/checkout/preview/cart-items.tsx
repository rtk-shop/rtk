import { CartItem, type CartItemType } from '@/components/cart-item'
import { ListSkeleton } from '@/components/layout/cart/list-skeleton' // TODO: make shared
import { useCartStore } from '@/providers/cart-store-provider'
import { normalizedView } from '@/stores/cart/store'
import { routeNames } from '@/lib/constants'

import { useRouter } from 'next/navigation'

interface CartItemsProps {
  loading: boolean
  cartProducts: CartItemType[]
}

export function CartItems({ loading, cartProducts }: CartItemsProps) {
  const router = useRouter()

  const [cartItems] = useCartStore((state) => state.cartItems)
  const itemsMap = normalizedView(cartItems)

  const handleClearAllClick = (): void => {
    console.log('delete all items')

    // clearCart() in store
    // router.replace(routeNames.root)
  }

  return (
    <div>
      <div className="flex items-center justify-between px-2 pb-4 pt-4">
        <h2 className="font-medium">Ваш заказ</h2>
        <button
          color="secondary"
          className="text-[13px] text-gray-500"
          onClick={handleClearAllClick}
        >
          Удалить все
        </button>
      </div>
      {loading ? (
        <ListSkeleton max={3} itemsAmount={cartItems.length} />
      ) : (
        <ul className="scroll-bar max-h-[400px] overflow-y-auto overflow-x-hidden pt-4">
          {cartProducts.map((product) => (
            <CartItem key={product.id} amount={itemsMap[product.id]} product={product} />
          ))}
        </ul>
      )}
    </div>
  )
}
