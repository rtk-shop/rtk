import { gql } from 'urql'
import type { DataFields, Variables, Cache, ResolveInfo } from '@urql/exchange-graphcache'
import type { CartProduct } from '@/lib/api/graphql/types'

import type { AddCartItemMutation } from '@/lib/api/graphql/cart/_gen_/add-item.mutation'
import type { RemoveCartItemMutation } from '@/lib/api/graphql/cart/_gen_/remove-item.mutation'
import type { ReduceCartItemQuantityMutation } from '@/lib/api/graphql/cart/_gen_/reduce-item-quantity.mutation'

export const addCartItem = (
  result: AddCartItemMutation, // or DataFields from '@urql/exchange-graphcache' by default
  _args: Variables,
  cache: Cache,
  _info: ResolveInfo
): void => {
  const CartProducts = gql`
    {
      cartProducts {
        id
        quantity
        product {
          id
        }
      }
    }
  `
  const resp = result.addCartItem

  const cacheEntity = cache.resolve({ __typename: 'CartProduct', id: resp.productId }, 'id')
  if (cacheEntity) {
    cache.writeFragment(
      gql`
        fragment _ on CartProduct {
          id
          quantity
          product {
            id
          }
        }
      `,
      {
        quantity: resp.quantity,
        id: resp.productId
      }
    )
  } else {
    cache.updateQuery({ query: CartProducts }, (data) => {
      if (!data) return data
      return {
        cartProducts: [
          {
            __typename: 'CartProduct',
            id: resp.productId,
            quantity: resp.quantity,
            product: {
              __typename: 'Product',
              id: resp.productId
            }
          },
          ...data.cartProducts
        ]
      }
    })
  }
}

export const removeCartItem = (
  result: RemoveCartItemMutation,
  _args: Variables,
  cache: Cache,
  _info: ResolveInfo
): void => {
  const CartProducts = gql`
    {
      cartProducts {
        id
        quantity
        product {
          id
          title
        }
      }
    }
  `

  const resp = result.removeCartItem

  cache.updateQuery({ query: CartProducts }, (data) => {
    if (!data) return data

    return {
      cartProducts: [...data.cartProducts.filter((item: CartProduct) => item.id !== resp.productId)]
    }
  })
}

export const reduceCartItemQuantity = (
  result: ReduceCartItemQuantityMutation,
  _args: Variables,
  cache: Cache,
  _info: ResolveInfo
): void => {
  const fragment = gql`
    fragment _ on CartProduct {
      id
      quantity
    }
  `

  const resp = result.reduceCartItemQuantity

  cache.writeFragment(fragment, {
    quantity: resp.quantity,
    id: resp.productId
  })
}

export const clearCart = (
  _result: DataFields,
  _args: Variables,
  cache: Cache,
  _info: ResolveInfo
): void => {
  const CartProducts = gql`
    {
      cartProducts {
        id
        quantity
      }
    }
  `

  cache.updateQuery({ query: CartProducts }, (data) => {
    if (!data) return data
    return {
      cartProducts: []
    }
  })
}
