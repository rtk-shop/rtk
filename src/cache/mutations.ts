import { gql } from 'urql'
import { RejectOrdeMutation } from '@/lib/api/graphql/_gen_/rejectOrder.mutation'
import type { DataFields, Variables, Cache, ResolveInfo } from '@urql/exchange-graphcache'

export const rejectOrderCacheMutation = (
  result: DataFields,
  _args: Variables,
  cache: Cache,
  _info: ResolveInfo
): void => {
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
