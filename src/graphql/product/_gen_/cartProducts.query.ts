import * as Types from '../../types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type CartProductsQueryVariables = Types.Exact<{
  input: Array<Types.CartItem> | Types.CartItem
}>

export type CartProductsQuery = {
  __typename?: 'Query'
  cartProducts: Array<{
    __typename?: 'Product'
    id: string
    slug: string
    title: string
    currentPrice: number
    preview: string
  }>
}

export const CartProductsDocument = gql`
  query CartProducts($input: [CartItem!]!) {
    cartProducts(input: $input) {
      id
      slug
      title
      currentPrice
      preview
    }
  }
`

/**
 * __useCartProductsQuery__
 *
 * To run a query within a React component, call `useCartProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCartProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCartProductsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCartProductsQuery(
  baseOptions: Apollo.QueryHookOptions<CartProductsQuery, CartProductsQueryVariables> &
    ({ variables: CartProductsQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<CartProductsQuery, CartProductsQueryVariables>(
    CartProductsDocument,
    options
  )
}
export function useCartProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CartProductsQuery, CartProductsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<CartProductsQuery, CartProductsQueryVariables>(
    CartProductsDocument,
    options
  )
}
export function useCartProductsSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<CartProductsQuery, CartProductsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<CartProductsQuery, CartProductsQueryVariables>(
    CartProductsDocument,
    options
  )
}
export type CartProductsQueryHookResult = ReturnType<typeof useCartProductsQuery>
export type CartProductsLazyQueryHookResult = ReturnType<typeof useCartProductsLazyQuery>
export type CartProductsSuspenseQueryHookResult = ReturnType<typeof useCartProductsSuspenseQuery>
export type CartProductsQueryResult = Apollo.QueryResult<
  CartProductsQuery,
  CartProductsQueryVariables
>
