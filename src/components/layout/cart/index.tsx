import { memo, useEffect } from 'react'
import { Drawer } from '@/components/layout/drawer'
import { Summary } from './summary'
import { ProcessPlug } from './plug'
import { ListSkeleton } from './list-skeleton'
import { CartHead } from './head'
import { CartItem, CartItemType } from '@/components/cart-item'
import useTranslation from 'next-translate/useTranslation'
import { useCartStore } from '@/store/cart'
import { useRouter } from 'next/router'
import { routeNames } from '@/utils/navigation'
import { useCartProductsLazyQuery } from '@/graphql/product/_gen_/cartProducts.query'

import styles from './styles.module.scss'

interface CartProps {
  isOpen: boolean
  onClose(): void
}

export const Cart = memo(function Cart({ isOpen, onClose }: CartProps) {
  return (
    <Drawer position="right" onClose={onClose} open={isOpen}>
      <div className={styles.container}>
        <CartInner isOpen={isOpen} onClose={onClose} />
      </div>
    </Drawer>
  )
})

export function CartInner({ isOpen, onClose }: CartProps) {
  const router = useRouter()

  const cartItems = useCartStore((state) => state.cartItems)
  const removeCartItem = useCartStore((state) => state.remove)
  const setCartPrice = useCartStore((state) => state.setCartPrice)
  const { t } = useTranslation('common')

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

  const isCartEmpty = cartItems.length === 0

  const [getCartProducts, { data, error, loading }] = useCartProductsLazyQuery({
    variables: {
      input: cartItems
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      console.log('fetch cart items')

      if (data) {
        const totalSumm = data.cartProducts.reduce(
          (previousValue: number, item: CartItemType) =>
            previousValue + item.currentPrice * normalizedCart[item.id],
          0
        )

        setCartPrice(totalSumm)
      }
    }
  })

  useEffect(() => {
    console.log('mount')
    if (isOpen && !isCartEmpty) getCartProducts()

    return () => {
      console.log('unmount')
    }
  }, [getCartProducts, isOpen, isCartEmpty])

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

  const handleProductRemove = (id: string): void => {
    removeCartItem(id)
  }

  return (
    <div className={styles.wrapper}>
      <CartHead onCartClose={onClose} />
      {loading ? (
        <ListSkeleton max={3} itemsAmount={cartItems.length} />
      ) : (
        <ul className={styles.list}>
          {data?.cartProducts.map((product: CartItemType) => (
            <CartItem
              key={product.id}
              amount={normalizedCart[product.id]}
              product={product}
              onRemove={handleProductRemove}
            />
          ))}
        </ul>
      )}
      <Summary loading={loading} onCheckout={handleCheckout} />
    </div>
  )
}
