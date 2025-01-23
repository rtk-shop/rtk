import { useQuery, useMutation, UseQueryArgs } from 'urql'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  CartProductsQuery,
  CartProductsQueryVariables,
  CartProductsDocument
} from './graphql/_gen_/cartProducts.query'

import {
  CreateOrderMutation,
  CreateOrderMutationVariables,
  CreateOrderDocument
} from './graphql/_gen_/createOrder.mutation'

import {
  RejectOrdeMutation,
  RejectOrdeMutationVariables,
  RejectOrdeDocument
} from './graphql/_gen_/rejectOrder.mutation'

export function useCartQuery(options: Omit<UseQueryArgs<CartProductsQueryVariables>, 'query'>) {
  return useQuery<CartProductsQuery, CartProductsQueryVariables>({
    query: CartProductsDocument,
    ...options
  })
}

export function useCreateOrderMutation() {
  return useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument)
}

export function useRejectOrderMutation() {
  return useMutation<RejectOrdeMutation, RejectOrdeMutationVariables>(RejectOrdeDocument)
}

export type WebAppAuthParams = {
  onSuccess: () => void
  onError: (error: string) => void
}

export type WebAppReturnValues<T> = [(bodyData: T) => void, { loading: boolean }]

export function useWebAppAuth<T>({ onSuccess, onError }: WebAppAuthParams): WebAppReturnValues<T> {
  const [loading, setLoading] = useState(false)

  const callbacksRef = useRef({ onSuccess, onError })

  useEffect(() => {
    callbacksRef.current = { onSuccess, onError }
  }, [onSuccess, onError])

  const query = useCallback(async (bodyData: T) => {
    setLoading(true)

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_HOST + '/webapp-auth', {
        method: 'POST',
        body: JSON.stringify(bodyData),
        cache: 'no-cache',
        credentials: 'include'
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText)
      }

      setLoading(false)
      callbacksRef.current.onSuccess?.()
    } catch (error) {
      setLoading(false)
      callbacksRef.current.onError?.(
        error instanceof Error ? error.message : 'An unknown error occurred'
      )
    }
  }, [])

  return [query, { loading }]
}

export function useRefreshAuth({
  onSuccess,
  onError
}: WebAppAuthParams): [() => void, { loading: boolean }] {
  const [loading, setLoading] = useState(false)

  const callbacksRef = useRef({ onSuccess, onError })

  useEffect(() => {
    callbacksRef.current = { onSuccess, onError }
  }, [onSuccess, onError])

  const query = useCallback(async () => {
    setLoading(true)

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

      setLoading(false)
      callbacksRef.current.onSuccess?.()
    } catch (error) {
      setLoading(false)
      callbacksRef.current.onError?.(
        error instanceof Error ? error.message : 'An unknown error occurred'
      )
    }
  }, [])

  return [query, { loading }]
}
