import { useQuery, useMutation, UseQueryArgs } from 'urql'

import * as createOrder from './graphql/order/_gen_/create.mutation'
import * as rejectOrder from './graphql/order/_gen_/reject.mutation'
import * as userOrders from './graphql/order/_gen_/user-orders.query'

import * as cartProducts from './graphql/cart/_gen_/products.query'
import * as addCartItem from './graphql/cart/_gen_/add-item.mutation'
import * as removeCartItem from './graphql/cart/_gen_/remove-item.mutation'
import * as reduceCartItem from './graphql/cart/_gen_/reduce-item-quantity.mutation'
import * as clearCart from './graphql/cart/_gen_/clear.mutation'

import * as productsQuery from './graphql/product/_gen_/products.query'
import * as favouriteProductsQuery from './graphql/product/_gen_/user-favourite.query'
import * as addFavouriteProduct from './graphql/product/_gen_/add-favourite.mutation'
import * as removeFavouriteProduct from './graphql/product/_gen_/remove-favourite.mutation'

import * as orderPayment from './graphql/payment/_gen_/order-payment.query'
import * as initSoleProprietorPayment from './graphql/payment/_gen_/init-sole-proprietor-payment.mutation'

export function useProductsQuery({
  variables,
  ...options
}: {
  variables: productsQuery.ProductsQueryVariables
} & Omit<UseQueryArgs<productsQuery.ProductsQueryVariables>, 'query' | 'variables'>) {
  return useQuery<productsQuery.ProductsQuery, productsQuery.ProductsQueryVariables>({
    query: productsQuery.ProductsDocument,
    variables,
    ...options
  })
}

export function useUserOrdersQuery({
  variables,
  ...options
}: {
  variables: userOrders.UserOrdersQueryVariables
} & Omit<UseQueryArgs<userOrders.UserOrdersQueryVariables>, 'query' | 'variables'>) {
  return useQuery<userOrders.UserOrdersQuery, userOrders.UserOrdersQueryVariables>({
    query: userOrders.UserOrdersDocument,
    variables,
    ...options
  })
}

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
    favouriteProductsQuery.UserFavouriteProductsQuery,
    favouriteProductsQuery.UserFavouriteProductsQueryVariables
  >({
    requestPolicy: 'cache-first', // todo in separate
    query: favouriteProductsQuery.UserFavouriteProductsDocument
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

export function useOrderPayment(
  options: Omit<UseQueryArgs<orderPayment.GetOrderPaymentQueryVariables>, 'query'>
) {
  return useQuery<orderPayment.GetOrderPaymentQuery, orderPayment.GetOrderPaymentQueryVariables>({
    query: orderPayment.GetOrderPaymentDocument,
    ...options
  })
}

export function useInitSoleProprietorPaymentMutation() {
  return useMutation<
    initSoleProprietorPayment.InitSoleProprietorPaymentMutation,
    initSoleProprietorPayment.InitSoleProprietorPaymentMutationVariables
  >(initSoleProprietorPayment.InitSoleProprietorPaymentDocument)
}
