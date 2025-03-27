import { gql } from 'urql'
import type { DataFields, Variables, Cache, ResolveInfo } from '@urql/exchange-graphcache'

import type { RejectOrderMutation } from '@/lib/api/graphql/_gen_/rejectOrder.mutation'

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

  // trigger user orders query
  cache.invalidate('Query', 'userOrders')
}

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
