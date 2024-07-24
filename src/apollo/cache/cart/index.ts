import { apolloClient as client } from '../../ssr'
import type { CartItem, NewCartItem } from './types'
import { type StoreObject } from '@apollo/client'

const __TYPE_NAME = 'CartItem'

import { getCartItemGQL, writeCartItemsGQL } from './queries'
import { useCartStore } from '@/store/cart'

export { READ_CART_ITEMS } from './queries'
export { useCartPrice } from './hooks'

export function setCartItems(data: NewCartItem[]) {
  const cacheCartData = data.map((p) => ({
    __typename: __TYPE_NAME,
    // __ref: p.__typename + ':' + p.id,
    id: p.productId,
    ...p
  }))

  client.writeQuery({
    query: writeCartItemsGQL,
    data: {
      cartItems: cacheCartData
    }
  })
}

export function addToCart(item: NewCartItem) {
  console.log('new', item)

  const data = client.readFragment<CartItem | null>({
    id: __TYPE_NAME + ':' + item.productId,
    fragment: getCartItemGQL
  })

  if (data) {
    console.log('update existing cart item', item.productId)

    client.cache.modify({
      id: client.cache.identify(data),
      fields: {
        amount(currentAmount) {
          return currentAmount + item.amount
        }
      }
    })
  }
  // ..else: new item will be created by "local logic" and placed into cache in <Cart />

  useCartStore.getState().addItem({ productId: item.productId, amount: item.amount })
}

export function updateItemAmount(id: string, newAmount: number) {
  client.cache.modify({
    id: __TYPE_NAME + ':' + id,
    fields: {
      amount() {
        return newAmount
      }
    }
  })

  useCartStore.getState().updateAmount(id, newAmount)
}

export function removeFromCart(id: string) {
  const idToRemove = client.cache.identify({ id: id, __typename: __TYPE_NAME })

  client.cache.modify({
    fields: {
      cartItems(existingCartItems) {
        return existingCartItems.filter(
          (itemRef: StoreObject) => idToRemove !== client.cache.identify(itemRef)
        )
      }
    }
  })

  client.cache.evict({ id: idToRemove })

  useCartStore.getState().remove(id)
}

export function clearCart() {
  client.cache.modify({
    fields: {
      cartItems(existingCartItems, { DELETE }) {
        return DELETE
      }
    }
  })

  client.cache.gc() // remove unreachable CartItem[ID] from cahche after ROOT_QUERY:cartItems

  useCartStore.getState().clear()
}
