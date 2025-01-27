'use client'

import jsCookie from 'js-cookie'
import { cacheExchange } from '@/cache'
import { routeNames } from '@/lib/constants'
import { SESSION_COOKIE_NAME } from '@/lib/session'
import { authExchange } from '@urql/exchange-auth'
import { createClient, fetchExchange, gql, UrqlProvider as Provider, ssrExchange } from '@urql/next'
import { useRouter } from 'next/navigation'
import { type ReactNode, useMemo } from 'react'

export function UrqlProvider({ children }: { children: ReactNode }) {
  const router = useRouter()

  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange({
      isClient: typeof window !== 'undefined'
    })
    const client = createClient({
      url: process.env.NEXT_PUBLIC_API_HOST + '/graphql',
      exchanges: [
        cacheExchange,
        ssr,
        authExchange(async (utils) => {
          return {
            addAuthToOperation(operation) {
              const session = jsCookie.get(SESSION_COOKIE_NAME)
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
                router.replace(routeNames.root)
              }
            }
          }
        }),
        fetchExchange
      ],
      suspense: false
    })

    return [client, ssr]
  }, [router])

  return (
    <Provider client={client} ssr={ssr}>
      {children}
    </Provider>
  )
}
