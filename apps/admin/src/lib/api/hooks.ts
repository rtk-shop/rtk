import { useMutation, useQuery, UseQueryArgs } from 'urql'
import * as orders from './graphql/_gen_/orders.query'
import * as processOrder from './graphql/_gen_/process-order.mutation'

export function useOrders(options?: Omit<UseQueryArgs<orders.OrdersQueryVariables>, 'query'>) {
  return useQuery<orders.OrdersQuery, orders.OrdersQueryVariables>({
    query: orders.OrdersDocument,
    ...options
  })
}

export function useProcessOrderMutation() {
  return useMutation<processOrder.ProcessOrderMutation, processOrder.ProcessOrderMutationVariables>(
    processOrder.ProcessOrderDocument
  )
}
