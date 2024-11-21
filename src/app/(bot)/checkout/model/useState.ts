import { useReducer, useMemo } from 'react'

export type State = {
  waitDataSyncing: boolean
  isInfoOpen: boolean
  isDeliveryOpen: boolean
  successOrderModalOpen: boolean
  errorOrderModalOpen: boolean
}

export type Actions = {
  dataSynced(): void
  openInfo(): void
  infoChecked(): void
  openDelivery(): void
  closeDelivery(): void
  openSucessModal(): void
  closeSucessModal(): void
  openErrorModal(): void
  closeErrorModal(): void
}

export type Action = {
  type:
    | 'data-synced'
    //
    | 'open-info'
    | 'info-checked'
    //
    | 'open-delivery'
    | 'close-delivery'
    //
    | 'succes-modal-open'
    | 'succes-modal-close'
    //
    | 'error-modal-open'
    | 'error-modal-close'

  payload?: unknown
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'data-synced':
      return { ...state, waitDataSyncing: false }
    //
    case 'open-info':
      return { ...state, isInfoOpen: !state.isInfoOpen, isDeliveryOpen: false }
    case 'info-checked':
      return { ...state, isInfoOpen: false, isDeliveryOpen: true }
    //
    case 'open-delivery':
      return { ...state, isDeliveryOpen: !state.isDeliveryOpen, isInfoOpen: false }
    case 'close-delivery':
      return { ...state, isDeliveryOpen: false }
    case 'succes-modal-open':
      return { ...state, successOrderModalOpen: true }
    case 'succes-modal-close':
      return { ...state, successOrderModalOpen: false }
    case 'error-modal-open':
      return { ...state, errorOrderModalOpen: true }
    case 'error-modal-close':
      return { ...state, errorOrderModalOpen: false }
  }

  return state
}

export const useState = (initState: State): [State, Actions] => {
  const [state, dispatch] = useReducer(reducer, { ...initState })

  const api: Actions = useMemo(
    () => ({
      dataSynced: () => dispatch({ type: 'data-synced' }),
      openInfo: () => dispatch({ type: 'open-info' }),
      infoChecked: () => dispatch({ type: 'info-checked' }),
      openDelivery: () => dispatch({ type: 'open-delivery' }),
      closeDelivery: () => dispatch({ type: 'close-delivery' }),
      openSucessModal: () => dispatch({ type: 'succes-modal-open' }),
      closeSucessModal: () => dispatch({ type: 'succes-modal-close' }),
      openErrorModal: () => dispatch({ type: 'error-modal-open' }),
      closeErrorModal: () => dispatch({ type: 'error-modal-close' })
    }),
    []
  )

  return [state, api]
}
