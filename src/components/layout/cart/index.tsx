import { memo } from 'react'
import { Drawer } from '@/components/layout/drawer'
import { Summary } from './summary'
import { ProcessPlug } from './plug'
import { ListSkeleton } from './list-skeleton'
import { CartHead } from './head'
import { CartItem, CartItemType } from '@/components/cart-item'
import { useCartStore } from '@/providers/cart-store-provider'
import { normalizedView } from '@/stores/cart/store'
import { routeNames } from '@/lib/constants'
import { useRouter } from 'next/navigation'
import { useQuery } from 'urql'
import {
  CartProductsDocument,
  CartProductsQuery,
  CartProductsQueryVariables
} from '@/lib/api/graphql/_gen_/cartProducts.query'
import { useTranslations } from 'next-intl'

interface CartProps {
  isOpen: boolean
  onClose(): void
}

export const Cart = memo(function Cart({ isOpen, onClose }: CartProps) {
  return (
    <Drawer position="right" onClose={onClose} open={isOpen}>
      <div className="h-dvh w-screen overflow-hidden bg-white md:max-w-[400px]">
        <CartInner onClose={onClose} />
      </div>
    </Drawer>
  )
})

export function CartInner({ onClose }: { onClose(): void }) {
  const router = useRouter()
  const t = useTranslations('Common')

  const [cartItems] = useCartStore((state) => state.cartItems)
  const itemsMap = normalizedView(cartItems)

  const isCartEmpty = !cartItems.length

  const [result] = useQuery<CartProductsQuery, CartProductsQueryVariables>({
    query: CartProductsDocument,
    pause: isCartEmpty,
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
      <Summary loading={fetching} currency={41.2} onCheckout={handleCheckout} />
    </div>
  )
}
