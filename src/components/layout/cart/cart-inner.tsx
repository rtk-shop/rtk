import { Box } from '@/components/ui/box'
import { CartHead } from './head'
import { Summary } from './summary'
import { EmptyCartPlug } from './empty-cart-plug'
import { ErrorCartPlug } from './error-cart-plug'
import { ListSkeleton } from './list-skeleton'
import { CartItem } from '@/components/cart/item'
import { useCartQuery } from '@/lib/api/hooks'

export function CartInner() {
  const [{ data, fetching, error }] = useCartQuery()

  let productsAmount = 0

  const cartPrice = data?.cartProducts.reduce((acc, item) => {
    productsAmount += item.quantity
    return item.product.currentPrice * item.quantity + acc
  }, 0)

  if (error) return <ErrorCartPlug />

  if (!fetching && !data?.cartProducts.length) return <EmptyCartPlug />

  return (
    <Box flex="col" className="h-full">
      <CartHead quantity={productsAmount} />
      {fetching ? (
        <ListSkeleton len={3} />
      ) : (
        <ul className="scroll-bar grow overflow-y-auto px-2.5 pt-5">
          {data?.cartProducts.map((cartItem) => (
            <CartItem key={cartItem.id} quantity={cartItem.quantity} product={cartItem.product} />
          ))}
        </ul>
      )}
      <Summary loading={fetching} totalSum={cartPrice} />
    </Box>
  )
}
