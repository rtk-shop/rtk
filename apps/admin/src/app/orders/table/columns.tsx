import { formatPrice, formatDate } from '@repo/utils'
import { Order } from './types'
import { StatusBadge } from '@/components/order/status-badge'

import { createColumnHelper } from '@tanstack/react-table'
import { FormatPrice } from '@/components/ui/format-price'

const columnHelper = createColumnHelper<Order>()

export const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (props) => props.getValue()
  }),
  columnHelper.accessor('status', {
    header: 'Статус',
    cell: (props) => <StatusBadge status={props.getValue()} />,
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || filterValue.length === 0) return true
      const rowValue = row.getValue(columnId)
      return filterValue.includes(rowValue)
    }
  }),
  columnHelper.accessor('cityName', {
    header: 'Населенный пункт',
    cell: (props) => props.getValue()
  }),
  columnHelper.accessor('price', {
    header: 'Сумма',
    cell: (props) => <FormatPrice price={props.getValue()} />
  }),
  columnHelper.accessor('createdAt', {
    header: 'Создан',
    cell: (props) => formatDate(props.getValue(), { dateStyle: 'short', timeStyle: 'short' })
  })
]
