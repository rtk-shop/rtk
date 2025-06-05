import { useQuery, UseQueryArgs } from 'urql'
import * as orders from './graphql/_gen_/orders.query'

export function useOrders(options?: Omit<UseQueryArgs<orders.OrdersQueryVariables>, 'query'>) {
  return useQuery<orders.OrdersQuery, orders.OrdersQueryVariables>({
    query: orders.OrdersDocument,
    ...options
  })
}
