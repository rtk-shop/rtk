import * as Types from '../../types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type GlobalDataQueryVariables = Types.Exact<{ [key: string]: never }>

export type GlobalDataQuery = {
  __typename?: 'Query'
  globalData: { __typename?: 'GlobalData'; id: string; usdCourse: number; updatedAt: string }
}

export const GlobalDataDocument = gql`
  query GlobalData {
    globalData {
      id
      usdCourse
      updatedAt
    }
  }
`

/**
 * __useGlobalDataQuery__
 *
 * To run a query within a React component, call `useGlobalDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGlobalDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGlobalDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGlobalDataQuery(
  baseOptions?: Apollo.QueryHookOptions<GlobalDataQuery, GlobalDataQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GlobalDataQuery, GlobalDataQueryVariables>(GlobalDataDocument, options)
}
export function useGlobalDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GlobalDataQuery, GlobalDataQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GlobalDataQuery, GlobalDataQueryVariables>(GlobalDataDocument, options)
}
export function useGlobalDataSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<GlobalDataQuery, GlobalDataQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GlobalDataQuery, GlobalDataQueryVariables>(
    GlobalDataDocument,
    options
  )
}
export type GlobalDataQueryHookResult = ReturnType<typeof useGlobalDataQuery>
export type GlobalDataLazyQueryHookResult = ReturnType<typeof useGlobalDataLazyQuery>
export type GlobalDataSuspenseQueryHookResult = ReturnType<typeof useGlobalDataSuspenseQuery>
export type GlobalDataQueryResult = Apollo.QueryResult<GlobalDataQuery, GlobalDataQueryVariables>
