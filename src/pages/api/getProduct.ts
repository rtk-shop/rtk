import client from '@/apollo/client'
import {
  GetProductQuery,
  GetProductQueryVariables,
  GetProductDocument
} from '@/graphql/product/_gen_/product.query'

type QueryProductData = Extract<GetProductQuery['product'], { __typename: 'Product' }>
type QueryNotFoundData = Extract<GetProductQuery['product'], { __typename: 'NotFound' }>

export type QueryResult = QueryProductData | QueryNotFoundData | null | undefined

export default async function handler(id: string): Promise<QueryResult> {
  const { data } = await client.query<GetProductQuery, GetProductQueryVariables>({
    query: GetProductDocument,
    variables: { id }
  })

  return data.product
}
