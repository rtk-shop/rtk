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

export function useCartQuery(options: Omit<UseQueryArgs<CartProductsQueryVariables>, 'query'>) {
  return useQuery<CartProductsQuery, CartProductsQueryVariables>({
    query: CartProductsDocument,
    ...options
  })
}

export function useCreateOrderMutation() {
  return useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument)
}
