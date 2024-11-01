import { CartItems } from './cart-items'
import { Summary } from './summary'
import { Promo } from './promo'
import { useCartStore } from '@/providers/cart-store-provider'
import { useCartProductsQuery } from '@/graphql/product/_gen_/cartProducts.query'

import styles from './styles.module.scss'

interface PreviewProps {
  submitLoading: boolean
  orderCreationErr: boolean
}

export function Preview({ submitLoading, orderCreationErr }: PreviewProps) {
  const cartItems = useCartStore((state) => state.cartItems)

  const { data, loading, error } = useCartProductsQuery({
    variables: {
      input: cartItems
    }
  })

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
