import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { CartItem } from './types'

type CartState = {
  cartAmount: () => number
  cartItems: CartItem[]
  cartPrice: number
}

type CartActions = {
  addItem: (item: CartItem) => void
  clear: () => void
  remove: (id: string) => void
  updateAmount: (id: string, amount: number) => void
  setCartPrice: (price: number) => void
}

export const useCartStore = create<CartState & CartActions>()(
  persist(
    (set, get) => ({
      cartPrice: 0,
      cartItems: [],
      cartAmount: () => get().cartItems.reduce((acc, p) => acc + p.amount, 0),
      addItem: (newItem: CartItem) =>
        set((state) => {
          const cartItems = [...state.cartItems]

          const itemIndex = cartItems.findIndex(
            (cartItem) => cartItem.productId === newItem.productId
          )

          if (itemIndex >= 0) {
            cartItems[itemIndex].amount += newItem.amount
          } else {
            cartItems.push({ ...newItem })
          }

          return {
            cartItems
          }
        }),
      updateAmount: (id: string, amount: number) =>
        set((state) => {
          const cartItems = [...state.cartItems]

          const itemIndex = cartItems.findIndex((cartItem) => cartItem.productId === id)

          if (itemIndex >= 0) cartItems[itemIndex].amount = amount

          return {
            cartItems
          }
        }),
      remove: (id: string) =>
        set((state) => ({
          cartItems: state.cartItems.filter((cartItem) => cartItem.productId !== id)
        })),
      setCartPrice: (price: number) =>
        set(() => ({
          cartPrice: price
        })),
      clear: () =>
        set(() => ({
          cartItems: []
        }))
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true
    }
  )
)
