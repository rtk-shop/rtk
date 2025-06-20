import { cacheExchange as Exchange } from '@urql/exchange-graphcache'

import { processOrder } from './mutations/order'

export const cacheExchange = Exchange({
  updates: {
    Mutation: {
      processOrder
    }
  }
})
