import type { FacetedFilterOption } from './faceted-filter'
import { OrderStatus } from '@/lib/api/graphql/types'

export const statuses: FacetedFilterOption[] = [
  {
    label: 'Создан',
    value: OrderStatus.Created
  },
  {
    label: 'В обработке',
    value: OrderStatus.Processed
  },
  {
    label: 'В дороге',
    value: OrderStatus.Sent
  },
  {
    label: 'Получен',
    value: OrderStatus.Done
  },
  {
    label: 'Отменен',
    value: OrderStatus.Rejected
  },
  {
    label: 'Возврат',
    value: OrderStatus.Returned
  }
]
