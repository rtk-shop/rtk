import { gql } from 'urql'
import type { CartProduct } from '@/lib/api/graphql/types'
import type { DataFields, Variables, Cache, ResolveInfo } from '@urql/exchange-graphcache'
import type { FavouriteProductsCacheQuery } from './types'
import type { AddFavouriteProductMutation } from '@/lib/api/graphql/_gen_/addFavouriteProduct.mutation'
import type { RemoveFavouriteProductMutation } from '@/lib/api/graphql/_gen_/removeFavouriteProduct.mutation'
import type { RejectOrderMutation } from '@/lib/api/graphql/_gen_/rejectOrder.mutation'
import type { AddCartItemMutation } from '@/lib/api/graphql/_gen_/addCartItem.mutation'
import type { ReduceCartItemQuantityMutation } from '@/lib/api/graphql/_gen_/reduceCartItemQuantity.mutation'
import type { RemoveCartItemMutation } from '@/lib/api/graphql/_gen_/removeCartItem.mutation'

export const rejectOrder = (
  result: DataFields,
  _args: Variables,
  cache: Cache,
  _info: ResolveInfo
): void => {
  const fragment = gql`
    fragment _ on Order {
      id
      status
      updatedAt
    }
  `

  const resData = result.rejectOrder as RejectOrderMutation['rejectOrder']

  cache.writeFragment(fragment, {
    id: resData.id,
    status: resData.status,
    updatedAt: resData.updatedAt
  })
}

export const addFavouriteProduct = (
  result: AddFavouriteProductMutation,
  _args: Variables,
  cache: Cache,
  _info: ResolveInfo
): void => {
  const FavouriteList = gql`
    {
      userFavouriteProducts {
        id
      }
    }
  `

  const resp = result.addFavouriteProduct

  cache.updateQuery<FavouriteProductsCacheQuery>({ query: FavouriteList }, (data) => {
    if (!data) return data

    return {
      userFavouriteProducts: [
        { __typename: 'Product', id: resp.productId },
        ...data.userFavouriteProducts
      ]
    }
  })
}

export const removeFavouriteProduct = (
  result: RemoveFavouriteProductMutation,
  _args: Variables,
  cache: Cache,
  _info: ResolveInfo
): void => {
  const FavouriteList = gql`
    {
      userFavouriteProducts {
        id
      }
    }
  `

  const resp = result.removeFavouriteProduct

  cache.updateQuery<FavouriteProductsCacheQuery>({ query: FavouriteList }, (data) => {
    if (!data) return data

    return {
      userFavouriteProducts: [
        ...data.userFavouriteProducts.filter((product) => product.id !== resp.productId)
      ]
    }
  })
}

export const addCartItem = (
  result: AddCartItemMutation,
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

export const createOrder = (
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

  // clear cart after order creation
  cache.updateQuery({ query: CartProducts }, (data) => {
    if (!data) return data
    return {
      cartProducts: []
    }
  })
}
