import { Icon } from '@/components/ui/icon'
import { CartItems } from './cart-items'
import { Summary } from './summary'
// import { Promo } from './promo'
import { useCartQuery } from '@/lib/api/hooks'
import { usePageState } from '../model/state'

interface PreviewProps {
  submitLoading: boolean
}

export function Preview({ submitLoading }: PreviewProps) {
  const onErrorDrawerOpen = usePageState((state) => state.onErrorDrawerOpen)

  const [result] = useCartQuery()

  const { error, fetching, data } = result

  if (error) {
    onErrorDrawerOpen(true)
    return (
      <div className="mt-20 flex justify-center px-4">
        <Icon name="common/emptycart" className="fill-black text-[280px]" />
      </div>
    )
  }

  const cartPrice = data?.cartProducts.reduce(
    (acc, item) => item.product.currentPrice * item.quantity + acc,
    0
  )

  return (
    <section className="pt-4">
      <div className="rounded-lg bg-white px-2.5">
        <CartItems loading={fetching} cartProducts={data?.cartProducts || []} />
        <Summary totalSum={cartPrice} loading={fetching} submitLoading={submitLoading} />
      </div>
      {/* <Promo /> */}
    </section>
  )
}
