import { create } from 'zustand'

export type errorOptions = {
  kind: 'submit' | 'meta'
}

export type PageState = {
  isInfoOpen: boolean
  isDeliveryOpen: boolean
  successOrderModalOpen: boolean
  errorOrderModalOpen: boolean
  errorOptions?: errorOptions
}

export type PageActions = {
  onInfoSection(): void
  onDeliverySection(): void
  closeDelivery(): void
  onSucessModal(open: boolean): void
  onErrorModal(open: boolean, options?: errorOptions): void
  infoChecked(): void
}

export type PageStore = PageState & PageActions

const initState = {
  isInfoOpen: false,
  isDeliveryOpen: false,
  successOrderModalOpen: false,
  errorOrderModalOpen: false,
  errorOptions: undefined
}

export const usePageState = create<PageStore>()((set) => ({
  ...initState,
  onInfoSection: () => set((state) => ({ isInfoOpen: !state.isInfoOpen, isDeliveryOpen: false })),
  onDeliverySection: () =>
    set((state) => ({ isDeliveryOpen: !state.isDeliveryOpen, isInfoOpen: false })),
  closeDelivery: () => set({ isDeliveryOpen: false }),
  onSucessModal: (open) => set({ successOrderModalOpen: open }),
  onErrorModal: (open, options = undefined) =>
    set({ errorOrderModalOpen: open, errorOptions: options }),
  infoChecked: () => set({ isInfoOpen: false, isDeliveryOpen: true })
}))
