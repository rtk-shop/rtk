import type { DataFields, Variables, Cache, ResolveInfo } from '@urql/exchange-graphcache'
import { InitSoleProprietorPaymentMutation } from '@/lib/api/graphql/_gen_/initSoleProprietorPayment.mutation'

import { GetOrderPaymentDocument } from '@/lib/api/graphql/_gen_/orderPayment.query'

export const initSoleProprietorPayment = (
  result: InitSoleProprietorPaymentMutation,
  _args: Variables,
  cache: Cache,
  _info: ResolveInfo
): void => {
  const resData = result.initSoleProprietorPayment

  cache.updateQuery(
    {
      query: GetOrderPaymentDocument,
      variables: {
        orderId: resData.orderId
      }
    },
    (_data: unknown) => {
      return {
        orderPayment: {
          __typename: 'Payment',
          id: resData.id,
          price: resData.price,
          status: resData.status,
          orderId: resData.orderId
        }
      }
    }
  )
}
