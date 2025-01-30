import { create } from 'zustand'

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
  return create<FavoriteStore>((set, get) => ({
    ...initState,
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
  }))
}
