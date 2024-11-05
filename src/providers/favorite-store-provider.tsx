'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { type FavoriteStore, createFavoriteStore } from '@/stores/favorite/store'

export type FavoriteStoreApi = ReturnType<typeof createFavoriteStore>

export const FavoriteStoreContext = createContext<FavoriteStoreApi | undefined>(undefined)

export interface FavoriteStoreProviderProps {
  children: ReactNode
}

export const FavoriteStoreProvider = ({ children }: FavoriteStoreProviderProps) => {
  const storeRef = useRef<FavoriteStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createFavoriteStore()
  }

  return (
    <FavoriteStoreContext.Provider value={storeRef.current}>
      {children}
    </FavoriteStoreContext.Provider>
  )
}

export const useFavoriteStore = <T,>(
  selector: (store: FavoriteStore) => T
): [T, FavoriteStoreApi] => {
  const favoriteStoreContext = useContext(FavoriteStoreContext)

  if (!favoriteStoreContext) {
    throw new Error(`useFavoriteStore must be used within FavoriteStoreProvider`)
  }

  const store = useStore(favoriteStoreContext, selector)

  return [store, favoriteStoreContext]
}
