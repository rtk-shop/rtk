import { useReducer, useMemo } from 'react'

type State = {
  waitDataSyncing: boolean
  isInfoOpen: boolean
  isDeliveryOpen: boolean
}

type Api = {
  dataSynced(): void
  openInfo(): void
  infoChecked(): void
  openDelivery(): void
  closeDelivery(): void
}

type Action = {
  type:
    | 'data-synced'
    //
    | 'open-info'
    | 'info-checked'
    //
    | 'open-delivery'
    | 'close-delivery'

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
  }

  return state
}

export const usePageState = (initState: State): [State, Api] => {
  const [state, dispatch] = useReducer(reducer, { ...initState })

  const api: Api = useMemo(
    () => ({
      dataSynced: () => dispatch({ type: 'data-synced' }),
      openInfo: () => dispatch({ type: 'open-info' }),
      infoChecked: () => dispatch({ type: 'info-checked' }),
      openDelivery: () => dispatch({ type: 'open-delivery' }),
      closeDelivery: () => dispatch({ type: 'close-delivery' })
    }),
    []
  )

  return [state, api]
}
