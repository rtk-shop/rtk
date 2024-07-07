import { ApolloClient } from '@apollo/client'
import { cache } from './cache'

const API_GRAPHQL = process.env.NEXT_PUBLIC_API_HOST + '/graphql'
const withDevTools = process.env.NODE_ENV === 'development'

const client = new ApolloClient({
  cache,
  uri: API_GRAPHQL,
  connectToDevTools: withDevTools
})

export default client
