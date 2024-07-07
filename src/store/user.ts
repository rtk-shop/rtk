import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type UserStore = {
  isAuthenticated: boolean
}

type UserActions = {
  auth: () => void
}

export const useUserStore = create<UserStore & UserActions>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      auth: () =>
        set(() => ({
          isAuthenticated: true
        }))
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true
    }
  )
)
