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

import styles from './styles.module.scss'

interface PreviewProps {
  submitLoading: boolean
  orderCreationErr: boolean
}

export function Preview({ submitLoading, orderCreationErr }: PreviewProps) {
  const cartItems = useCartStore((state) => state.cartItems)

  const [l, setl] = useState(true)

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
          setTimeout(() => {
            setl(false)
          }, 1500)
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
