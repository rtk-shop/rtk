import { memo } from 'react'
import { Drawer } from '@/components/ui/drawer'
import { Summary } from './summary'
import { ProcessPlug } from './plug'
import { ListSkeleton } from './list-skeleton'
import { CartHead } from './head'
import { CartItem, CartItemType } from '@/components/cart-item'
import { useCartStore } from '@/providers/cart-store-provider'
import { normalizedView } from '@/stores/cart/store'
import { routeNames } from '@/lib/constants'
import { useRouter } from 'next/navigation'
import { useCartQuery } from '@/lib/api/hooks'
import { useTranslations } from 'next-intl'

interface CartProps {
  isOpen: boolean
  onClose(): void
}

export const Cart = memo(function Cart({ isOpen, onClose }: CartProps) {
  return (
    <Drawer position="right" onClose={onClose} open={isOpen} fullWidth>
      <div className="h-dvh overflow-hidden bg-white">
        <CartInner isOpen={isOpen} onClose={onClose} />
      </div>
    </Drawer>
  )
})

export function CartInner({ isOpen, onClose }: { isOpen: boolean; onClose(): void }) {
  const router = useRouter()
  const t = useTranslations('Common')

  const [cartItems] = useCartStore((state) => state.cartItems)
  const itemsMap = normalizedView(cartItems)

  const isCartEmpty = !cartItems.length

  const [result] = useCartQuery({
    pause: !isOpen || isCartEmpty,
    variables: {
      input: [...cartItems]
    }
  })

  const { data, fetching, error } = result

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

  const cartPrice =
    data?.cartProducts.reduce((acc, p) => p.currentPrice * itemsMap[p.id] + acc, 0) || 0

  return (
    <div className="flex h-full flex-col">
      <CartHead headText={t('cart.topControls.title')} onCartClose={onClose} />
      {fetching ? (
        <ListSkeleton itemsAmount={cartItems.length} />
      ) : (
        <ul className="scroll-bar grow overflow-y-auto px-2.5 pt-5">
          {data?.cartProducts.map((product: CartItemType) => (
            <CartItem key={product.id} amount={itemsMap[product.id]} product={product} />
          ))}
        </ul>
      )}
      <Summary loading={fetching} totalSum={cartPrice} onCheckout={handleCheckout} />
    </div>
  )
}
