import { create } from 'zustand'

export type PageState = {
  isRejectModalOpen: boolean
  isPaymentModalOpen: boolean
}

export type PageActions = {
  setRejectModalOpen(open: boolean): void
  setPaymentModalOpen(open: boolean): void
}

export type PageStore = PageState & PageActions

const initState = {
  isRejectModalOpen: false,
  isPaymentModalOpen: false
}

export const usePageState = create<PageStore>()((set) => ({
  ...initState,
  setRejectModalOpen: (open) => set({ isRejectModalOpen: open }),
  setPaymentModalOpen: (open) => set({ isPaymentModalOpen: open })
}))
