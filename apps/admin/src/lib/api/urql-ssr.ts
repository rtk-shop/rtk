import { cookies } from 'next/headers'
import { registerUrql } from '@urql/next/rsc'
import { ssrExchange } from '@urql/next'
import { cacheExchange, createClient, fetchExchange } from 'urql'
import { authExchange } from '@urql/exchange-auth'
import { REFRESH_COOKIE_NAME, SESSION_COOKIE_NAME } from '../session'

const makeClient = () => {
  return createClient({
    url: process.env.NEXT_PUBLIC_API_HOST + '/graphql',
    exchanges: [
      cacheExchange,
      ssrExchange({ isClient: false }),
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
            console.log('call to /refresh')
          }
        }
      }),
      fetchExchange
    ]
  })
}

const { getClient } = registerUrql(makeClient)

export { getClient }
