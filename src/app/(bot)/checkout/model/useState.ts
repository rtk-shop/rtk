import { useReducer, useMemo } from 'react'

export type State = {
  waitDataSyncing: boolean
  isInfoOpen: boolean
  isDeliveryOpen: boolean
  successOrderModalOpen: boolean
}

export type Actions = {
  dataSynced(): void
  openInfo(): void
  infoChecked(): void
  openDelivery(): void
  closeDelivery(): void
  openSucessModal(): void
  closeSucessModal(): void
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
      closeSucessModal: () => dispatch({ type: 'succes-modal-close' })
    }),
    []
  )

  return [state, api]
}
