import { gql } from 'urql'
import { cacheExchange as Exchange } from '@urql/exchange-graphcache'
import { RejectOrdeMutation } from '@/lib/api/graphql/_gen_/rejectOrder.mutation'

export const cacheExchange = Exchange({
  updates: {
    Mutation: {
      rejectOrder(result, _args, cache, _info) {
        // maybe use generated fragment?
        const fragment = gql`
          fragment _ on Order {
            id
            status
            updatedAt
          }
        `

        const resData = result.rejectOrder as RejectOrdeMutation['rejectOrder']

        cache.writeFragment(fragment, {
          id: resData.id,
          status: resData.status,
          updatedAt: resData.updatedAt
        })
      }
    }
  }
})
