import { gql } from 'urql'
import type { DataFields, Variables, Cache, ResolveInfo } from '@urql/exchange-graphcache'
import type { FavouriteProductsCacheQuery } from './types'
import { RejectOrderMutation } from '@/lib/api/graphql/_gen_/rejectOrder.mutation'

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

export const removeFavouriteProduct = (
  _result: DataFields,
  args: Variables,
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

  cache.updateQuery<FavouriteProductsCacheQuery>({ query: FavouriteList }, (data) => {
    if (!data) return data

    return {
      userFavouriteProducts: [
        ...data.userFavouriteProducts.filter((product) => product.id !== args.productId)
      ]
    }
  })
}

export const addFavouriteProduct = (
  _result: DataFields,
  args: Variables,
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

  cache.updateQuery<FavouriteProductsCacheQuery>({ query: FavouriteList }, (data) => {
    if (!data) return data

    return {
      userFavouriteProducts: [
        { __typename: 'Product', id: args.productId as string },
        ...data.userFavouriteProducts
      ]
    }
  })
}
