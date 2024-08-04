import { memo } from 'react'
import { Drawer } from '@/components/layout/drawer'
import { Summary } from './summary'
import { ProcessPlug } from './plug'
import { ListSkeleton } from './list-skeleton'
import { CartHead } from './head'
import { CartItem, CartItemType } from '@/components/cart-item'
import useTranslation from 'next-translate/useTranslation'
import { normalizedView, useCartStore } from '@/store/cart'
import { useRouter } from 'next/router'
import { routeNames } from '@/utils/navigation'
import { useCartProductsQuery } from '@/graphql/product/_gen_/cartProducts.query'
import { setCartItems } from '@/apollo/cache/cart'

import styles from './styles.module.scss'

interface CartProps {
  currency: number
  isOpen: boolean
  onClose(): void
}

export const Cart = memo(function Cart({ isOpen, currency, onClose }: CartProps) {
  return (
    <Drawer position="right" onClose={onClose} open={isOpen}>
      <div className={styles.container}>
        <CartInner currency={currency} onClose={onClose} />
      </div>
    </Drawer>
  )
})

export function CartInner({ currency, onClose }: { currency: number; onClose(): void }) {
  const router = useRouter()
  const { t } = useTranslation('common')

  const cartItems = useCartStore((state) => state.cartItems)
  const itemsMap = normalizedView(cartItems)

  const isCartEmpty = cartItems.length === 0

  const { data, error, loading } = useCartProductsQuery({
    variables: {
      input: cartItems
    },
    skip: isCartEmpty,
    onCompleted: (data) => {
      if (data) {
        setCartItems(
          data.cartProducts.map((p) => ({
            productId: p.id,
            amount: itemsMap[p.id],
            price: p.currentPrice
          }))
        )
      }
    }
  })

  const handleCheckout = (): void => {
    onClose()
    router.push(routeNames.checkout)
  }

  if (isCartEmpty) {
    return <ProcessPlug text={t('cart.emptyMsg')} onClose={onClose} />
  }

  if (error) {
    return <ProcessPlug text={t('cart.errorMsg')} onClose={onClose} />
  }

  return (
    <div className={styles.wrapper}>
      <CartHead onCartClose={onClose} />
      {loading ? (
        <ListSkeleton max={3} itemsAmount={cartItems.length} />
      ) : (
        <ul className={styles.list}>
          {data?.cartProducts.map((product: CartItemType) => (
            <CartItem key={product.id} amount={itemsMap[product.id]} product={product} />
          ))}
        </ul>
      )}
      <Summary loading={loading} currency={currency} onCheckout={handleCheckout} />
    </div>
  )
}
