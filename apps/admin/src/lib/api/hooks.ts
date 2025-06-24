import { useMutation, useQuery, type UseQueryArgs } from 'urql'

import * as order from '@/lib/api/graphql/_gen_/order.query'
import * as orders from './graphql/_gen_/orders.query'
import * as processOrder from './graphql/_gen_/process-order.mutation'
import * as createProduct from './graphql/_gen_/create-product.mutation'

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

export function useOrder(options: Omit<UseQueryArgs<order.OrderByIdQueryVariables>, 'query'>) {
  return useQuery<order.OrderByIdQuery, order.OrderByIdQueryVariables>({
    query: order.OrderByIdDocument,
    ...options
  })
}

export function useCreateProductMutation() {
  return useMutation<
    createProduct.CreateProductMutation,
    createProduct.CreateProductMutationVariables
  >(createProduct.CreateProductDocument)
}
