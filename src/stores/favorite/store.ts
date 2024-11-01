import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type FavoriteState = {
  products: string[]
}

type FavoriteActions = {
  amount: () => number
  add: (id: string) => void
  remove: (id: string) => void
}

export type FavoriteStore = FavoriteState & FavoriteActions

export const defaultInitState: FavoriteState = {
  products: []
}

export const createFavoriteStore = (initState: FavoriteState = defaultInitState) => {
  return create<FavoriteStore>()(
    persist(
      (set, get) => ({
        ...defaultInitState,
        amount: () => get().products.length,
        add: (id: string) =>
          set((state) => ({
            products: [id, ...state.products]
          })),
        remove: (id: string) =>
          set((state) => ({
            products: state.products.filter((favorite) => favorite !== id)
          })),
        clear: () =>
          set(() => ({
            products: []
          }))
      }),
      {
        name: '_favorite',
        storage: createJSONStorage(() => localStorage),
        skipHydration: true
      }
    )
  )
}
