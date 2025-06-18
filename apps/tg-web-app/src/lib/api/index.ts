import { gql } from 'urql'
import { getClient } from './urql-ssr-client'

import * as GetProduct from './graphql/_gen_/product.query'
import * as FavouriteProducts from './graphql/_gen_/userFavouriteProducts.query'

export async function getProduct(id: string) {
  const result = await getClient().query<
    GetProduct.GetProductQuery,
    GetProduct.GetProductQueryVariables
  >(GetProduct.GetProductDocument, { id })

  return result.data
}

export async function getFavouriteProductsId(): Promise<string[]> {
  // INFO: __typename Product has only id field
  const result = await getClient().query<FavouriteProducts.UserFavouriteProductsQuery>(
    gql`
      query UserFavouriteProducts {
        userFavouriteProducts {
          __typename
          id
        }
      }
    `,
    {}
  )

  let productIDs: string[] = []

  if (result.data) {
    productIDs = result.data.userFavouriteProducts.map((product) => product.id)
  }

  return productIDs
}
