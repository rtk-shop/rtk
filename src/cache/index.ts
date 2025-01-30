import { cacheExchange as Exchange } from '@urql/exchange-graphcache'
import { rejectOrder, addFavouriteProduct, removeFavouriteProduct } from './mutations'

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
    }
  },
  updates: {
    // mutation resolvers aren't bind with "this" context
    Mutation: {
      rejectOrder,
      addFavouriteProduct,
      removeFavouriteProduct
    }
  }
})
