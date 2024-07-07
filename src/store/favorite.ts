import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type FavoriteStore = {
  amount: () => number
  favoriteItems: string[]
}

type FavoriteActions = {
  add: (id: string) => void
  remove: (id: string) => void
}

export const useFavoriteStore = create<FavoriteStore & FavoriteActions>()(
  persist(
    (set, get) => ({
      favoriteItems: [],
      amount: () => get().favoriteItems.length,
      add: (id: string) =>
        set((state) => ({
          favoriteItems: [id, ...state.favoriteItems]
        })),
      remove: (id: string) =>
        set((state) => ({
          favoriteItems: state.favoriteItems.filter((favorite) => favorite !== id)
        })),
      clear: () =>
        set(() => ({
          favoriteItems: []
        }))
    }),
    {
      name: 'favorite-storage',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true
    }
  )
)
