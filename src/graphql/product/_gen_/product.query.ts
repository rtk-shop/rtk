import * as Types from '../../types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type GetProductQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input']
}>

export type GetProductQuery = {
  __typename?: 'Query'
  product?:
    | { __typename: 'NotFound'; message: string }
    | {
        __typename: 'Product'
        id: string
        parentId: string
        title: string
        slug: string
        sku: string
        gender: Types.Gender
        currentPrice: number
        basePrice: number
        amount: number
        tag?: Types.ProductTag | null
        preview: string
        category: Types.CategoryType
        inStock: boolean
        description?: string | null
        colorName: string
        sizeName: string
        brandName: string
        images: Array<string>
        isHidden: boolean
        defaultSizeID: number
        updatedAt: string
        createdAt: string
        availableColors?: Array<{
          __typename?: 'ProductColors'
          id: string
          title: string
          color: string
        }> | null
      }
    | null
}

export const GetProductDocument = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      __typename
      ... on Product {
        id
        parentId
        title
        slug
        sku
        gender
        currentPrice
        basePrice
        amount
        tag
        preview
        category
        inStock
        description
        colorName
        sizeName
        brandName
        images
        isHidden
        defaultSizeID
        updatedAt
        createdAt
        availableColors {
          id
          title
          color
        }
      }
      ... on NotFound {
        message
      }
    }
  }
`

/**
 * __useGetProductQuery__
 *
 * To run a query within a React component, call `useGetProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProductQuery(
  baseOptions: Apollo.QueryHookOptions<GetProductQuery, GetProductQueryVariables> &
    ({ variables: GetProductQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options)
}
export function useGetProductLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProductQuery, GetProductQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options)
}
export function useGetProductSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GetProductQuery, GetProductQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetProductQuery, GetProductQueryVariables>(
    GetProductDocument,
    options
  )
}
export type GetProductQueryHookResult = ReturnType<typeof useGetProductQuery>
export type GetProductLazyQueryHookResult = ReturnType<typeof useGetProductLazyQuery>
export type GetProductSuspenseQueryHookResult = ReturnType<typeof useGetProductSuspenseQuery>
export type GetProductQueryResult = Apollo.QueryResult<GetProductQuery, GetProductQueryVariables>
