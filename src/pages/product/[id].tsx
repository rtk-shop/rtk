import { ParsedUrlQuery } from 'querystring'
import getProduct, { QueryResult } from '../api/getProduct'
import { ProductIndex } from '@/components/views/product'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { productIdFromSlug } from '@/utils/navigation'

function getRandomRating(): number {
  const min = 3
  const max = 5
  return Math.floor(Math.random() * (max - min + 1) + min)
}

interface Params extends ParsedUrlQuery {
  id: string
}

interface TodoProps {
  rating: number
}

export const getServerSideProps: GetServerSideProps<{
  product: QueryResult
  todo: TodoProps
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

  // TODO: no rating there
  const todo = {
    rating: getRandomRating()
  }

  return {
    props: {
      product: data,
      todo,
      err
    }
  }
}

export default function Product({
  product,
  todo,
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

  return <ProductIndex product={product} todo={todo} />
}
