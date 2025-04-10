import { create } from 'zustand'

type FavoriteState = {
  amount: number
  products: Set<string>
}

type FavoriteActions = {
  add: (id: string) => void
  remove: (id: string) => void
  inFavourites: (id: string) => boolean
}

export type FavoriteStore = FavoriteState & FavoriteActions

export const createFavoriteStore = (products: string[]) => {
  const store = create<FavoriteStore>((set, get) => ({
    amount: products.length,
    products: new Set<string>([...products]),

    inFavourites: (id: string): boolean => {
      return get().products.has(id)
    },

    add: (id: string) => {
      set((state) => {
        state.products.add(id)
        return {
          amount: state.products.size
        }
      })
    },

    remove: (id: string) => {
      return set((state) => {
        state.products.delete(id)
        return {
          amount: state.products.size
        }
      })
    },

    clear: () => {
      set({ products: new Set<string>(), amount: 0 })
    }
  }))

  store.subscribe(
    (state) => state.amount // We only follow the amount
  )

  return store
}
