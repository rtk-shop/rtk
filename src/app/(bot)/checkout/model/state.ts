import { create } from 'zustand'

export type PageState = {
  isInfoOpen: boolean
  isDeliveryOpen: boolean
  successOrderModalOpen: boolean
  errorOrderModalOpen: boolean
}

export type PageActions = {
  onInfoSection(): void
  onDeliverySection(): void
  closeDelivery(): void
  onSucessModal(open: boolean): void
  onErrorModal(open: boolean): void
  infoChecked(): void
}

export type PageStore = PageState & PageActions

const initState = {
  isInfoOpen: false,
  isDeliveryOpen: false,
  successOrderModalOpen: false,
  errorOrderModalOpen: false
}

export const usePageState = create<PageStore>()((set) => ({
  ...initState,
  onInfoSection: () => set((state) => ({ isInfoOpen: !state.isInfoOpen, isDeliveryOpen: false })),
  onDeliverySection: () =>
    set((state) => ({ isDeliveryOpen: !state.isDeliveryOpen, isInfoOpen: false })),
  closeDelivery: () => set({ isDeliveryOpen: false }),
  onSucessModal: (open) => set({ successOrderModalOpen: open }),
  onErrorModal: (open) => set({ errorOrderModalOpen: open }),
  infoChecked: () => set({ isInfoOpen: false, isDeliveryOpen: true })
}))
