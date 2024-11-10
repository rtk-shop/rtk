import { registerUrql } from '@urql/next/rsc'
import { cacheExchange, createClient, fetchExchange, useQuery, UseQueryArgs } from 'urql'

import {
  GetProductQuery,
  GetProductDocument,
  GetProductQueryVariables
} from './graphql/_gen_/product.query'

import {
  CartProductsQuery,
  CartProductsQueryVariables,
  CartProductsDocument
} from './graphql/_gen_/cartProducts.query'

const makeClient = () => {
  return createClient({
    url: process.env.NEXT_PUBLIC_API_HOST + '/graphql',
    exchanges: [cacheExchange, fetchExchange]
  })
}

const { getClient } = registerUrql(makeClient)

export async function getProduct(id: string) {
  const result = await getClient().query<GetProductQuery, GetProductQueryVariables>(
    GetProductDocument,
    { id }
  )

  return result.data
}

export function useCartQuery(options: Omit<UseQueryArgs<CartProductsQueryVariables>, 'query'>) {
  return useQuery<CartProductsQuery, CartProductsQueryVariables>({
    query: CartProductsDocument,
    ...options
  })
}
