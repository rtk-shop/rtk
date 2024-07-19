import clsx from 'clsx'
import { CartItem } from '@/components/cart-item'
import { IconButton } from '@/components/ui/icon-button'
import TrashIcon from '../../../../../../public/icons/trash.svg'
// TODO: make shared
import { ListSkeleton } from '@/components/layout/cart/list-skeleton'
import { useCartStore } from '@/store/cart'
import { useRouter } from 'next/router'
import { routeNames } from '@/utils/navigation'
import type { cartItem } from '@/types'

import styles from './styles.module.scss'

interface CartItemsProps {
  cartCount: number
  cartProducts: cartItem[]
  loading: boolean
}

export function CartItems({ loading, cartProducts, cartCount }: CartItemsProps) {
  const router = useRouter()

  const clearCart = useCartStore((state) => state.clear)
  const removeCartItem = useCartStore((state) => state.remove)
  const cartItems = useCartStore((state) => state.cartItems)

  // TODO: put this logic into state elements
  const cartMap: Record<string, number> = {}

  const normalizedCart = cartItems.reduce((acc, item) => {
    if (acc[item.productId]) {
      acc[item.productId] = acc[item.productId] += item.amount
      return acc
    }

    acc[item.productId] = item.amount
    return acc
  }, cartMap)

  const handleClearAllClick = (): void => {
    clearCart()
    router.replace(routeNames.root)
  }

  const handleProductRemove = (id: string): void => {
    removeCartItem(id)
  }

  return (
    <div>
      <div className={styles.container}>
        <h2 className={styles.title}>Ваш заказ</h2>
        <IconButton className={styles.clearButton} onClick={handleClearAllClick}>
          <div className={clsx('svg-icon', styles.trashIcon)}>
            <TrashIcon />
          </div>
        </IconButton>
      </div>
      {loading ? (
        <ListSkeleton max={3} itemsAmount={cartCount} />
      ) : (
        <ul className={styles.list}>
          {cartProducts.map((product) => (
            <CartItem
              key={product.id}
              amount={normalizedCart[product.id]}
              product={product}
              onRemove={handleProductRemove}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
