import { cookies } from 'next/headers'
import { registerUrql } from '@urql/next/rsc'
import { ssrExchange } from '@urql/next'
import { cacheExchange, createClient, fetchExchange } from 'urql'
import { authExchange } from '@urql/exchange-auth'
import { SESSION_COOKIE_NAME } from '../session'

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
              // info: can't do redirect
              // https://github.com/urql-graphql/urql/discussions/3738
            }
          }
        }
      }),

      fetchExchange
    ]
  })
}

const { getClient } = registerUrql(makeClient)

export { getClient }
