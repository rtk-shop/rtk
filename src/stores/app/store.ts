import { create } from 'zustand'

type AppState = {
  isCartOpen: boolean
  isSidebarOpen: boolean
}

type AppActions = {
  openCart: () => void
  closeCart: () => void
  openSidebar: () => void
  closeSidebar: () => void
}

export type AppStore = AppState & AppActions

export const useAppState = create<AppStore>((set, get) => ({
  isCartOpen: false,
  isSidebarOpen: false,

  openCart: () => set(() => ({ isCartOpen: true })),
  closeCart: () => set(() => ({ isCartOpen: false })),

  openSidebar: () => set(() => ({ isSidebarOpen: true })),
  closeSidebar: () => set(() => ({ isSidebarOpen: false }))
}))
