import { gql } from 'urql'
import type { Variables, Cache, ResolveInfo } from '@urql/exchange-graphcache'
import type { FavouriteProductsCacheQuery } from '../types'

import type { AddFavouriteProductMutation } from '@/lib/api/graphql/_gen_/addFavouriteProduct.mutation'
import type { RemoveFavouriteProductMutation } from '@/lib/api/graphql/_gen_/removeFavouriteProduct.mutation'

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
