'use client'

import { UrqlProvider as Provider, ssrExchange, fetchExchange, createClient, gql } from '@urql/next'
import { cacheExchange } from '@/cache'
import { type ReactNode, useMemo } from 'react'

export function UrqlProvider({ children }: { children: ReactNode }) {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange({
      isClient: typeof window !== 'undefined'
    })
    const client = createClient({
      url: process.env.NEXT_PUBLIC_API_HOST + '/graphql',
      exchanges: [cacheExchange, ssr, fetchExchange],
      suspense: false
    })

    return [client, ssr]
  }, [])

  return (
    <Provider client={client} ssr={ssr}>
      {children}
    </Provider>
  )
}
