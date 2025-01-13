import { cacheExchange as Exchange } from '@urql/exchange-graphcache'
import { rejectOrderCacheMutation } from './mutations'

export const cacheExchange = Exchange({
  updates: {
    Mutation: {
      // mutation resolvers aren't bind with "this" context
      rejectOrder: rejectOrderCacheMutation
    }
  }
})
