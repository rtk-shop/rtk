import { ReactElement } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
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
import { NextPageWithLayout } from '../_app'

interface Params extends ParsedUrlQuery {
  id: string
}

export const getServerSideProps: GetServerSideProps<{
  productID: string
  initialApolloState: ApolloInitState
}> = async (ctx) => {
  const { id } = ctx.params as Params
  const client = initializeApollo()

  const productId = productIdFromSlug(id)
  const { data } = await client.query<GetProductQuery, GetProductQueryVariables>({
    query: GetProductDocument,
    variables: { id: productId }
  })

  if (data.product.__typename === 'NotFound') {
    return {
      notFound: true
    }
  }

  return {
    props: {
      productID: productId,
      initialApolloState: client.cache.extract()
    }
  }
}

type PageProps = NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>>

const Product: PageProps = ({ productID }) => {
  return <ProductIndex productID={productID} />
}

Product.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>
}

export default Product
