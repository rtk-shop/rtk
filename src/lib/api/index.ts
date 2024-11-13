import { registerUrql } from '@urql/next/rsc'
import { cacheExchange, createClient, fetchExchange } from 'urql'

import {
  GetProductQuery,
  GetProductDocument,
  GetProductQueryVariables
} from './graphql/_gen_/product.query'

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
