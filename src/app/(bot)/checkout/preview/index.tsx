import { CartItems } from './cart-items'
import { Summary } from './summary'
import { Promo } from './promo'
import { useCartStore } from '@/providers/cart-store-provider'
import styles from './styles.module.scss'
import { useQuery } from 'urql'
import {
  CartProductsQuery,
  CartProductsQueryVariables,
  CartProductsDocument
} from '@/lib/api/graphql/_gen_/cartProducts.query'
import { useEffect } from 'react'

interface PreviewProps {
  submitLoading: boolean
  orderCreationErr: boolean
}

export function Preview({ submitLoading, orderCreationErr }: PreviewProps) {
  const [cartItems] = useCartStore((state) => state.cartItems)

  const [result, getCart] = useQuery<CartProductsQuery, CartProductsQueryVariables>({
    query: CartProductsDocument,
    // pause: isCartEmpty,
    pause: !cartItems.length,
    variables: {
      input: [...cartItems]
    }
  })

  const { error, fetching: loading, data } = result

  console.log(data)

  if (error) {
    // TODO: handle error
    return <h1>Error</h1>
  }

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <CartItems loading={loading} cartProducts={data?.cartProducts || []} />
        <Summary
          loading={loading}
          submitLoading={submitLoading}
          orderCreationErr={orderCreationErr}
        />
      </div>
      <Promo />
    </section>
  )
}
