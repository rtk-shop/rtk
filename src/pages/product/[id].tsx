import { ParsedUrlQuery } from 'querystring'
import { ProductIndex } from '@/components/views/product'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { productIdFromSlug } from '@/utils/navigation'
import {
  GetProductQuery,
  GetProductQueryVariables,
  GetProductDocument
} from '@/graphql/product/_gen_/product.query'
import { type ApolloInitState, initializeApollo } from '@/apollo/ssr'

interface Params extends ParsedUrlQuery {
  id: string
}

export const getServerSideProps: GetServerSideProps<{
  productID: string
  initialApolloState: ApolloInitState
}> = async (ctx) => {
  const { id } = ctx.params as Params
  const client = initializeApollo()

  let productId: string = ''

  try {
    productId = productIdFromSlug(id)
    await client.query<GetProductQuery, GetProductQueryVariables>({
      query: GetProductDocument,
      variables: { id: productId }
    })
  } catch (error) {
    return {
      props: {
        productID: productId,
        initialApolloState: null
      }
    }
  }

  return {
    props: {
      productID: productId,
      initialApolloState: client.cache.extract()
    }
  }
}

export default function Product({
  productID
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <ProductIndex productID={productID} />
}
