import { create } from 'zustand'

export type paymentDrawer = {
  open: boolean
  mode: 'reminder' | 'payment'
}

export type PageState = {
  isRejectDrawerOpen: boolean
  paymentDrawer: paymentDrawer
}

export type PageActions = {
  setRejectDrawerOpen(open: boolean): void
  setPaymentDrawer(state: Omit<paymentDrawer, 'mode'> & Partial<Pick<paymentDrawer, 'mode'>>): void
}

export type PageStore = PageState & PageActions

const initState: PageState = {
  isRejectDrawerOpen: false,
  paymentDrawer: {
    open: false,
    mode: 'payment'
  }
}

export const usePageState = create<PageStore>()((set) => ({
  ...initState,
  setRejectDrawerOpen: (open) => set({ isRejectDrawerOpen: open }),
  setPaymentDrawer: (state) =>
    set((prev) => ({
      paymentDrawer: {
        ...prev.paymentDrawer,
        ...state
      }
    }))
}))
