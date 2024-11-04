import { CartItems } from './cart-items'
import { Summary } from './summary'
import { Promo } from './promo'
import { useCartStore } from '@/providers/cart-store-provider'
import { useQuery } from 'urql'
import {
  CartProductsQuery,
  CartProductsQueryVariables,
  CartProductsDocument
} from '@/lib/api/graphql/_gen_/cartProducts.query'

interface PreviewProps {
  submitLoading: boolean
  orderCreationErr: boolean
}

export function Preview({ submitLoading, orderCreationErr }: PreviewProps) {
  const [cartItems] = useCartStore((state) => state.cartItems)

  const [result] = useQuery<CartProductsQuery, CartProductsQueryVariables>({
    query: CartProductsDocument,
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
    <section className="pt-4">
      <div className="rounded-lg bg-white px-2.5">
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
