import { gql } from 'urql'
import { cacheExchange as Exchange } from '@urql/exchange-graphcache'

import { addCartItem, removeCartItem, reduceCartItemQuantity, clearCart } from './mutations/cart'
import { createOrder, rejectOrder } from './mutations/order'
import { addFavouriteProduct, removeFavouriteProduct } from './mutations/favourites'

export const cacheExchange = Exchange({
  optimistic: {
    removeFavouriteProduct(args, _cache, _info) {
      return {
        __typename: 'RemoveFavouritePayload',
        productId: args.productId
      }
    },
    addFavouriteProduct(args, _cache, _info) {
      return {
        __typename: 'AddFavouritePayload',
        productId: args.productId
      }
    },
    removeCartItem(args, _cache, _info) {
      return {
        __typename: 'RemoveCartItemPayload',
        productId: args.productId
      }
    },
    reduceCartItemQuantity(args, cache, _info) {
      const cacheEntity = cache.readFragment(
        gql`
          fragment _ on CartProduct {
            id
            quantity
          }
        `,
        {
          id: args.productId
        }
      ) as { id: string; quantity: number }

      return {
        __typename: 'CartItem',
        productId: args.productId,
        quantity: cacheEntity.quantity - 1
      }
    },
    clearCart(_args, _cache, _info) {
      return {
        __typename: 'ClearCartPayload',
        cartId: -1 // info: because backed desno provide cartID for client
      }
    }
  },
  updates: {
    // mutation resolvers aren't bind with "this" context
    Mutation: {
      rejectOrder,
      addFavouriteProduct,
      removeFavouriteProduct,
      addCartItem,
      reduceCartItemQuantity,
      removeCartItem,
      clearCart,
      createOrder
    }
  }
})
