import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type UiStore = {
  authModal: boolean
}

type UiActions = {
  authModalOpen: () => void
  authModalClose: () => void
}

export const useUiStore = create<UiStore & UiActions>()(
  persist(
    (set) => ({
      authModal: false,
      authModalOpen: () =>
        set(() => ({
          authModal: true
        })),
      authModalClose: () =>
        set(() => ({
          authModal: false
        }))
    }),
    {
      name: 'ui-storage',
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true
    }
  )
)
