import { ReactElement } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { ParsedUrlQuery } from 'querystring'
import { ProductIndex } from '@/components/views/product'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
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

const productIdFromSlug = (slugURL: string): string => {
  const slug = slugURL.match(/i__(.*)/)

  if (slug === null) {
    throw new Error('no slug matched')
  }

  const slugSide = slug[0]

  return slugURL.substring(0, slugURL.length - slugSide.length)
}

export const getServerSideProps: GetServerSideProps<{
  productID: string
  initialApolloState: ApolloInitState
}> = async (ctx) => {
  const { id } = ctx.params as Params
  const client = initializeApollo()
  const cookies = ctx.req.cookies

  const sessionToken = cookies['session']

  const productId = productIdFromSlug(id)
  const { data } = await client.query<GetProductQuery, GetProductQueryVariables>({
    query: GetProductDocument,
    variables: { id: productId },
    context: {
      headers: {
        Authorization: sessionToken ? 'Bearer ' + sessionToken : null
      }
    }
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
