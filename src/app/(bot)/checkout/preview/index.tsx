import { CartItems } from './cart-items'
import { Summary } from './summary'
import { Promo } from './promo'
import { useCartQuery } from '@/lib/api/hooks'
import { type CartItem, normalizedView } from '@/stores/cart/store'
import { usePageState } from '../model/state'
import { Icon } from '@/components/ui/icon'

interface PreviewProps {
  submitLoading: boolean
  submitError: boolean
  cartItems: CartItem[]
}

export function Preview({ submitLoading, submitError, cartItems }: PreviewProps) {
  const itemsMap = normalizedView(cartItems)

  const onErrorModal = usePageState((state) => state.onErrorModal)

  const [result] = useCartQuery({
    pause: !cartItems.length,
    variables: {
      input: [...cartItems]
    }
  })

  const { error, fetching, data } = result

  if (error) {
    onErrorModal(true)
    return (
      <div className="mt-20 flex justify-center px-4">
        <Icon name="common/emptycart" className="fill-black text-[280px]" />
      </div>
    )
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
