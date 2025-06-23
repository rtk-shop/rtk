import type { OrderStatus } from '@/types/order'
import { orderStatus } from './constants'

export const getColorByTagName = (name: string): string => {
  switch (name) {
    case 'new':
      return '#32CD32'
    case 'best price':
      return '#FFA500'
    default:
      return 'lightgray'
  }
}

// todo: add types
export const getProductMainTagColor = (name: string): string => {
  switch (name) {
    case 'new':
      return '#6EBE90'
    case 'top':
      return '#a3f271'
    case 'stock':
      return '#fd3b3b'
    default:
      return 'lightgray'
  }
}

export const getOrderStatusColor = (status: keyof typeof OrderStatus): string => {
  switch (status) {
    case orderStatus.returned:
      return '#a2a2a2'
    default:
      return ''
  }
}
