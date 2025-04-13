import { create } from 'zustand'

export type PageState = {
  currentOrderId: string | null
  isRejectOrderModalOpen: boolean
}

export type PageActions = {
  onRejectOrderModal(open: boolean): void
  setCurrentOrderId(id: string): void
  clearCurrentOrderId(): void
}

export type PageStore = PageState & PageActions

const initState = {
  currentOrderId: null,
  isRejectOrderModalOpen: false
}

export const usePageState = create<PageStore>()((set) => ({
  ...initState,
  onRejectOrderModal: (open) => set({ isRejectOrderModalOpen: open }),
  setCurrentOrderId: (id) => set({ currentOrderId: id }),
  clearCurrentOrderId: () => set({ currentOrderId: null })
}))
