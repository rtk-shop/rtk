import { useState } from 'react'
import { CartItems } from './cart-items'
import { Summary } from './summary'
import { Promo } from './promo'
import { useQuery } from '@apollo/client'
import { useCartStore } from '@/store/cart'
import {
  CartProductsDocument,
  CartProductsQuery,
  CartProductsQueryVariables
} from '@/graphql/product/_gen_/cartProducts.query'
import type { CartItemType } from '@/components/cart-item'

import styles from './styles.module.scss'

interface PreviewProps {
  submitLoading: boolean
  orderCreationErr: boolean
}

export function Preview({ submitLoading, orderCreationErr }: PreviewProps) {
  const cartItems = useCartStore((state) => state.cartItems)
  const setCartPrice = useCartStore((state) => state.setCartPrice)

  const [l, setl] = useState(true)

  const cartMap: Record<string, number> = {}

  const normalizedCart = cartItems.reduce((acc, item) => {
    if (acc[item.productId]) {
      acc[item.productId] = acc[item.productId] += item.amount
      return acc
    }

    acc[item.productId] = item.amount
    return acc
  }, cartMap)

  const { data, loading, error } = useQuery<CartProductsQuery, CartProductsQueryVariables>(
    CartProductsDocument,
    {
      variables: {
        input: cartItems
      },
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        if (data) {
          const totalSumm = data.cartProducts.reduce(
            (previousValue: number, item: CartItemType) =>
              previousValue + item.currentPrice * normalizedCart[item.id],
            0
          )

          setTimeout(() => {
            setl(false)
            setCartPrice(totalSumm)
          }, 2000)
        }
      }
    }
  )

  if (error) {
    // TODO: handle error
    return <h1>Error</h1>
  }

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <CartItems
          loading={l}
          cartCount={cartItems.length}
          cartProducts={data?.cartProducts || []}
        />
        <Summary loading={l} submitLoading={submitLoading} orderCreationErr={orderCreationErr} />
      </div>
      <Promo />
    </section>
  )
}
