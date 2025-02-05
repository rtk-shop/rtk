import { useQuery, useMutation, UseQueryArgs } from 'urql'
import { useCallback, useEffect, useRef, useState } from 'react'

import * as rejectOrder from './graphql/_gen_/rejectOrder.mutation'
import * as cartProducts from './graphql/_gen_/cartProducts.query'
import * as createOrder from './graphql/_gen_/createOrder.mutation'
import * as addFavouriteProduct from './graphql/_gen_/addFavouriteProduct.mutation'
import * as removeFavouriteProduct from './graphql/_gen_/removeFavouriteProduct.mutation'
import * as favouriteQuery from '@/lib/api/graphql/_gen_/userFavouriteProducts.query'
import * as addCartItem from '@/lib/api/graphql/_gen_/addCartItem.mutation'
import * as removeCartItem from '@/lib/api/graphql/_gen_/removeCartItem.mutation'
import * as reduceCartItem from '@/lib/api/graphql/_gen_/reduceCartItemQuantity.mutation'
import * as clearCart from '@/lib/api/graphql/_gen_/clearCart.mutation'

export function useCartQuery(
  options?: Omit<UseQueryArgs<cartProducts.CartProductsQueryVariables>, 'query'>
) {
  return useQuery<cartProducts.CartProductsQuery, cartProducts.CartProductsQueryVariables>({
    query: cartProducts.CartProductsDocument,
    ...options
  })
}

export function useCreateOrderMutation() {
  return useMutation<createOrder.CreateOrderMutation, createOrder.CreateOrderMutationVariables>(
    createOrder.CreateOrderDocument
  )
}

export function useRejectOrderMutation() {
  return useMutation<rejectOrder.RejectOrderMutation, rejectOrder.RejectOrderMutationVariables>(
    rejectOrder.RejectOrderDocument
  )
}

export function useAddProductToFavorite() {
  return useMutation<
    addFavouriteProduct.AddFavouriteProductMutation,
    addFavouriteProduct.AddFavouriteProductMutationVariables
  >(addFavouriteProduct.AddFavouriteProductDocument)
}

export function useRemoveProductFromFavorites() {
  return useMutation<
    removeFavouriteProduct.RemoveFavouriteProductMutation,
    removeFavouriteProduct.RemoveFavouriteProductMutationVariables
  >(removeFavouriteProduct.RemoveFavouriteProductDocument)
}

export function useFavoriteProductsQuery() {
  return useQuery<
    favouriteQuery.UserFavouriteProductsQuery,
    favouriteQuery.UserFavouriteProductsQueryVariables
  >({
    requestPolicy: 'cache-first',
    query: favouriteQuery.UserFavouriteProductsDocument
  })
}

export function useAddCartItemMutation() {
  return useMutation<addCartItem.AddCartItemMutation, addCartItem.AddCartItemMutationVariables>(
    addCartItem.AddCartItemDocument
  )
}

export function useRemoveCartItemMutation() {
  return useMutation<
    removeCartItem.RemoveCartItemMutation,
    removeCartItem.RemoveCartItemMutationVariables
  >(removeCartItem.RemoveCartItemDocument)
}

export function useReduceCartItemQuantityMutation() {
  return useMutation<
    reduceCartItem.ReduceCartItemQuantityMutation,
    reduceCartItem.ReduceCartItemQuantityMutationVariables
  >(reduceCartItem.ReduceCartItemQuantityDocument)
}

export function useClearCartMutation() {
  return useMutation<clearCart.ClearCartMutation>(clearCart.ClearCartDocument)
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
