import { CartItems } from './cart-items'
import { Summary } from './summary'
import { Promo } from './promo'
import { useCartQuery } from '@/lib/api/hooks'
import { type CartItem, normalizedView } from '@/stores/cart/store'

interface PreviewProps {
  submitLoading: boolean
  submitError: boolean
  cartItems: CartItem[]
}

export function Preview({ submitLoading, submitError, cartItems }: PreviewProps) {
  const itemsMap = normalizedView(cartItems)

  const [result] = useCartQuery({
    pause: !cartItems.length,
    variables: {
      input: [...cartItems]
    }
  })

  const { error, fetching, data } = result

  if (error) {
    // TODO: handle error
    return <h1>Error</h1>
  }

  const cartPrice = data?.cartProducts.reduce((acc, p) => p.currentPrice * itemsMap[p.id] + acc, 0)

  return (
    <section className="pt-4">
      <div className="rounded-lg bg-white px-2.5">
        <CartItems loading={fetching} cartProducts={data?.cartProducts || []} />
        <Summary
          totalSum={cartPrice}
          loading={fetching}
          submitLoading={submitLoading}
          submitError={submitError}
        />
      </div>
      <Promo />
    </section>
  )
}
