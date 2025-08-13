import { create } from 'zustand'

export type PageState = {
  isRejectModalOpen: boolean
}

export type PageActions = {
  setRejectModalOpen(open: boolean): void
}

export type PageStore = PageState & PageActions

const initState = {
  isRejectModalOpen: false
}

export const usePageState = create<PageStore>()((set) => ({
  ...initState,
  setRejectModalOpen: (open) => set({ isRejectModalOpen: open })
}))
