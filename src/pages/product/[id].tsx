import { ParsedUrlQuery } from 'querystring'
import getProduct, { QueryResult } from '../api/getProduct'
import { ProductIndex } from '@/components/views/product'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { productIdFromSlug } from '@/utils/navigation'

interface Params extends ParsedUrlQuery {
  id: string
}

export const getServerSideProps: GetServerSideProps<{
  product: QueryResult
  err: boolean
}> = async (ctx) => {
  const params = ctx.params as Params
  const slugURL = params.id

  let err = false
  let data: QueryResult

  try {
    const productId = productIdFromSlug(slugURL)
    data = await getProduct(productId)
  } catch (error) {
    err = true
  }

  return {
    props: {
      product: data,
      err
    }
  }
}

export default function Product({
  product,
  err
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!product || err) {
    return (
      <div>
        <h1>No product</h1>
      </div>
    )
  }

  if (product.__typename === 'NotFound') {
    return (
      <div>
        <h1>No product found</h1>
      </div>
    )
  }

  return <ProductIndex product={product} />
}
