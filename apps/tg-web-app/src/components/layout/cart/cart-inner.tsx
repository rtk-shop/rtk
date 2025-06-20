import { Summary } from './summary'
import { ProcessPlug } from './plug'
import { ListSkeleton } from './list-skeleton'
import { CartHead } from './head'
import { CartItem } from '@/components/cart-item'
import { routeNames } from '@/lib/routes'
import { useRouter } from 'next/navigation'
import { useCartQuery } from '@/lib/api/hooks'
import { useTranslations } from 'next-intl'
import { useAppState } from '@/stores/app/store'

export function CartInner() {
  const router = useRouter()
  const t = useTranslations('Common')

  const closeCart = useAppState((state) => state.closeCart)

  const [result] = useCartQuery()

  const { data, fetching, error } = result

  const handleCheckout = (): void => {
    closeCart()
    router.push(routeNames.checkout)
  }

  let productsAmount = 0

  const cartPrice = data?.cartProducts.reduce((acc, item) => {
    productsAmount += item.quantity
    return item.product.currentPrice * item.quantity + acc
  }, 0)

  if (error) {
    return <ProcessPlug text={t('cart.errorMsg')} onClose={closeCart} />
  }

  if (!fetching && !data?.cartProducts.length) {
    return <ProcessPlug text={t('cart.emptyMsg')} onClose={closeCart} />
  }

  return (
    <div className="flex h-full flex-col">
      <CartHead quantity={productsAmount} onCartClose={closeCart} />
      {fetching ? (
        <ListSkeleton len={3} />
      ) : (
        <ul className="scroll-bar grow overflow-y-auto px-2.5 pt-5">
          {data?.cartProducts.map((cartItem) => (
            <CartItem key={cartItem.id} quantity={cartItem.quantity} product={cartItem.product} />
          ))}
        </ul>
      )}
      <Summary loading={fetching} totalSum={cartPrice} onCheckout={handleCheckout} />
    </div>
  )
}
