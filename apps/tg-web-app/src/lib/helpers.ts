import { ProductTag, OrderStatus } from '@/lib/api/graphql/types'

export const getProductMainTagColor = (tag: ProductTag): string => {
  switch (tag) {
    case ProductTag.New:
      return '#6EBE90'
    case ProductTag.Top:
      return '#a3f271'
    case ProductTag.Stock:
      return '#fd3b3b'
    default:
      return 'lightgray'
  }
}

export const getOrderStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case OrderStatus.Returned:
      return '#a2a2a2'
    default:
      return ''
  }
}
