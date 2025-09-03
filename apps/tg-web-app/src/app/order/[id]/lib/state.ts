import { create } from 'zustand'

export type paymentDrawer = {
  open: boolean
  mode: 'reminder' | 'payment'
}

export type PageState = {
  isRejectModalOpen: boolean
  paymentDrawer: paymentDrawer
}

export type PageActions = {
  setRejectModalOpen(open: boolean): void
  setPaymentDrawer(state: Omit<paymentDrawer, 'mode'> & Partial<Pick<paymentDrawer, 'mode'>>): void
}

export type PageStore = PageState & PageActions

const initState: PageState = {
  isRejectModalOpen: false,
  paymentDrawer: {
    open: false,
    mode: 'payment'
  }
}

export const usePageState = create<PageStore>()((set) => ({
  ...initState,
  setRejectModalOpen: (open) => set({ isRejectModalOpen: open }),
  setPaymentDrawer: (state) =>
    set((prev) => ({
      paymentDrawer: {
        ...prev.paymentDrawer,
        ...state
      }
    }))
}))
