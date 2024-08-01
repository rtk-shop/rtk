import { initializeApollo } from '@/apollo/ssr'
import {
  GlobalDataDocument,
  GlobalDataQuery,
  GlobalDataQueryVariables
} from '@/graphql/global/_gen_/globalData.query'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client'

export type QueryResult = GlobalDataQuery['globalData']

export default async function handler(): Promise<
  [ApolloClient<NormalizedCacheObject>, QueryResult]
> {
  const client = initializeApollo()

  const { data } = await client.query<GlobalDataQuery, GlobalDataQueryVariables>({
    query: GlobalDataDocument
  })

  return [client, data.globalData]
}
