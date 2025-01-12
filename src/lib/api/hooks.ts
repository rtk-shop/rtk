import { useQuery, useMutation, UseQueryArgs } from 'urql'

import {
  CartProductsQuery,
  CartProductsQueryVariables,
  CartProductsDocument
} from './graphql/_gen_/cartProducts.query'

import {
  CreateOrderMutation,
  CreateOrderMutationVariables,
  CreateOrderDocument
} from './graphql/_gen_/createOrder.mutation'

import {
  RejectOrdeMutation,
  RejectOrdeMutationVariables,
  RejectOrdeDocument
} from './graphql/_gen_/rejectOrder.mutation'

export function useCartQuery(options: Omit<UseQueryArgs<CartProductsQueryVariables>, 'query'>) {
  return useQuery<CartProductsQuery, CartProductsQueryVariables>({
    query: CartProductsDocument,
    ...options
  })
}

export function useCreateOrderMutation() {
  return useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument)
}

export function useRejectOrderMutation() {
  return useMutation<RejectOrdeMutation, RejectOrdeMutationVariables>(RejectOrdeDocument)
}
