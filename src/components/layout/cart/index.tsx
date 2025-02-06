import { memo } from 'react'
import { Drawer } from '@/components/ui/drawer'
import { Summary } from './summary'
import { ProcessPlug } from './plug'
import { ListSkeleton } from './list-skeleton'
import { CartHead } from './head'
import { CartItem } from '@/components/cart-item'
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
  const t = useTranslations('Common')

  const router = useRouter()
  const [result] = useCartQuery()

  const { data, fetching, error } = result

  const handleCheckout = (): void => {
    onClose()
    router.push(routeNames.checkout)
  }

  let productsAmount = 0

  const cartPrice = data?.cartProducts.reduce((acc, item) => {
    productsAmount += item.quantity
    return item.product.currentPrice * item.quantity + acc
  }, 0)

  if (error) {
    return <ProcessPlug text={t('cart.errorMsg')} onClose={onClose} />
  }

  if (!fetching && !data?.cartProducts.length) {
    return <ProcessPlug text={t('cart.emptyMsg')} onClose={onClose} />
  }

  return (
    <div className="flex h-full flex-col">
      <CartHead quantity={productsAmount} onCartClose={onClose} />
      {fetching ? (
        <ListSkeleton len={3} />
      ) : (
        <ul className="scroll-bar grow overflow-y-auto px-2.5 pt-5">
          {data?.cartProducts.map((cartItem) => (
            <CartItem
              key={cartItem.product.id}
              quantity={cartItem.quantity}
              product={cartItem.product}
            />
          ))}
        </ul>
      )}
      <Summary loading={fetching} totalSum={cartPrice} onCheckout={handleCheckout} />
    </div>
  )
}
