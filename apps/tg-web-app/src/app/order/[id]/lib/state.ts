import { create } from 'zustand'
import { PaymentPurpose } from '@/lib/api/graphql/types'

export type paymentDrawer = {
  open: boolean
  mode: 'reminder' | 'payment'
  type: PaymentPurpose
}

export type PageState = {
  isRejectDrawerOpen: boolean
  paymentDrawer: paymentDrawer
}

export type PageActions = {
  setRejectDrawerOpen(open: boolean): void
  setPaymentDrawer(
    state: Omit<paymentDrawer, 'mode' | 'type'> & Partial<Pick<paymentDrawer, 'mode' | 'type'>>
  ): void
}

export type PageStore = PageState & PageActions

const initState: PageState = {
  isRejectDrawerOpen: false,
  paymentDrawer: {
    open: false,
    mode: 'payment',
    type: PaymentPurpose.Delivery
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
