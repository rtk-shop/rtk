import { gql } from 'urql'
import type { DataFields, Variables, Cache, ResolveInfo } from '@urql/exchange-graphcache'

import type { ProcessOrderMutation } from '@/lib/api/graphql/_gen_/process-order.mutation'

export const processOrder = (
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

  const resData = result.processOrder as ProcessOrderMutation['processOrder']

  cache.writeFragment(fragment, {
    id: resData.orderId,
    status: resData.status,
    updatedAt: resData.updatedAt
  })
}
