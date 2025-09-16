import { create } from 'zustand'

export type errorOptions = {
  kind: 'submit' | 'meta'
}

export type PageState = {
  isInfoOpen: boolean
  isDeliveryOpen: boolean
  successOrderDrawerOpen: boolean
  errorOrderDrawerOpen: boolean
  errorOptions?: errorOptions
}

export type PageActions = {
  onInfoSection(): void
  onDeliverySection(): void
  closeDelivery(): void
  onSucessDrawerOpen(open: boolean): void
  onErrorDrawerOpen(open: boolean, options?: errorOptions): void
  infoChecked(): void
}

export type PageStore = PageState & PageActions

const initState = {
  isInfoOpen: false,
  isDeliveryOpen: false,
  successOrderDrawerOpen: false,
  errorOrderDrawerOpen: false,
  errorOptions: undefined
}

export const usePageState = create<PageStore>()((set) => ({
  ...initState,
  onInfoSection: () => set((state) => ({ isInfoOpen: !state.isInfoOpen, isDeliveryOpen: false })),
  onDeliverySection: () =>
    set((state) => ({ isDeliveryOpen: !state.isDeliveryOpen, isInfoOpen: false })),
  closeDelivery: () => set({ isDeliveryOpen: false }),
  onSucessDrawerOpen: (open) => set({ successOrderDrawerOpen: open }),
  onErrorDrawerOpen: (open, options = undefined) =>
    set({ errorOrderDrawerOpen: open, errorOptions: options }),
  infoChecked: () => set({ isInfoOpen: false, isDeliveryOpen: true })
}))
