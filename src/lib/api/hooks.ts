import { useQuery, UseQueryArgs } from 'urql'

import {
  CartProductsQuery,
  CartProductsQueryVariables,
  CartProductsDocument
} from './graphql/_gen_/cartProducts.query'

export function useCartQuery(options: Omit<UseQueryArgs<CartProductsQueryVariables>, 'query'>) {
  return useQuery<CartProductsQuery, CartProductsQueryVariables>({
    query: CartProductsDocument,
    ...options
  })
}
