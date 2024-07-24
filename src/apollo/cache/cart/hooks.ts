import { useQuery } from '@apollo/client'
import { READ_CART_ITEMS } from './queries'
import { CartItemsRespone } from './types'
import { normalizedView } from '@/store/cart'

export const useCartPrice = (): number => {
  const { data } = useQuery<CartItemsRespone>(READ_CART_ITEMS, {
    fetchPolicy: 'cache-only'
  })

  if (data) {
    const itemsMap = normalizedView(data.cartItems)

    return data.cartItems.reduce(
      (previousValue, item) => previousValue + item.price * itemsMap[item.id],
      0
    )
  }

  return 0
}
