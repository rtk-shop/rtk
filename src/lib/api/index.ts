import { cookies } from 'next/headers'
import { SESSION_COOKIE_NAME } from '../session'

import { registerUrql } from '@urql/next/rsc'
import { ssrExchange } from '@urql/next'
import { cacheExchange, createClient, fetchExchange, gql } from 'urql'
import { authExchange } from '@urql/exchange-auth'

import * as GetProduct from './graphql/_gen_/product.query'
import * as FavouriteProducts from './graphql/_gen_/userFavouriteProducts.query'

const makeClient = () => {
  return createClient({
    url: process.env.NEXT_PUBLIC_API_HOST + '/graphql',
    exchanges: [
      cacheExchange,
      ssrExchange({
        isClient: typeof window !== 'undefined'
      }),
      authExchange(async (utils) => {
        const cookieStore = await cookies()
        const session = cookieStore.get(SESSION_COOKIE_NAME)?.value

        return {
          addAuthToOperation(operation) {
            if (!session) return operation

            return utils.appendHeaders(operation, {
              Authorization: `Bearer ${session}`
            })
          },
          didAuthError(error, _operation) {
            return error.graphQLErrors.some((e) => e.extensions?.code === '401')
          },
          async refreshAuth() {
            try {
              const response = await fetch(process.env.NEXT_PUBLIC_API_HOST + '/refresh', {
                method: 'GET',
                cache: 'no-cache',
                credentials: 'include'
              })

              if (!response.ok) {
                const errorText = await response.text()
                throw new Error(errorText)
              }
            } catch (error) {
              // router.replace(routeNames.root)
            }
          }
        }
      }),

      fetchExchange
    ]
  })
}

const { getClient } = registerUrql(makeClient)

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
