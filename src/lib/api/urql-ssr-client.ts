import { headers } from 'next/headers'
import { cookies } from 'next/headers'
import { registerUrql } from '@urql/next/rsc'
import { ssrExchange } from '@urql/next'
import { cacheExchange, createClient, fetchExchange } from 'urql'
import { authExchange } from '@urql/exchange-auth'
import { DIRECT_SESSION_HEADER, SESSION_COOKIE_NAME } from '../session'

const makeClient = () => {
  return createClient({
    url: process.env.NEXT_PUBLIC_API_HOST + '/graphql',
    exchanges: [
      cacheExchange,
      ssrExchange({ isClient: false }),
      authExchange(async (utils) => {
        const cookieStore = await cookies()

        let session: string | unknown

        const cookieSession = cookieStore.get(SESSION_COOKIE_NAME)?.value

        if (!cookieSession) {
          const headersList = await headers()
          session = headersList.get(DIRECT_SESSION_HEADER)
        } else {
          session = cookieSession
        }

        return {
          addAuthToOperation(operation) {
            if (!session) return operation

            return utils.appendHeaders(operation, {
              Authorization: `Bearer ${session}`
            })
          },
          didAuthError() {
            return false
          },
          async refreshAuth() {}
        }
      }),
      fetchExchange
    ]
  })
}

const { getClient } = registerUrql(makeClient)

export { getClient }
